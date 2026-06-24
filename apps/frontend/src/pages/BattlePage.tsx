import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { DifficultySelector } from '@/components/battle/DifficultySelector';
import { TopicSelector } from '@/components/battle/TopicSelector';
import { Input } from '@/components/ui/Input';
import { useCurrentUserId } from '@/hooks/useCurrentUserId';
import { useRoom } from '@/hooks/useRoom';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';
import type { BattleRoom, Difficulty } from '@/types';

export function BattlePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const currentUserId = useCurrentUserId();
  const { setActiveRoom, clearActiveRoom } = useRoom();

  const [room, setRoom] = useState<BattleRoom | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>();
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [timeLimit, setTimeLimit] = useState<number>(300);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  const handleRoomClosed = () => navigate('/rooms/join', { replace: true });
  const handleBattleStarted = (updatedRoom: BattleRoom) => {
    // When battle starts and problem is already configured, go straight to coding
    if (updatedRoom.problem) {
      navigate(`/rooms/${roomId}/battle`, { replace: true });
    }
  };
  const handleProblemSelected = (updatedRoom: BattleRoom) => {
    if (updatedRoom.status === 'IN_PROGRESS') {
      navigate(`/rooms/${roomId}/battle`, { replace: true });
    }
  };

  const {
    room: socketRoom,
    isConnected,
    error: socketError,
    setRoom: setSocketRoom,
  } = useRoomSocket({
    roomId: roomId!,
    onRoomClosed: handleRoomClosed,
    onBattleStarted: handleBattleStarted,
    onProblemSelected: handleProblemSelected,
  });

  const displayRoom = socketRoom ?? room;
  const currentPlayer = displayRoom?.players.find((p) => p.userId === currentUserId);
  const isOwner = Boolean(currentPlayer?.isOwner);

  useEffect(() => {
    if (!roomId) return;
    roomsApi
      .getRoom(roomId)
      .then((r) => {
        setRoom(r);
        setSocketRoom(r);
        setActiveRoom(r);

        // Pre-fill existing config
        if (r.difficulty) setSelectedDifficulty(r.difficulty as Difficulty);
        if (r.topic) setSelectedTopic(r.topic);
        if (r.timerDuration) setTimeLimit(r.timerDuration);
        if (r.timerDuration) {
          if (r.problemIds && r.problemIds.length) {
            // display per-question time to the host when editing
            setTimeLimit(Math.max(1, Math.floor(r.timerDuration / r.problemIds.length)));
          } else {
            setTimeLimit(r.timerDuration);
          }
        }
        if (r.problemIds) setQuestionCount(r.problemIds.length);

        if (r.status === 'FINISHED') {
          clearActiveRoom();
          navigate(`/rooms/${roomId}/results`, { replace: true });
          return;
        }

        if (r.status === 'IN_PROGRESS' && r.problem) {
          navigate(`/rooms/${roomId}/battle`, { replace: true });
        }
      })
      .catch((err) => {
        setLoadError(err instanceof ApiError ? err.message : 'Failed to load room');
      });
  }, [roomId, navigate, setSocketRoom, setActiveRoom]);

  useEffect(() => {
    if (displayRoom?.status === 'FINISHED') {
      clearActiveRoom();
      navigate(`/rooms/${roomId}/results`, { replace: true });
    }
  }, [clearActiveRoom, displayRoom, navigate, roomId]);

  const hasSelectedOptions = Boolean(selectedDifficulty && selectedTopic);

  const handleConfirmSelection = async () => {
    if (!selectedDifficulty || !selectedTopic || !roomId) return;
    setIsSubmitting(true);
    setError('');

    try {
      // Step 1: Save configuration (selectProblem works in WAITING status now)
      const updatedRoom = await roomsApi.selectProblem(roomId, {
        difficulty: selectedDifficulty,
        topic: selectedTopic,
        questionCount,
        timeLimit,
      });
      setRoom(updatedRoom);
      setSocketRoom(updatedRoom);
      setActiveRoom(updatedRoom);
      setConfigSaved(true);

      // Step 2: Start the battle
      const startedRoom = await roomsApi.startBattle(roomId);
      setRoom(startedRoom);
      setSocketRoom(startedRoom);
      setActiveRoom(startedRoom);

      // Navigate to battle coding page
      navigate(`/rooms/${roomId}/battle`, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to start battle');
      setConfigSaved(false);
    } finally {
      setIsSubmitting(false);
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

  if (!displayRoom) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Battle Configuration</h1>
            <p className="mt-1 text-slate-400">
              {isOwner
                ? 'Configure the battle settings. All players will compete on the same problems.'
                : 'Waiting for the host to configure the battle...'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
            />
            <span className="text-xs text-slate-400">{isConnected ? 'Live' : 'Connecting...'}</span>
          </div>
        </div>

        {/* Room code display */}
        <div className="border-primary-500/30 bg-primary-600/10 mb-6 flex items-center gap-3 rounded-lg border border-dashed px-4 py-3">
          <span className="text-sm text-slate-400">Room Code:</span>
          <span className="text-primary-300 font-mono text-lg font-bold tracking-widest">
            {displayRoom.roomCode}
          </span>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(displayRoom.roomCode)}
            className="ml-auto text-xs"
          >
            Copy
          </Button>
        </div>

        {(error || socketError) && (
          <div className="mb-6">
            <Alert message={error || socketError!} />
          </div>
        )}

        {configSaved && (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
            <p className="text-sm text-green-300">✓ Configuration saved. Starting battle...</p>
          </div>
        )}

        {isOwner ? (
          <div className="space-y-6">
            {/* Difficulty & Topic */}
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <DifficultySelector
                  selectedDifficulty={selectedDifficulty}
                  onSelectDifficulty={setSelectedDifficulty}
                  isLoading={isSubmitting}
                />
              </div>
              <div>
                <TopicSelector
                  selectedTopic={selectedTopic}
                  onSelectTopic={setSelectedTopic}
                  isLoading={isSubmitting}
                />
              </div>
            </div>

            {/* Question Count & Time Limit */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Number of Questions
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQuestionCount(n)}
                      disabled={isSubmitting}
                      className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
                        questionCount === n
                          ? 'border-primary-500 bg-primary-600/20 text-primary-300'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={questionCount}
                    onChange={(e) =>
                      setQuestionCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))
                    }
                    disabled={isSubmitting}
                    className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 text-center text-sm text-white disabled:opacity-50"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">How many problems? (1–10)</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Battle Duration
                </label>
                <div className="flex gap-2">
                  {[
                    { label: '5m', val: 300 },
                    { label: '10m', val: 600 },
                    { label: '15m', val: 900 },
                    { label: '30m', val: 1800 },
                  ].map(({ label, val }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTimeLimit(val)}
                      disabled={isSubmitting}
                      className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
                        timeLimit === val
                          ? 'border-primary-500 bg-primary-600/20 text-primary-300'
                          : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-slate-500">Time limit for the entire battle</p>
              </div>
            </div>

            {/* Summary */}
            {hasSelectedOptions && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="mb-2 text-sm font-medium text-emerald-300">Battle Summary</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Difficulty: </span>
                    <span className="font-medium text-white">{selectedDifficulty}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Topic: </span>
                    <span className="font-medium text-white">{selectedTopic}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Questions: </span>
                    <span className="font-medium text-white">{questionCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Battle duration: </span>
                    <span className="font-medium text-white">
                      {timeLimit >= 60 ? `${timeLimit / 60}m` : `${timeLimit}s`}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              <p className="text-sm text-slate-300">
                Waiting for the host to configure the battle...
              </p>
            </div>
            {selectedDifficulty && selectedTopic && (
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="text-slate-400">Difficulty:</span>{' '}
                  <span className="text-white">{selectedDifficulty}</span>
                </p>
                <p>
                  <span className="text-slate-400">Topic:</span>{' '}
                  <span className="text-white">{selectedTopic}</span>
                </p>
                <p>
                  <span className="text-slate-400">Questions:</span>{' '}
                  <span className="text-white">{questionCount}</span>
                </p>
                <p>
                  <span className="text-slate-400">Battle duration:</span>{' '}
                  <span className="text-white">
                    {timeLimit >= 60 ? `${timeLimit / 60}m` : `${timeLimit}s`}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Players */}
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-300">
            Players in Room ({displayRoom.players.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {displayRoom.players.map((player) => (
              <div key={player.id} className="flex items-center gap-2 text-sm">
                <div className="bg-primary-600/20 text-primary-400 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
                  {player.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-white">{player.username}</span>
                {player.userId === currentUserId && (
                  <span className="text-xs text-slate-400">(you)</span>
                )}
                {player.isOwner && <span className="text-xs text-amber-300">Host</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(`/rooms/${roomId}`)}
            disabled={isSubmitting}
          >
            Back to Waiting Room
          </Button>
          {isOwner && (
            <Button
              onClick={handleConfirmSelection}
              disabled={!hasSelectedOptions || isSubmitting || displayRoom.players.length < 2}
              isLoading={isSubmitting}
            >
              {displayRoom.players.length < 2
                ? 'Need 2+ players'
                : 'Confirm Selection & Start Battle'}
            </Button>
          )}
        </div>
        {isOwner && displayRoom.players.length < 2 && (
          <p className="mt-2 text-xs text-slate-500">
            Share room code{' '}
            <span className="text-primary-400 font-mono">{displayRoom.roomCode}</span> with other
            players to join.
          </p>
        )}
      </div>
    </div>
  );
}
