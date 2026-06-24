# CodeBattle — Setup & Run Guide

## Prerequisites
- Node.js 20+
- Docker Desktop (must be running)
- PostgreSQL (or use Docker for it)
- Redis (or use Docker for it)

---

## Step 1 — Build the code executor image (do this ONCE)

```bash
docker build -f docker/executor.Dockerfile -t codebattle/executor:latest .
```

---

## Step 2 — Start PostgreSQL + Redis via Docker

```bash
docker compose up postgres redis -d
```

Wait ~10 seconds for them to be healthy.

---

## Step 3 — Install dependencies

```bash
npm install
```

---

## Step 4 — Set up the database

```bash
cd apps/backend
npx prisma migrate deploy
npx prisma db seed
cd ../..
```

---

## Step 5 — Start the backend

```bash
cd apps/backend
npm run dev
```

Backend runs at http://localhost:4000

---

## Step 6 — Start the frontend (new terminal)

```bash
cd apps/frontend
npm run dev
```

Frontend runs at http://localhost:5173

---

## How to write solve() functions

The judge wraps your code and calls `solve(...args)` automatically.
**You must name your function `solve`.**

### Python
```python
# Problem: "nums = [2,7,11,15], target = 9" → solve([2,7,11,15], 9)
def solve(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i

# Problem: "root = [3,9,20,null,null,15,7]" → solve([3,9,20,None,None,15,7])
def solve(root_arr):
    def depth(arr, i):
        if i >= len(arr) or arr[i] is None: return 0
        return 1 + max(depth(arr, 2*i+1), depth(arr, 2*i+2))
    return depth(root_arr, 0)
```

### JavaScript
```javascript
// solve receives spread args
function solve(nums, target) {
    const seen = {};
    for (let i = 0; i < nums.length; i++) {
        if (seen[target - nums[i]] !== undefined)
            return [seen[target - nums[i]], i];
        seen[nums[i]] = i;
    }
}
```

### Java
```java
// solve receives List<String> of raw JSON tokens — parse them yourself
public static String solve(List<String> args) {
    int[] nums = parseIntArr(args.get(0)); // helper is in the harness
    int target = Integer.parseInt(args.get(1));
    // ... solve
    return "[0,1]"; // return as JSON string
}
```

### C++
```cpp
// solve receives vector<string> of raw JSON tokens — parse them yourself
string solve(vector<string> args) {
    vector<int> nums = parseIntVec(args[0]); // helper is in the harness
    int target = stoi(args[1]);
    // ... solve
    return "[0,1]"; // return as string
}
```

---

## What was fixed in this version

1. **`execution.service.ts`** — Rewrote the harness builder to correctly parse
   LeetCode-style inputs like `"nums = [2,7,11,15], target = 9"` into actual
   function arguments. The old version tried to JSON.parse them directly (broken).

2. **`battle.routes.ts`** — The submit route now actually runs the code before
   recording a win. Previously it declared a winner based on time alone without
   ever executing the code.

3. **`rooms.ts`** (frontend) — Updated submitSolution to send `problemId` and
   receive the execution result back so the UI can show what went wrong.

4. **`BattleCodingPage.tsx`** — Updated finishBattle to send `problemId` and
   handle rejected submissions gracefully.

5. **`.env`** — Fixed JWT secrets to be 32+ characters (server crashed otherwise).
   Added `CODE_EXECUTOR_IMAGE` variable.
