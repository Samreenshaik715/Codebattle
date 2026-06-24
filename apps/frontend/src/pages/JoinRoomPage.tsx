import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';

export function JoinRoomPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const room = await roomsApi.joinRoom(roomCode.toUpperCase().trim());
      navigate(`/rooms/${room.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-xl border border-surface-lighter bg-surface-light p-8">
        <h1 className="text-2xl font-bold text-white">Join Battle Room</h1>
        <p className="mt-2 text-sm text-slate-400">Enter the 6-character room code to join.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && <Alert message={error} />}

          <Input
            label="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            className="font-mono text-center text-lg tracking-widest"
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Join Room
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Want to host?{' '}
          <Link to="/rooms/create" className="font-medium text-primary-400 hover:text-primary-300">
            Create a room
          </Link>
        </p>
      </div>
    </div>
  );
}
