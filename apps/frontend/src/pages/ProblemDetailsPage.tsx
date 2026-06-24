import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { getProblem } from '@/lib/api/problems';
import type { Problem } from '@/types';

export function ProblemDetailsPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!problemId) return;

    const loadProblem = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getProblem(problemId);
        setProblem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Problem not found');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProblem();
  }, [problemId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        {error && <Alert message={error} />}
        <Link
          to="/problems"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-500"
        >
          Back to problems
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
          <p className="mt-2 text-slate-400">{problem.topic} · {problem.difficulty}</p>
        </div>
        <Link
          to="/problems"
          className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-primary-500 hover:text-white"
        >
          Back to problem list
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6 rounded-3xl border border-slate-700 bg-slate-950 p-8">
          <section>
            <h2 className="text-xl font-semibold text-white">Statement</h2>
            <p className="mt-4 whitespace-pre-line text-slate-300">{problem.description}</p>
          </section>

          {problem.sampleInput && problem.sampleOutput && (
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-lg font-semibold text-white">Sample Input / Output</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Input</p>
                  <pre className="mt-2 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">{problem.sampleInput}</pre>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Output</p>
                  <pre className="mt-2 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">{problem.sampleOutput}</pre>
                </div>
              </div>
            </section>
          )}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-lg font-semibold text-white">Examples</h3>
            <div className="mt-4 space-y-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm font-medium text-slate-200">Example {index + 1}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">Input</p>
                  <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-sm text-slate-200">{example.input}</pre>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">Output</p>
                  <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-sm text-slate-200">{example.output}</pre>
                  {example.explanation ? (
                    <p className="mt-3 text-slate-400">{example.explanation}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {problem.constraints.length > 0 && (
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-lg font-semibold text-white">Constraints</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-700 bg-slate-900 p-6">
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Topic</p>
            <p className="mt-2 text-lg font-semibold text-white">{problem.topic}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Difficulty</p>
            <p className="mt-2 text-lg font-semibold text-white">{problem.difficulty}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Boilerplate</p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              {Object.entries(problem.boilerplate).map(([language, template]) => (
                <div key={language}>
                  <p className="font-medium text-white">{language}</p>
                  <p className="mt-1 break-words">{template || 'No template provided'}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
