# CodeBattle Debugging Analysis

## Issue: Battle Never Starts After Confirm Selection

### Flow Breakdown

#### Step 1: Start Battle (WaitingRoomPage)
**Frontend**: `apps/frontend/src/pages/WaitingRoomPage.tsx`
- User clicks "Start Battle" button
- Calls `handleStart()` → `roomsApi.startBattle(roomId)`

**Backend**: `apps/backend/src/modules/battles/battle.routes.ts`
- Route: `POST /rooms/:roomId/start`
- Handler calls `battleService.startBattle()`
- Updates room status: `IN_PROGRESS`
- Broadcasts: `broadcastBattleStarted()` → socket event `battle_started`

**Frontend Socket**: `apps/frontend/src/hooks/useRoomSocket.ts`
- Listens for `battle_started` event
- Callback: `handleBattleStarted` (from WaitingRoomPage)
- **NAVIGATES**: `/rooms/:roomId/select-problem` → BattlePage

---

#### Step 2: Selection Page Load (BattlePage)
**Frontend**: `apps/frontend/src/pages/BattlePage.tsx`
- Component mounts at `/rooms/:roomId/select-problem`
- Calls `roomsApi.getRoom(roomId)` on useEffect
- Sets initial room state
- Displays DifficultySelector & TopicSelector
- User selects difficulty ("EASY") and topic ("Arrays")

---

#### Step 3: Confirm Selection
**Frontend**: `BattlePage.tsx` - `handleSelectProblem()`

```javascript
const handleSelectProblem = async () => {
  if (!selectedDifficulty || !selectedTopic || !roomId) return;
  setIsSubmitting(true);
  setError('');

  try {
    const updatedRoom = await roomsApi.selectProblem(roomId, {
      difficulty: selectedDifficulty,
      topic: selectedTopic,
    });
    setRoom(updatedRoom);
    setSocketRoom(updatedRoom);

    // ⚠️ CRITICAL: Depends on updatedRoom.problemId
    if (updatedRoom.problemId) {
      navigate(`/rooms/${roomId}/battle`, { replace: true });
    }
  } catch (err) {
    setError(err instanceof ApiError ? err.message : 'Failed to select problem');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Key Issue**: Navigation depends on `updatedRoom.problemId` being set

---

#### Step 4: Backend Processing
**Route**: `POST /rooms/:roomId/select-problem`
**Handler**: `apps/backend/src/modules/battles/battle.routes.ts`

```typescript
const room = await battleService.selectProblem(
  getRoomIdParam(req.params),
  getAuthUserId(user!),
  difficulty,
  topic
);
broadcastRoomState(room.id, room);
sendSuccess(res, { room }, 'Problem selected');
```

**Service**: `apps/backend/src/modules/battles/battle.service.ts` - `selectProblem()`

```typescript
export async function selectProblem(
  roomId: string,
  userId: string,
  difficulty: string,
  topic: string
): Promise<RoomState> {
  const room = await getRoomWithPlayers(roomId);
  
  assertPlayerInRoom(room, userId);
  
  if (room.ownerId !== userId) {
    throw new AppError('Only the room host can select difficulty and topic', 403);
  }
  
  if (room.status !== 'IN_PROGRESS') {
    throw new AppError('Battle has not started', 400);
  }
  
  // ⚠️ CRITICAL POINT: Database query
  const problem = await prisma.problem.findFirst({
    where: {
      difficulty: difficulty as any,
      topic: {
        mode: 'insensitive',
        equals: topic,
      },
    },
    orderBy: { id: 'asc' },
  });
  
  // ⚠️ CRITICAL: Fails if no problems exist
  if (!problem) {
    throw new AppError('No problems found for this difficulty and topic', 404);
  }
  
  // Update room with problem assignment
  const updatedRoom = await prisma.battleRoom.update({
    where: { id: roomId },
    data: {
      problemId: problem.id,
      difficulty: difficulty as any,
      topic,
      startedAt: new Date(),
    },
    include: {
      players: {
        include: {
          user: { select: { id: true, username: true, rating: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });
  
  return toRoomState(updatedRoom);
}
```

---

## 🔴 ROOT CAUSES IDENTIFIED

### 1. **No Problems in Database** (Most Likely)
- Seed file exists: `apps/backend/prisma/seed.ts`
- Contains 7 problems with topics: "Arrays", "Strings", "Graphs", "Hash Tables", "Dynamic Programming"
- **Problem**: Seed has NOT been executed
- **Result**: `prisma.problem.findFirst()` returns `null`
- **Error**: 404 "No problems found for this difficulty and topic"
- **Frontend Effect**: Alert is displayed, but no navigation occurs

**Check**: Run `npm run db:seed` in backend

---

### 2. **Seed Data Format Issue**
If seed was run, the JSON structure might not match schema:
- `examples` and `boilerplate` are JSON fields
- Seed stores them as JavaScript objects, needs validation

---

### 3. **Socket Event Broadcasting Gap**
**Issue**: After `selectProblem` succeeds:
- Backend broadcasts `room_state` event with updated room
- **Missing**: No explicit "problem_selected" event
- **Effect**: Other player doesn't get real-time notification
- **Partial Fix**: Socket event is broadcast, but non-host players might not navigate automatically

---

### 4. **Frontend Navigation Issue**
**Issue**: Even if backend succeeds, frontend might not navigate
- Depends on: `updatedRoom.problemId` being truthy
- If API response doesn't include problemId, no navigation
- Error handling shows alert but user is stuck on BattlePage

---

### 5. **Missing Auto-Navigation for Non-Host**
**Issue**: Only host calls selectProblem, only host navigates
- Non-host players depend on socket event to trigger navigation
- **Missing**: Socket event handler for problem selection on non-host clients
- Non-hosts see "Waiting for host..." but never navigate even after selection

---

## 📋 Verification Checklist

- [ ] Database has problems seeded
- [ ] `prisma problem.findFirst()` returns results for "EASY" + "Arrays"
- [ ] API response includes `problemId`
- [ ] Socket events are being received on client
- [ ] Navigation is triggered for both host and non-host
- [ ] BattleCodingPage loads with problem data

---

## Summary of Fixes Needed

1. ✅ **Seed the database** - Run migrations and seed
2. ✅ **Add socket event for problem selection** - Broadcast to non-host players
3. ✅ **Handle socket event on client** - Trigger navigation for non-hosts
4. ✅ **Add error display** - Show when no problems found
5. ✅ **Verify problem data format** - Ensure JSON fields are correct

