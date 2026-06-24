import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { ProgrammingLanguage, Problem } from '@/types';
import { Button } from '@/components/ui/Button';

const LANGUAGE_MAP: Record<ProgrammingLanguage, string> = {
  java: 'java',
  python: 'python',
  cpp: 'cpp',
  javascript: 'javascript',
};

const BOILERPLATE: Record<ProgrammingLanguage, string> = {
  java: `public class Solution {
    public void solve() {
        // Write your code here
    }
}`,
  python: `def solve():
    # Write your code here
    pass`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
  javascript: `function solve() {
    // Write your code here
}`,
};

const DEFAULT_PROBLEM: Problem = {
  id: '1',
  title: 'Two Sum',
  description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume each input has exactly one solution, and you cannot use the same element twice.',
  difficulty: 'EASY',
  topic: 'Array',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
  ],
  boilerplate: BOILERPLATE,
};

const STORAGE_KEYS = {
  code: 'codebattle_code',
  language: 'codebattle_language',
  theme: 'codebattle_theme',
} as const;

export function CodingEditorPage() {
  const [problem] = useState<Problem>(DEFAULT_PROBLEM);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');
  const [theme, setTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const monacoRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem(STORAGE_KEYS.code);
    const savedLanguage = (localStorage.getItem(STORAGE_KEYS.language) as ProgrammingLanguage) || 'javascript';
    const savedTheme = (localStorage.getItem(STORAGE_KEYS.theme) as 'vs-light' | 'vs-dark') || 'vs-dark';

    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(BOILERPLATE[savedLanguage]);
    }
    setLanguage(savedLanguage);
    setTheme(savedTheme);
  }, []);

  // Auto-save code to localStorage
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined) return;
    setCode(newCode);

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.code, newCode);
      console.log('Code auto-saved');
    }, 1000);
  };

  const handleLanguageChange = (newLanguage: ProgrammingLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEYS.language, newLanguage);
    setCode(BOILERPLATE[newLanguage]);
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'vs-dark' ? 'vs-light' : 'vs-dark';
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.theme, newTheme);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleOutput('Running code...\n');

    try {
      // Simulate code execution
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConsoleOutput(
        `Output:\nCode executed successfully (console output would appear here)\n\nExecution time: 12ms\nMemory: 45MB`
      );
    } catch (error) {
      setConsoleOutput(`Error:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setConsoleOutput('Submitting solution...\n');

    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setConsoleOutput(
        `✓ All tests passed!\n\nRuntime: 45ms (faster than 95.2% of submissions)\nMemory: 45.3MB (less than 87.5% of submissions)\n\n✓ Solution accepted!`
      );
    } catch (error) {
      setConsoleOutput(`✗ Submission failed:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-950">
      {/* Problem Panel */}
      <div className="w-1/3 border-r border-slate-700 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  problem.difficulty === 'EASY'
                    ? 'bg-green-900 text-green-100'
                    : problem.difficulty === 'MEDIUM'
                      ? 'bg-yellow-900 text-yellow-100'
                      : 'bg-red-900 text-red-100'
                }`}
              >
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1).toLowerCase()}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-200 mb-3">Description</h2>
            <p className="text-slate-300 leading-relaxed">{problem.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Examples</h3>
            {problem.examples.map((example, idx) => (
              <div key={idx} className="bg-slate-900 rounded-lg p-4 mb-3 space-y-2">
                <div>
                  <p className="text-slate-400 text-sm font-mono">Input: {example.input}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-mono">Output: {example.output}</p>
                </div>
                {example.explanation && (
                  <div>
                    <p className="text-slate-400 text-sm">Explanation: {example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Constraints</h3>
            <ul className="space-y-2">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Editor and Console */}
      <div className="flex-1 flex flex-col">
        {/* Editor Toolbar */}
        <div className="border-b border-slate-700 bg-slate-900 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-300">Language:</label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as ProgrammingLanguage)}
              className="bg-slate-800 text-white px-3 py-1 rounded text-sm border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleThemeChange}
              className="px-3 py-1 rounded text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-600"
            >
              {theme === 'vs-dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm"
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 border-b border-slate-700">
          <Editor
            height="100%"
            language={LANGUAGE_MAP[language]}
            value={code}
            onChange={handleCodeChange}
            theme={theme}
            options={{
              fontSize: 14,
              fontFamily: 'Fira Code, monospace',
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              lineNumbers: 'on',
              formatOnPaste: true,
              formatOnType: true,
              suggestOnTriggerCharacters: true,
            }}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
              monacoRef.current = monaco;
            }}
          />
        </div>

        {/* Console Panel */}
        <div className="h-48 bg-slate-900 border-t border-slate-700 overflow-y-auto">
          <div className="p-4 font-mono text-sm">
            <div className="text-slate-400 whitespace-pre-wrap break-words">{consoleOutput}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
