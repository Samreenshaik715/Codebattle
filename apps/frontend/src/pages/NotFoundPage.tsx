import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold text-primary-400">404</h1>
      <p className="mt-4 text-lg text-slate-400">Page not found</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-500"
      >
        Go home
      </Link>
    </div>
  );
}
