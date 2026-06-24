import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRoom } from '@/hooks/useRoom';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const { activeRoom } = useRoom();
  const navigate = useNavigate();

  return (
    <>
      <header className="border-surface-lighter bg-surface-light border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary-400 text-xl font-bold">{'</>'}</span>
            <span className="text-lg font-semibold tracking-tight">CodeBattle</span>
          </Link>

          <nav className="flex items-center gap-4">
            {isLoading ? (
              <div className="border-primary-400 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            ) : isAuthenticated && user ? (
              <>
                <Link
                  to="/problems"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Problems
                </Link>
                {!activeRoom ? (
                  <>
                    <Link
                      to="/rooms/create"
                      className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      Create Room
                    </Link>
                    <Link
                      to="/rooms/join"
                      className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      Join Room
                    </Link>
                  </>
                ) : null}
                <Link
                  to="/profile"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {user.username}
                </Link>
                <span className="bg-primary-600/20 text-primary-300 rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {user.rating}
                </span>
                <Button variant="ghost" onClick={() => logout()}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
                <Link to="/register">
                  <Button>Get started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Persistent active room banner */}
      {isAuthenticated && activeRoom?.status === 'IN_PROGRESS' && (
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              <span className="text-sm text-amber-200">
                Active room:{' '}
                <span className="font-mono font-bold text-amber-300">{activeRoom.roomCode}</span> (
                {activeRoom.players.length} player{activeRoom.players.length !== 1 ? 's' : ''}){' '}
                <span className="rounded bg-green-800/40 px-1.5 py-0.5 text-xs text-green-300">
                  In Progress
                </span>
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                if (activeRoom.status === 'IN_PROGRESS' && activeRoom.problem) {
                  navigate(`/rooms/${activeRoom.id}/battle`);
                } else if (activeRoom.status === 'IN_PROGRESS') {
                  navigate(`/rooms/${activeRoom.id}/configure`);
                } else {
                  navigate(`/rooms/${activeRoom.id}`);
                }
              }}
              className="border border-amber-500/40 text-xs text-amber-300 hover:bg-amber-500/20"
            >
              Return to Room →
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
