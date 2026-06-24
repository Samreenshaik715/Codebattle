import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { getProblems } from '@/lib/api/problems';
import type { Problem } from '@/types';

const DIFFICULTIES = ['', 'EASY', 'MEDIUM', 'HARD'] as const;

export function ProblemListPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProblems = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getProblems({ search, topic, difficulty, limit: 50 });
        setProblems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProblems();
  }, [search, topic, difficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-950 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Problem Library</h1>
            <p className="mt-2 text-slate-400">
              Browse problems by difficulty, topic, or keyword. Select a problem to review the full prompt and samples.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm text-slate-400">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-primary-500"
                placeholder="Title, description, or topic"
              />
            </label>
            <label className="block">
              <span className="text-sm text-slate-400">Topic</span>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-primary-500"
                placeholder="e.g. Arrays"
              />
            </label>
            <label className="block">
              <span className="text-sm text-slate-400">Difficulty</span>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-primary-500"
              >
                {DIFFICULTIES.map((value) => (
                  <option key={value} value={value}>
                    {value || 'Any'}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {error && <Alert message={error} />}

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
          </div>
        ) : problems.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center text-slate-300">
            No problems match the current filter. Try a broader search or reset the criteria.
          </div>
        ) : (
          problems.map((problem) => (
            <div
              key={problem.id}
              className="rounded-3xl border border-slate-700 bg-slate-900 p-6 hover:border-primary-500"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Link to={`/problems/${problem.id}`} className="text-xl font-semibold text-white hover:text-primary-400">
                    {problem.title}
                  </Link>
                  <p className="mt-2 text-slate-400 line-clamp-2">{problem.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm uppercase tracking-wide text-slate-300">
                    {problem.difficulty}
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm tracking-wide text-slate-300">
                    {problem.topic}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                <span>{problem.examples.length} example(s)</span>
                <span>{problem.constraints.length} constraint(s)</span>
              </div>
              <div className="mt-6 flex justify-end">
                <Link
                  to={`/problems/${problem.id}`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-500"
                >
                  View details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
