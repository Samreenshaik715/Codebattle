import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useCurrentUserId } from '@/hooks/useCurrentUserId';
import { useRoom } from '@/hooks/useRoom';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';
import type { BattleRoom, BattleResult } from '@/types';

export function BattleResultsPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const currentUserId = useCurrentUserId();

  const [room, setRoom] = useState<BattleRoom | null>(null);
  const [result, setResult] = useState<BattleResult[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { clearActiveRoom } = useRoom();

  const clearBattleStorage = useCallback(() => {
    if (!roomId) return;
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`battle_${roomId}_q`))
      .forEach((key) => localStorage.removeItem(key));
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    Promise.all([roomsApi.getRoom(roomId), roomsApi.getBattleResult(roomId)])
      .then(([r, res]) => {
        setRoom(r);
        setResult(res);
        if (r.status === 'FINISHED') {
          clearActiveRoom();
          clearBattleStorage();
        }
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : 'Failed to load results');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (error || !room || !result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Alert message={error || 'Results not found'} />
        <Button className="mt-6" variant="secondary" onClick={() => navigate('/rooms/join')}>
          Back to lobby
        </Button>
      </div>
    );
  }

  const leaderboard = result;
  const currentPlayer = leaderboard.find((entry) => entry.userId === currentUserId);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentRankLabel = currentPlayer
    ? `#${currentPlayer.rank} - ${currentPlayer.solvedCount} solved, ${currentPlayer.creditsEarned} credits`
    : 'Battle results';

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">
        <div className="mb-8 rounded-lg border border-slate-700 bg-slate-800 p-8 text-center">
          <p className="mb-2 text-sm font-medium text-slate-300">Final Standings</p>
          <h1 className="text-4xl font-bold text-white">Battle leaderboard</h1>
          <p className="mt-2 text-slate-400">{currentRankLabel}</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950">
          <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-200">
            <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Solved</th>
                <th className="px-4 py-3">Total Time</th>
                <th className="px-4 py-3">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leaderboard.map((entry) => {
                const isCurrent = entry.userId === currentUserId;
                const rowStyle =
                  entry.rank === 1
                    ? 'bg-yellow-500/10'
                    : entry.rank === 2
                      ? 'bg-slate-700/40'
                      : entry.rank === 3
                        ? 'bg-orange-500/10'
                        : 'bg-slate-950';

                return (
                  <tr
                    key={entry.userId}
                    className={`${rowStyle} ${isCurrent ? 'border-primary-500 border-l-4' : ''}`}
                  >
                    <td className="px-4 py-4 font-semibold text-slate-100">#{entry.rank}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`font-semibold ${isCurrent ? 'text-primary-200' : 'text-white'}`}
                        >
                          {entry.username}
                        </span>
                        {isCurrent && <span className="text-xs text-slate-400">You</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">{entry.solvedCount}</td>
                    <td className="px-4 py-4">
                      {entry.totalSolveTime ? formatTime(entry.totalSolveTime) : '--:--'}
                    </td>
                    <td className="px-4 py-4 font-semibold text-amber-300">
                      {entry.creditsEarned}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
