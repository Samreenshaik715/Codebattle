import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useCurrentUserId } from '@/hooks/useCurrentUserId';
import { useRoom } from '@/hooks/useRoom';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';
import type { BattleRoom } from '@/types';

function PlayerCard({
  username,
  rating,
  isOwner,
  isYou,
}: {
  username: string;
  rating: number;
  isOwner: boolean;
  isYou: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-surface-lighter bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600/20 text-sm font-bold text-primary-400">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-white">
            {username}
            {isYou && <span className="ml-2 text-xs text-slate-400">(you)</span>}
          </p>
          <p className="text-xs text-slate-400">Rating: {rating}</p>
        </div>
      </div>
      {isOwner && (
        <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300">
          Host
        </span>
      )}
    </div>
  );
}

export function WaitingRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const currentUserId = useCurrentUserId();
  const { setActiveRoom, clearActiveRoom } = useRoom();
  const [initialRoom, setInitialRoom] = useState<BattleRoom | null>(null);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [isLeaving, setIsLeaving] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleRoomClosed = useCallback(() => {
    clearActiveRoom();
    navigate('/rooms/join', { replace: true });
  }, [navigate, clearActiveRoom]);

  const handleBattleStarted = useCallback((updatedRoom: import('@/types').BattleRoom) => {
    // When battle starts (broadcast to all), redirect non-hosts to configure page to wait
    if (roomId) {
      if (updatedRoom.problem) {
        navigate(`/rooms/${roomId}/battle`, { replace: true });
      } else {
        navigate(`/rooms/${roomId}/configure`, { replace: true });
      }
    }
  }, [navigate, roomId]);

  const { room: socketRoom, isConnected, error: socketError, setRoom: setSocketRoom } =
    useRoomSocket({
      roomId: roomId!,
      onRoomClosed: handleRoomClosed,
      onBattleStarted: handleBattleStarted,
    });

  const room = socketRoom ?? initialRoom;

  const currentPlayer = room?.players.find((p) => p.userId === currentUserId);
  const isOwner = Boolean(currentPlayer?.isOwner);

  useEffect(() => {
    if (!roomId) return;

    roomsApi
      .getRoom(roomId)
      .then((loadedRoom) => {
        setInitialRoom(loadedRoom);
        setActiveRoom(loadedRoom);
      })
      .catch((err) => {
        setLoadError(err instanceof ApiError ? err.message : 'Failed to load room');
      });
  }, [roomId, setActiveRoom]);

  useEffect(() => {
    const currentRoom = socketRoom ?? initialRoom;
    if (currentRoom?.status === 'FINISHED') {
      navigate(`/rooms/${roomId}/results`, { replace: true });
    }
  }, [socketRoom, initialRoom, navigate, roomId]);

  // Update room context when socket room changes
  useEffect(() => {
    if (socketRoom) {
      setActiveRoom(socketRoom);
    }
  }, [socketRoom, setActiveRoom]);

  const handleLeave = async () => {
    if (!roomId) return;
    setActionError('');
    setIsLeaving(true);

    try {
      await roomsApi.leaveRoom(roomId);
      clearActiveRoom();
      navigate('/rooms/join', { replace: true });
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to leave room');
    } finally {
      setIsLeaving(false);
    }
  };

  const handleStart = () => {
    if (!roomId) return;
    // Navigate to configure page where host sets difficulty, topic, questions, timer
    navigate(`/rooms/${roomId}/configure`);
  };

  const copyRoomCode = () => {
    if (room?.roomCode) {
      navigator.clipboard.writeText(room.roomCode);
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Alert message={loadError} />
        <Button className="mt-6" variant="secondary" onClick={() => navigate('/rooms/join')}>
          Back to join
        </Button>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
      </div>
    );
  }

  const canStart = isOwner && room.status === 'WAITING' && room.players.length >= 2;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-xl border border-surface-lighter bg-surface-light p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Waiting Room</h1>
            <p className="mt-1 text-sm text-slate-400">
              {room.status === 'WAITING'
                ? isOwner
                  ? 'Waiting for players. Start the battle once 2 or more players have joined.'
                  : 'Waiting for host to start the battle.'
                : 'Battle in progress'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
            />
            <span className="text-xs text-slate-400">{isConnected ? 'Live' : 'Connecting...'}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-lg border border-dashed border-primary-500/30 bg-primary-600/10 px-6 py-4">
          <span className="font-mono text-3xl font-bold tracking-[0.3em] text-primary-300">
            {room.roomCode}
          </span>
          <Button variant="ghost" onClick={copyRoomCode} className="text-xs">
            Copy
          </Button>
        </div>

        {(actionError || socketError) && (
          <div className="mt-4">
            <Alert message={actionError || socketError!} />
          </div>
        )}

        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-slate-300">
            Players ({room.players.length})
          </h2>
          <div className="space-y-2">
            {room.players.map((player) => (
              <PlayerCard
                key={player.id}
                username={player.username}
                rating={player.rating}
                isOwner={player.isOwner}
                isYou={player.userId === currentUserId}
              />
            ))}
          </div>
        </div>

        {room.status === 'WAITING' && (
          <div className="mt-8 flex gap-3">
            <Button variant="secondary" onClick={handleLeave} isLoading={isLeaving}>
              Leave Room
            </Button>
            {isOwner && (
              <Button onClick={handleStart} disabled={!canStart}>
                {room.players.length < 2 ? 'Need 2+ players' : 'Configure & Start Battle'}
              </Button>
            )}
          </div>
        )}

        {room.status === 'IN_PROGRESS' && (
          <div className="mt-8 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
            <p className="text-center text-sm text-green-300">
              Battle is in progress!
            </p>
            <div className="mt-3 text-center">
              <Button onClick={() => {
                if (room.problem) {
                  navigate(`/rooms/${roomId}/battle`);
                } else {
                  navigate(`/rooms/${roomId}/configure`);
                }
              }}>
                {room.problem ? 'Go to Battle' : 'Configure Battle'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
