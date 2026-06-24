import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-surface-lighter bg-surface p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const winRate =
    user.wins + user.losses > 0
      ? `${Math.round((user.wins / (user.wins + user.losses)) * 100)}%`
      : '—';

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-surface-lighter bg-surface-light p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <p className="mt-1 text-slate-400">{user.email}</p>
            <p className="mt-2 text-sm text-slate-500">Member since {memberSince}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/20 text-2xl font-bold text-primary-400">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Rating" value={user.rating} />
          <StatCard label="Wins" value={user.wins} />
          <StatCard label="Losses" value={user.losses} />
          <StatCard label="Win Rate" value={winRate} />
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="secondary" onClick={() => logout()}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
