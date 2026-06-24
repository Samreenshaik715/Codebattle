import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';

export function CreateRoomPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setError('');
    setIsLoading(true);

    try {
      const room = await roomsApi.createRoom();
      navigate(`/rooms/${room.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-xl border border-surface-lighter bg-surface-light p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/20">
          <span className="text-2xl">⚔️</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Create Battle Room</h1>
        <p className="mt-2 text-sm text-slate-400">
          Create a room and share the code with friends to battle.
        </p>

        {error && (
          <div className="mt-6">
            <Alert message={error} />
          </div>
        )}

        <Button className="mt-8 w-full" onClick={handleCreate} isLoading={isLoading}>
          Create Room
        </Button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Have a code?{' '}
          <button
            type="button"
            onClick={() => navigate('/rooms/join')}
            className="font-medium text-primary-400 hover:text-primary-300"
          >
            Join a room
          </button>
        </p>
      </div>
    </div>
  );
}
