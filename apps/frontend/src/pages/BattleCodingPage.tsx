import { Component, ErrorInfo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useCurrentUserId } from '@/hooks/useCurrentUserId';
import { useRoom } from '@/hooks/useRoom';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { ApiError } from '@/lib/api/client';
import * as roomsApi from '@/lib/api/rooms';
import type { CodeProblem, BattleRoom, ProgrammingLanguage } from '@/types';

const LANGUAGE_MAP: Record<ProgrammingLanguage, string> = {
  java: 'java',
  python: 'python',
  cpp: 'cpp',
  javascript: 'javascript',
};

interface PlayerProgress {
  userId: string;
  username: string;
  solvedCount: number;
  totalTime: number; // seconds for all solved questions
  currentQuestion: number;
  finished: boolean;
}

interface BattleErrorBoundaryProps {
  roomId?: string;
  children: React.ReactNode;
}

interface BattleErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class BattleErrorBoundary extends Component<BattleErrorBoundaryProps, BattleErrorBoundaryState> {
  state: BattleErrorBoundaryState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  static getDerivedStateFromError(error: Error): BattleErrorBoundaryState {
    return { hasError: true, error, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    console.error('BattleCodingPage ErrorBoundary caught an error', {
      component: 'BattleCodingPage',
      route: window.location.pathname,
      roomId: this.props.roomId,
      error: error.message,
      stack: error.stack,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <Alert message="Battle failed to load" />
          <div className="mt-4 text-sm text-slate-400">
            Something went wrong while loading the battle. Please refresh the page or return to the
            lobby.
          </div>
          <Button className="mt-6" variant="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BattleCodingPageContent() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const currentUserId = useCurrentUserId();

  const [room, setRoom] = useState<BattleRoom | null>(null);
  const [problems, setProblems] = useState<CodeProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');
  const [theme, setTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');

  // Battle countdown timer
  const [timeRemaining, setTimeRemaining] = useState<number>(300);
  const [battleStartTime, setBattleStartTime] = useState<number>(0);
  const [battleEndTime, setBattleEndTime] = useState<number | null>(null);
  const [serverTimeOffset, setServerTimeOffset] = useState<number>(0);

  // Solve tracking
  const [solvedQuestions, setSolvedQuestions] = useState<Set<number>>(new Set());
  const [questionSolveTimes, setQuestionSolveTimes] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  // Leaderboard / opponent progress
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress[]>([]);

  const editorRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleRoomClosed = () => navigate('/rooms/join', { replace: true });

  const { clearActiveRoom } = useRoom();
  const clearBattleStorage = useCallback(() => {
    if (!roomId) return;
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`battle_${roomId}_q`))
      .forEach((key) => localStorage.removeItem(key));
  }, [roomId]);

  const {
    room: socketRoom,
    serverTime,
    isConnected,
    error: socketError,
    setRoom: setSocketRoom,
  } = useRoomSocket({
    roomId: roomId!,
    onRoomClosed: handleRoomClosed,
    onBattleStarted: () => {},
    onBattleFinished: () => {
      clearActiveRoom();
      clearBattleStorage();
      navigate(`/rooms/${roomId}/results`, { replace: true });
    },
    onLeaderboardUpdated: (payload) => {
      setPlayerProgress(payload.leaderboard.map((entry) => ({
        userId: entry.userId,
        username: entry.username,
        solvedCount: entry.solvedCount,
        totalTime: entry.totalSolveTime,
        currentQuestion: 0,
        finished: entry.solvedCount >= totalQuestions,
      })));
    },
  });

  const displayRoom = socketRoom ?? room;
  const currentProblem = problems[currentProblemIndex] ?? null;
  const totalQuestions = problems.length;

  useEffect(() => {
    console.debug('BattleCodingPage mounted', { roomId });
  }, [roomId]);

  // Load room and all problems
  useEffect(() => {
    if (!roomId) return;
    roomsApi
      .getRoom(roomId)
      .then(async (r) => {
        setRoom(r);
        setSocketRoom(r);
        console.debug('BattleCodingPage room loaded', {
          roomId,
          status: r.status,
          problemIds: r.problemIds,
          problem: r.problem?.id,
          timerDuration: r.timerDuration,
          startedAt: r.startedAt,
        });

        if (r.status === 'FINISHED') {
          clearActiveRoom();
          navigate(`/rooms/${roomId}/results`, { replace: true });
          return;
        }

        if (r.status !== 'IN_PROGRESS') {
          navigate(`/rooms/${roomId}`, { replace: true });
          return;
        }

        const problemIds = r.problemIds ?? (r.problem ? [r.problem.id] : []);
        if (!problemIds.length) {
          navigate(`/rooms/${roomId}`, { replace: true });
          return;
        }

        // Load all problems
        const loaded = await Promise.all(problemIds.map((id) => roomsApi.getProblem(id)));
        setProblems(loaded);
        const startMs = new Date(r.startedAt ?? new Date().toISOString()).getTime();
        const totalDurationSeconds = r.timerDuration ?? 300;
        const serverNow = Date.now();
        const endMs = startMs + totalDurationSeconds * 1000;
        setBattleStartTime(startMs);
        setBattleEndTime(endMs);
        setServerTimeOffset(0); // initialize offset to zero until socket time is received
        setTimeRemaining(Math.max(0, Math.ceil((endMs - serverNow) / 1000)));

        // Set initial code boilerplate
        const first = loaded[0];
        if (first) {
          setCode(first.boilerplate['javascript'] ?? '');
        }

        // Initialize player progress
        setPlayerProgress(
          r.players.map((p) => ({
            userId: p.userId,
            username: p.username,
            solvedCount: 0,
            totalTime: 0,
            currentQuestion: 0,
            finished: false,
          })),
        );
      })
      .catch((err) => {
        setLoadError(err instanceof ApiError ? err.message : 'Failed to load battle');
      });
  }, [roomId, navigate, setSocketRoom]);

  useEffect(() => {
    if (!displayRoom || !displayRoom.startedAt || displayRoom.status !== 'IN_PROGRESS') return;

    const serverNow = serverTime ? new Date(serverTime).getTime() : Date.now();
    if (serverTime) {
      setServerTimeOffset(Date.now() - serverNow);
    }

    const totalDurationSeconds = displayRoom.timerDuration ?? 300;
    const startMs = new Date(displayRoom.startedAt).getTime();
    const endMs = startMs + totalDurationSeconds * 1000;

    setBattleStartTime(startMs);
    setBattleEndTime(endMs);
    setTimeRemaining(Math.max(0, Math.ceil((endMs - serverNow) / 1000)));
  }, [displayRoom, serverTime]);

  useEffect(() => {
    if (!displayRoom) return;
    if (displayRoom.status === 'FINISHED') {
      clearActiveRoom();
      clearBattleStorage();
      navigate(`/rooms/${roomId}/results`, { replace: true });
      return;
    }
    if (displayRoom.status !== 'IN_PROGRESS') {
      navigate(`/rooms/${roomId}`, { replace: true });
      return;
    }
  }, [clearActiveRoom, clearBattleStorage, displayRoom, navigate, roomId]);

  const finishBattle = useCallback(async () => {
    if (!roomId || allDone) return;
    setAllDone(true);
    clearInterval(timerRef.current);

    try {
      const updatedRoom = await roomsApi.finishBattle(roomId);
      if (updatedRoom.status === 'FINISHED') {
        clearActiveRoom();
        clearBattleStorage();
        navigate(`/rooms/${roomId}/results`, { replace: true });
      }
    } catch (err) {
      if (err instanceof ApiError && err.message.includes('Battle is not in progress')) {
        clearActiveRoom();
        clearBattleStorage();
        navigate(`/rooms/${roomId}/results`, { replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [
    roomId,
    allDone,
    navigate,
    clearActiveRoom,
    clearBattleStorage,
  ]);

  const moveToNextQuestion = useCallback(() => {
    const nextIndex = currentProblemIndex + 1;
    if (nextIndex >= totalQuestions) {
      setAllDone(true);
      return;
    }
    setCurrentProblemIndex(nextIndex);
    const nextProblem = problems[nextIndex];
    if (nextProblem) {
      setCode(nextProblem.boilerplate[language] ?? nextProblem.boilerplate['javascript'] ?? '');
    }
    setConsoleOutput('');
    setError('');
  }, [currentProblemIndex, totalQuestions, problems, language]);

  const expireBattle = useCallback(async () => {
    if (!roomId || allDone) return;
    setAllDone(true);
    clearInterval(timerRef.current);

    try {
      await roomsApi.expireBattle(roomId);
    } catch (err) {
      if (err instanceof ApiError && err.message.includes('Battle is not in progress')) {
        clearActiveRoom();
        clearBattleStorage();
        navigate(`/rooms/${roomId}/results`, { replace: true });
      }
    }
  }, [roomId, allDone, clearActiveRoom, clearBattleStorage, navigate]);

  // Countdown timer for the overall battle
  useEffect(() => {
    if (!problems.length || !battleEndTime) return;

    console.debug('BattleCodingPage timer initialized', {
      roomId,
      battleStartTime,
      battleEndTime,
      timeRemaining,
      serverTimeOffset,
    });

    timerRef.current = setInterval(() => {
      const serverNow = Date.now() - serverTimeOffset;
      const overallRemaining = battleEndTime
        ? Math.max(0, Math.ceil((battleEndTime - serverNow) / 1000))
        : 0;

      setTimeRemaining(overallRemaining);

      if (battleEndTime && serverNow >= battleEndTime) {
        clearInterval(timerRef.current);
        expireBattle();
        return;
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [
    battleEndTime,
    battleStartTime,
    expireBattle,
    problems.length,
    roomId,
    serverTimeOffset,
  ]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (!newCode) return;
    setCode(newCode);
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(`battle_${roomId}_q${currentProblemIndex}`, newCode);
    }, 1000);
  };

  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    setLanguage(lang);
    if (currentProblem) {
      setCode(currentProblem.boilerplate[lang] ?? currentProblem.boilerplate['javascript'] ?? '');
    }
  };

  const handleRunCode = async () => {
    if (!currentProblem) return;
    setIsRunning(true);
    setConsoleOutput('Running code...\n');
    try {
      const examples = currentProblem.examples.map((e) => ({
        input: e.input || '',
        expectedOutput: e.output || '',
      }));
      const { runAgainstExamples } = await import('@/lib/api/execution');
      const result = await runAgainstExamples(code, language, examples);

      if (result.compileOutput) {
        setConsoleOutput(`Compilation output:\n${result.compileOutput}`);
      } else if (result.verdict !== 'Accepted') {
        const first = result.testCaseResults[0];
        if (first) {
          setConsoleOutput(
            `Verdict: ${result.verdict}\nTest #${first.index + 1} failed\nExpected:\n${first.expectedOutput}\n\nActual:\n${first.actualOutput}\n\nStderr:\n${first.stderr}`,
          );
        } else {
          setConsoleOutput(`Verdict: ${result.verdict}`);
        }
      } else {
        setConsoleOutput(`✓ All example tests passed\nRuntime: ${result.runtimeMs}ms`);
      }
    } catch (err) {
      setConsoleOutput(`Error:\n${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (!currentProblem || !roomId || allDone) return;
    setIsSubmitting(true);
    setError('');

    try {
      const solveTime = Math.floor((Date.now() - serverTimeOffset - battleStartTime) / 1000);
      const { room: updatedRoom, accepted, execResult } = await roomsApi.submitSolution(roomId, {
        code,
        language,
        solveTime,
        problemId: currentProblem.id,
      });

      if (!accepted && execResult) {
        const first = execResult.testCaseResults?.[0];
        setConsoleOutput(
          `Submission failed: ${execResult.verdict}` +
            (first
              ? `\nTest #${first.index + 1}\nExpected:\n${first.expectedOutput}\n\nActual:\n${first.actualOutput}\n\nStderr:\n${first.stderr}`
              : ''),
        );
        setIsSubmitting(false);
        return;
      }

      if (updatedRoom) {
        setRoom(updatedRoom);
        setSocketRoom(updatedRoom);
      }

      setSolvedQuestions((prev) => {
        const next = new Set(prev);
        next.add(currentProblemIndex);
        return next;
      });
      setQuestionSolveTimes((prev) => {
        const next = [...prev];
        next[currentProblemIndex] = solveTime;
        return next;
      });
      setConsoleOutput(
        `✓ Accepted! Question ${currentProblemIndex + 1} solved in ${formatTime(solveTime)}`,
      );

      setTimeout(() => {
        if (currentProblemIndex < totalQuestions - 1) {
          moveToNextQuestion();
        } else {
          setAllDone(true);
        }
      }, 1500);
    } catch (err) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

  if (!displayRoom || !currentProblem) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <BattleErrorBoundary roomId={roomId}>
      <div className="flex h-[calc(100vh-64px)] flex-col bg-slate-950">
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
          <div className="flex items-center gap-4">
            {/* Question navigation */}
            <div className="flex items-center gap-1">
              {problems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Allow viewing other problems but editing current only
                    setCurrentProblemIndex(idx);
                    const p = problems[idx];
                    if (p && !solvedQuestions.has(idx)) {
                      const saved = localStorage.getItem(`battle_${roomId}_q${idx}`);
                      setCode(
                        saved ?? p.boilerplate[language] ?? p.boilerplate['javascript'] ?? '',
                      );
                    } else if (p) {
                      setCode(p.boilerplate[language] ?? '');
                    }
                    setConsoleOutput('');
                  }}
                  className={`h-7 w-7 rounded text-xs font-bold transition-colors ${
                    idx === currentProblemIndex
                      ? 'bg-primary-600 text-white'
                      : solvedQuestions.has(idx)
                        ? 'bg-green-700/50 text-green-300'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                  title={`Question ${idx + 1}${solvedQuestions.has(idx) ? ' ✓' : ''}`}
                >
                  {solvedQuestions.has(idx) ? '✓' : idx + 1}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400">
              Q{currentProblemIndex + 1}/{totalQuestions} • {solvedQuestions.size}/{totalQuestions}{' '}
              solved
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-slate-100">
                Time Left: {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-slate-500">battle remaining</div>
            </div>
          </div>

          {/* Language + actions */}
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as ProgrammingLanguage)}
              disabled={allDone}
              className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-white disabled:opacity-50"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <button
              onClick={() => setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')}
              className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
            >
              {theme === 'vs-dark' ? '☀️' : '🌙'}
            </button>
            <Button
              onClick={handleRunCode}
              disabled={isRunning || allDone}
              className="bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700"
            >
              {isRunning ? 'Running…' : '▶ Run'}
            </Button>
            <Button
              onClick={handleSubmitSolution}
              disabled={isSubmitting || allDone || solvedQuestions.has(currentProblemIndex)}
              isLoading={isSubmitting}
              className="bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
            >
              {solvedQuestions.has(currentProblemIndex) ? '✓ Solved' : 'Submit'}
            </Button>
            {currentProblemIndex < totalQuestions - 1 && (
              <Button
                onClick={moveToNextQuestion}
                disabled={allDone}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                Skip →
              </Button>
            )}
          </div>
        </div>

        {allDone && (
          <div className="shrink-0 border-b border-green-700 bg-green-900/50 px-4 py-2 text-center">
            <span className="font-semibold text-green-300">
              🎉 Battle complete! Solved {solvedQuestions.size}/{totalQuestions} questions.
              {displayRoom?.status === 'FINISHED'
                ? ' Redirecting to results...'
                : ' Waiting for your opponent to finish.'}
            </span>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Problem Panel */}
          <div className="w-[380px] shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-950">
            <div className="space-y-5 p-5">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <h1 className="text-xl font-bold text-white">{currentProblem.title}</h1>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      currentProblem.difficulty === 'EASY'
                        ? 'bg-green-900 text-green-100'
                        : currentProblem.difficulty === 'MEDIUM'
                          ? 'bg-yellow-900 text-yellow-100'
                          : 'bg-red-900 text-red-100'
                    }`}
                  >
                    {currentProblem.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Topic: {currentProblem.topic}</p>
              </div>

              <div>
                <h2 className="mb-2 text-sm font-semibold text-slate-200">Description</h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  {currentProblem.description}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-200">Examples</h3>
                {currentProblem.examples.map((ex, idx) => (
                  <div key={idx} className="mb-2 space-y-1 rounded bg-slate-900 p-3">
                    <p className="font-mono text-xs text-slate-400">Input: {ex.input}</p>
                    <p className="font-mono text-xs text-slate-400">Output: {ex.output}</p>
                    {ex.explanation && <p className="text-xs text-slate-500">{ex.explanation}</p>}
                  </div>
                ))}
              </div>

              {currentProblem.constraints.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-200">Constraints</h3>
                  <ul className="space-y-1">
                    {currentProblem.constraints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-xs text-slate-300">
                        <span className="text-blue-400">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Leaderboard */}
              <div className="border-t border-slate-800 pt-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-200">Live Standings</h3>
                <div className="space-y-2">
                  {displayRoom.players.map((player) => {
                    const progress = playerProgress.find((p) => p.userId === player.userId);
                    const isMe = player.userId === currentUserId;
                    return (
                      <div
                        key={player.userId}
                        className={`rounded p-2 text-xs ${isMe ? 'bg-primary-900/30 border-primary-700/30 border' : 'bg-slate-900'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-medium ${isMe ? 'text-primary-300' : 'text-white'}`}
                          >
                            {player.username} {isMe ? '(you)' : ''}
                          </span>
                          {isMe && (
                            <span className="text-green-400">
                              {solvedQuestions.size}/{totalQuestions} solved
                            </span>
                          )}
                        </div>
                        {isMe && questionSolveTimes.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {questionSolveTimes.map((t, i) => (
                              <span key={i} className="rounded bg-green-900/40 px-1 text-green-300">
                                Q{i + 1}: {formatTime(t)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Editor + Console */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {(error || socketError) && (
              <div className="shrink-0">
                <Alert message={error || socketError!} />
              </div>
            )}

            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={LANGUAGE_MAP[language]}
                value={code}
                onChange={handleCodeChange}
                theme={theme}
                options={{
                  fontSize: 14,
                  fontFamily: 'Fira Code, Consolas, monospace',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  readOnly: allDone || solvedQuestions.has(currentProblemIndex),
                }}
                onMount={(editor) => {
                  editorRef.current = editor;
                  console.debug('BattleCodingPage editor initialized', {
                    roomId,
                    currentProblemIndex,
                  });
                }}
              />
            </div>

            {/* Console */}
            <div className="h-40 shrink-0 overflow-y-auto border-t border-slate-700 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1">
                <span className="text-xs font-semibold text-slate-400">Console</span>
                <button
                  onClick={() => setConsoleOutput('')}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              </div>
              <div className="p-3 font-mono text-xs">
                <pre className="whitespace-pre-wrap break-words text-slate-300">
                  {consoleOutput || 'Run your code to see output here...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BattleErrorBoundary>
  );
}

export function BattleCodingPage() {
  return (
    <BattleErrorBoundary>
      <BattleCodingPageContent />
    </BattleErrorBoundary>
  );
}
