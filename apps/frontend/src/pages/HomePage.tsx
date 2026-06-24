import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Welcome to <span className="text-primary-400">CodeBattle</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Competitive coding platform — battle opponents, climb the ranks.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/rooms/create"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-500"
              >
                Create Room
              </Link>
              <Link
                to="/rooms/join"
                className="rounded-lg border border-surface-lighter bg-surface-light px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Join Room
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-500"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-surface-lighter bg-surface-light px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
