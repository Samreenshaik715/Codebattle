import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { AppError } from '../../middleware/errorHandler.js';
import { env } from '../../config/env.js';
import type { ExecuteCodeInput } from './execution.schema.js';
import type {
  ExecutionResult,
  ExecutionVerdict,
  SupportedLanguage,
  TestCaseResult,
} from './execution.types.js';
import { prisma } from '../../config/database.js';

// ---------------------------------------------------------------------------
// Spawn helper — pipes stdin and captures stdout/stderr
// ---------------------------------------------------------------------------
async function execFileWithInput(
  file: string,
  args: string[],
  stdin?: string,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', reject);
    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        const error: any = new Error('Child process failed');
        error.code = code;
        error.signal = signal;
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
      }
    });
    if (stdin) child.stdin.write(stdin);
    child.stdin.end();
  });
}

// ---------------------------------------------------------------------------
// Language config
// ---------------------------------------------------------------------------
const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  { sourceFile: string; compileCommand?: string; runCommand: string }
> = {
  python:     { sourceFile: 'Solution.py',   runCommand: 'python3 Solution.py' },
  javascript: { sourceFile: 'Solution.js',   runCommand: 'node Solution.js' },
  java: {
    sourceFile:     'Solution.java',
    compileCommand: 'javac Solution.java',
    runCommand:     'java -cp . Solution',
  },
  cpp: {
    sourceFile:     'Solution.cpp',
    compileCommand: 'g++ -O2 -std=c++17 Solution.cpp -o solution',
    runCommand:     './solution',
  },
};

// ---------------------------------------------------------------------------
// LeetCode-style input parser
// Converts "nums = [1,2,3], target = 9" → [[1,2,3], 9]
// ---------------------------------------------------------------------------
function parseLeetCodeInput(raw: string): any[] {
  if (!raw || raw.trim() === '') return [];

  const trimmed = raw.trim();

  // If it's already valid JSON (array or primitive), use it directly
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed;
    return [parsed];
  } catch (_) { /* not plain JSON, continue */ }

  // Parse "key = value, key = value, ..." format
  // Strategy: split on ", varname =" boundaries
  const args: any[] = [];
  // Match patterns like:  varname = <value>
  // value can be: array [...], number, boolean, string "...", null
  const pattern = /\w+\s*=\s*(\[(?:[^\[\]]|\[(?:[^\[\]]|\[[^\[\]]*\])*\])*\]|"[^"]*"|'[^']*'|-?\d+\.?\d*|true|false|null)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(trimmed)) !== null) {
    const rawValue = match[1];
    if (rawValue === undefined) {
      continue;
    }
    const val = rawValue.trim();
    try {
      // Replace Python None/null variants
      const normalized = val
        .replace(/\bNull\b/g, 'null')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false');
      args.push(JSON.parse(normalized));
    } catch (_) {
      args.push(val);
    }
  }

  if (args.length > 0) return args;

  // Fallback: treat the whole thing as a single string argument
  return [trimmed];
}

// ---------------------------------------------------------------------------
// Normalize output for comparison
// ---------------------------------------------------------------------------
function normalizeOutput(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/u, ''))
    .join('\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Docker helpers
// ---------------------------------------------------------------------------
function getDockerVolumePath(hostPath: string): string {
  const resolved = resolve(hostPath);
  if (process.platform !== 'win32') return resolved;
  const normalized = resolved.replace(/\\/g, '/');
  if (/^[A-Za-z]:\//.test(normalized))
    return `/${normalized.charAt(0).toLowerCase()}${normalized.slice(2)}`;
  return normalized;
}

interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  signal: string | null;
  timedOut: boolean;
}

async function executeDockerCommand(args: string[], stdin?: string): Promise<CommandResult> {
  try {
    const { stdout, stderr } = await execFileWithInput('docker', args, stdin);
    return { stdout, stderr, exitCode: 0, signal: null, timedOut: false };
  } catch (error: unknown) {
    const e = error as {
      stdout?: Buffer | string;
      stderr?: Buffer | string;
      code?: number | null;
      signal?: string | null;
      killed?: boolean;
      errno?: string;
    };
    if (e.errno === 'ENOENT')
      throw new AppError(
        'Docker is not running or not installed. Start Docker Desktop and try again.',
        503,
      );
    const stdoutStr = e.stdout ? e.stdout.toString() : '';
    const stderrStr = e.stderr ? e.stderr.toString() : '';
    console.error('Docker execution failed', { args: args.slice(0, 6), code: e.code, errno: e.errno, stderr: stderrStr });
    if (e.code === 125 || e.code === 126 || e.code === 127)
      throw new AppError(
        `Container execution failed (exit ${e.code}). ${(stderrStr || stdoutStr).slice(0, 300)}`.trim(),
        500,
      );
    return {
      stdout: stdoutStr,
      stderr: stderrStr,
      exitCode: e.code ?? null,
      signal: e.signal ?? null,
      timedOut: Boolean(e.killed),
    };
  }
}

function buildDockerArgs(workspacePath: string, command: string): string[] {
  const hostPath = getDockerVolumePath(workspacePath);
  return [
    'run', '--rm',
    '--network', 'none',
    '--ipc', 'none',
    '--read-only',
    '--tmpfs', '/tmp:rw,size=64m',
    '--memory', env.CODE_EXECUTION_MEMORY,
    '--memory-swap', env.CODE_EXECUTION_MEMORY,
    '--cpus', env.CODE_EXECUTION_CPU,
    '--pids-limit', env.CODE_EXECUTION_PIDS_LIMIT.toString(),
    '--security-opt', 'no-new-privileges',
    '--cap-drop', 'ALL',
    '-v', `${hostPath}:/workspace:rw`,
    '-w', '/workspace',
    env.CODE_EXECUTOR_IMAGE,
    'sh', '-c', command,
  ];
}

async function createWorkspace(code: string, sourceFile: string): Promise<string> {
  const workspace = await fs.mkdtemp(join(tmpdir(), 'codebattle-'));
  await fs.writeFile(join(workspace, sourceFile), code, 'utf8');
  return workspace;
}

// ---------------------------------------------------------------------------
// Harness builder — wraps user code so it auto-runs all test cases and
// prints JSON results. The user just needs to define a `solve(...)` function.
// ---------------------------------------------------------------------------

interface TestCaseForHarness {
  input: string;
  executionInput?: string;
  expectedOutput: string;
}

/**
 * Get the actual arguments to pass. Prefers executionInput if different from
 * human-readable input, otherwise parses the human-readable string.
 */
function resolveArgs(tc: TestCaseForHarness): any[] {
  const raw = tc.executionInput ?? tc.input ?? '';
  return parseLeetCodeInput(raw);
}

function safeJson(v: any): string {
  return JSON.stringify(v).replace(/</g, '\\u003c');
}

function buildHarnessedSource(
  language: SupportedLanguage,
  userCode: string,
  testCases: TestCaseForHarness[],
): string {
  // Build a simple list of {args: any[], expected: string} for the harness
  const cases = testCases.map((tc) => ({
    args: resolveArgs(tc),
    expected: tc.expectedOutput,
    rawInput: tc.input,
  }));

  // -------------------------------------------------------------------------
  // Python
  // -------------------------------------------------------------------------
  if (language === 'python') {
    return `import json, sys, time, traceback

${userCode}

def _serialize(v):
    try:
        return json.dumps(v, ensure_ascii=False)
    except Exception:
        return str(v)

def _values_equal(actual, expected_str):
    try:
        exp = json.loads(expected_str)
    except Exception:
        exp = expected_str
    try:
        act = json.loads(json.dumps(actual, ensure_ascii=False))
    except Exception:
        act = actual
    # Sort lists for unordered comparison (e.g. intersection problems)
    def norm(x):
        if isinstance(x, list):
            try:
                return sorted(norm(i) for i in x)
            except TypeError:
                return x
        return x
    if act == exp:
        return True
    if str(act).strip() == str(exp).strip():
        return True
    return False

_cases = ${safeJson(cases)}
_results = []

for _idx, _tc in enumerate(_cases):
    _start = time.time()
    _actual = None
    _stderr = ''
    _verdict = 'Accepted'
    try:
        _args = _tc['args']
        if isinstance(_args, list):
            _actual = solve(*_args)
        elif _args is None:
            _actual = solve()
        else:
            _actual = solve(_args)
    except Exception as _e:
        _verdict = 'Runtime Error'
        _stderr = traceback.format_exc()
    _duration = int((time.time() - _start) * 1000)
    if _verdict == 'Accepted':
        if not _values_equal(_actual, _tc['expected']):
            _verdict = 'Wrong Answer'
    _results.append({
        'index': _idx,
        'input': _tc['rawInput'],
        'expectedOutput': _tc['expected'],
        'actualOutput': _serialize(_actual) if _actual is not None else '',
        'stderr': _stderr,
        'durationMs': _duration,
        'verdict': _verdict,
    })

print(json.dumps({'results': _results}))
`;
  }

  // -------------------------------------------------------------------------
  // JavaScript
  // -------------------------------------------------------------------------
  if (language === 'javascript') {
    return `${userCode}

(function() {
  const cases = ${safeJson(cases)};
  const results = [];

  function valuesEqual(actual, expectedStr) {
    let exp;
    try { exp = JSON.parse(expectedStr); } catch(_) { exp = expectedStr; }
    if (JSON.stringify(actual) === JSON.stringify(exp)) return true;
    // Try sorted comparison for arrays
    function sortDeep(x) {
      if (Array.isArray(x)) return [...x].map(sortDeep).sort((a,b) => JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
      return x;
    }
    try {
      if (JSON.stringify(sortDeep(actual)) === JSON.stringify(sortDeep(exp))) return true;
    } catch(_) {}
    return String(actual).trim() === String(exp).trim();
  }

  for (let idx = 0; idx < cases.length; idx++) {
    const tc = cases[idx];
    const start = Date.now();
    let actual = undefined;
    let stderr = '';
    let verdict = 'Accepted';
    try {
      const args = tc.args;
      if (Array.isArray(args)) {
        actual = solve(...args);
      } else if (args === null || args === undefined) {
        actual = solve();
      } else {
        actual = solve(args);
      }
    } catch(e) {
      stderr = (e && e.stack) ? e.stack : String(e);
      verdict = 'Runtime Error';
    }
    const durationMs = Date.now() - start;
    if (verdict === 'Accepted') {
      if (!valuesEqual(actual, tc.expected)) verdict = 'Wrong Answer';
    }
    results.push({
      index: idx,
      input: tc.rawInput,
      expectedOutput: tc.expected,
      actualOutput: actual !== undefined ? JSON.stringify(actual) : '',
      stderr,
      durationMs,
      verdict,
    });
  }
  console.log(JSON.stringify({ results }));
})();
`;
  }

  // -------------------------------------------------------------------------
  // C++  — passes args as JSON strings and parses them inside the harness
  // -------------------------------------------------------------------------
  if (language === 'cpp') {
    const casesJson = safeJson(cases);
    return `#include <bits/stdc++.h>
using namespace std;

// ---- user code ----
${userCode}
// ---- end user code ----

// Minimal JSON array parser — returns vector<string> of top-level values
vector<string> splitJsonArray(const string& s) {
    vector<string> out;
    int depth = 0;
    bool inStr = false;
    string cur;
    for (size_t i = 0; i < s.size(); i++) {
        char c = s[i];
        if (c == '"' && (i == 0 || s[i-1] != '\\\\')) inStr = !inStr;
        if (!inStr) {
            if (c == '[' || c == '{') depth++;
            else if (c == ']' || c == '}') depth--;
            if ((c == ',' && depth == 1)) { out.push_back(cur); cur = ""; continue; }
            if (depth == 0 && c == ']' && !cur.empty()) { out.push_back(cur); break; }
            if (depth >= 1 && !(c == '[' && depth == 1)) cur += c;
        } else {
            cur += c;
        }
    }
    return out;
}

long long parseLL(const string& s) { return stoll(s); }
double parseD(const string& s)    { return stod(s); }
bool   parseBool(const string& s) { return s == "true"; }
string parseStr(const string& s) {
    if (s.size() >= 2 && s[0] == '"') return s.substr(1, s.size()-2);
    return s;
}
vector<int>    parseIntVec(const string& s)  { auto t=splitJsonArray(s); vector<int> v; for(auto&x:t) v.push_back((int)parseLL(x)); return v; }
vector<long long> parseLLVec(const string& s){ auto t=splitJsonArray(s); vector<long long> v; for(auto&x:t) v.push_back(parseLL(x)); return v; }
vector<string> parseStrVec(const string& s)  { auto t=splitJsonArray(s); vector<string> v; for(auto&x:t) v.push_back(parseStr(x)); return v; }
vector<vector<int>> parseIntMat(const string& s) {
    auto rows=splitJsonArray(s); vector<vector<int>> m;
    for(auto&r:rows) m.push_back(parseIntVec(r)); return m;
}

// to_string helpers
string _ts(int v)         { return to_string(v); }
string _ts(long long v)   { return to_string(v); }
string _ts(bool v)        { return v?"true":"false"; }
string _ts(double v)      { ostringstream o; o<<v; return o.str(); }
string _ts(const string&v){ return "\\""+v+"\\""; }
template<typename T>
string _ts(const vector<T>&v){ string s="["; for(size_t i=0;i<v.size();i++){ if(i)s+=","; s+=_ts(v[i]); } return s+"]"; }

string escapeJson(const string& s) {
    string out; for(char c:s){ if(c=='"') out+="\\\\\""; else if(c=='\\\\') out+="\\\\\\\\"; else if(c=='\\n') out+="\\\\n"; else out+=c; }
    return out;
}

bool resultsEqual(const string& actual, const string& expected) {
    return actual == expected;
}

int main() {
    // Embedded test cases as JSON string
    string casesJson = R"(${casesJson})";
    // Parse outer array
    vector<string> caseItems = splitJsonArray(casesJson);

    vector<string> results;

    for (size_t idx = 0; idx < caseItems.size(); idx++) {
        // Parse each case: {"args":[...],"expected":"...","rawInput":"..."}
        string& item = caseItems[idx];

        // Extract "args" array
        auto argsPos = item.find("\\"args\\":");
        string argsStr;
        if (argsPos != string::npos) {
            size_t start = item.find('[', argsPos);
            if (start != string::npos) {
                int depth = 0;
                size_t end = start;
                bool inStr = false;
                for (; end < item.size(); end++) {
                    char c = item[end];
                    if (c == '"' && (end == 0 || item[end-1] != '\\\\')) inStr = !inStr;
                    if (!inStr) { if(c=='['||c=='{') depth++; else if(c==']'||c=='}') depth--; }
                    if (depth == 0) break;
                }
                argsStr = item.substr(start, end-start+1);
            }
        }

        // Extract "expected" string
        string expected;
        auto expPos = item.find("\\"expected\\":");
        if (expPos != string::npos) {
            size_t vs = item.find('"', expPos+10);
            if (vs != string::npos) {
                size_t ve = vs+1;
                while (ve < item.size() && !(item[ve]=='"' && item[ve-1]!='\\\\')) ve++;
                expected = item.substr(vs+1, ve-vs-1);
            }
        }

        // Extract "rawInput"
        string rawInput;
        auto riPos = item.find("\\"rawInput\\":");
        if (riPos != string::npos) {
            size_t vs = item.find('"', riPos+11);
            if (vs != string::npos) {
                size_t ve = vs+1;
                while (ve < item.size() && !(item[ve]=='"' && item[ve-1]!='\\\\')) ve++;
                rawInput = item.substr(vs+1, ve-vs-1);
            }
        }

        vector<string> argsList = splitJsonArray(argsStr);

        auto tstart = chrono::high_resolution_clock::now();
        string actual;
        string stderr_s;
        string verdict = "Accepted";

        try {
            auto res = solve(argsList);
            actual = res;
        } catch (const exception& e) {
            verdict = "Runtime Error";
            stderr_s = e.what();
        } catch (...) {
            verdict = "Runtime Error";
            stderr_s = "Unknown exception";
        }

        long long dur = chrono::duration_cast<chrono::milliseconds>(
            chrono::high_resolution_clock::now() - tstart).count();

        if (verdict == "Accepted") {
            if (!resultsEqual(actual, expected)) verdict = "Wrong Answer";
        }

        string entry = string("{\\"index\\":") + to_string(idx)
            + ",\\"input\\":\\"" + escapeJson(rawInput) + "\\""
            + ",\\"expectedOutput\\":\\"" + escapeJson(expected) + "\\""
            + ",\\"actualOutput\\":\\"" + escapeJson(actual) + "\\""
            + ",\\"stderr\\":\\"" + escapeJson(stderr_s) + "\\""
            + ",\\"durationMs\\":" + to_string(dur)
            + ",\\"verdict\\":\\"" + verdict + "\\"}";
        results.push_back(entry);
    }

    cout << "{\\"results\\":[";
    for (size_t i = 0; i < results.size(); i++) { if(i) cout<<","; cout<<results[i]; }
    cout << "]}" << endl;
    return 0;
}
`;
  }

  // -------------------------------------------------------------------------
  // Java — same approach: embed cases as JSON, parse at runtime
  // -------------------------------------------------------------------------
  if (language === 'java') {
    const casesJson = safeJson(cases).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `import java.util.*;

public class Solution {

// ---- user code ----
${userCode}
// ---- end user code ----

    static List<String> splitJsonArray(String s) {
        List<String> out = new ArrayList<>();
        int depth = 0;
        boolean inStr = false;
        StringBuilder cur = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"' && (i == 0 || s.charAt(i-1) != '\\\\')) inStr = !inStr;
            if (!inStr) {
                if (c == '[' || c == '{') depth++;
                else if (c == ']' || c == '}') depth--;
                if (c == ',' && depth == 1) { out.add(cur.toString().trim()); cur = new StringBuilder(); continue; }
                if (depth == 0 && c == ']' && cur.length() > 0) { out.add(cur.toString().trim()); break; }
                if (depth >= 1 && !(c == '[' && depth == 1)) cur.append(c);
            } else {
                cur.append(c);
            }
        }
        return out;
    }

    static int[] parseIntArr(String s) {
        List<String> parts = splitJsonArray(s);
        int[] arr = new int[parts.size()];
        for (int i = 0; i < parts.size(); i++) arr[i] = Integer.parseInt(parts.get(i).trim());
        return arr;
    }

    static String escJson(String s) {
        return s.replace("\\\\", "\\\\\\\\").replace("\\"", "\\\\\\"").replace("\\n", "\\\\n");
    }

    static String extract(String json, String key) {
        int pos = json.indexOf("\\"" + key + "\\":");
        if (pos < 0) return "";
        int vs = json.indexOf('"', pos + key.length() + 3);
        if (vs < 0) return "";
        int ve = vs + 1;
        while (ve < json.length() && !(json.charAt(ve) == '"' && json.charAt(ve-1) != '\\\\')) ve++;
        return json.substring(vs+1, ve);
    }

    static String extractArray(String json, String key) {
        int pos = json.indexOf("\\"" + key + "\\":");
        if (pos < 0) return "[]";
        int start = json.indexOf('[', pos + key.length() + 3);
        if (start < 0) return "[]";
        int depth = 0; int end = start; boolean inStr = false;
        for (; end < json.length(); end++) {
            char c = json.charAt(end);
            if (c == '"' && (end == 0 || json.charAt(end-1) != '\\\\')) inStr = !inStr;
            if (!inStr) { if(c=='['||c=='{') depth++; else if(c==']'||c=='}') depth--; }
            if (depth == 0) break;
        }
        return json.substring(start, end+1);
    }

    public static void main(String[] args) {
        String casesJson = "${casesJson}";
        List<String> caseItems = splitJsonArray(casesJson);
        List<String> results = new ArrayList<>();

        for (int idx = 0; idx < caseItems.size(); idx++) {
            String item = caseItems.get(idx);
            String argsStr = extractArray(item, "args");
            String expected = extract(item, "expected");
            String rawInput = extract(item, "rawInput");
            List<String> argsList = splitJsonArray(argsStr);

            long tstart = System.currentTimeMillis();
            String actual = "";
            String stderrS = "";
            String verdict = "Accepted";

            try {
                actual = solve(argsList);
            } catch (Exception e) {
                verdict = "Runtime Error";
                stderrS = e.toString();
            }

            long dur = System.currentTimeMillis() - tstart;
            if (verdict.equals("Accepted") && !actual.equals(expected)) verdict = "Wrong Answer";

            String entry = String.format(
                "{\\"index\\":%d,\\"input\\":\\"%s\\",\\"expectedOutput\\":\\"%s\\",\\"actualOutput\\":\\"%s\\",\\"stderr\\":\\"%s\\",\\"durationMs\\":%d,\\"verdict\\":\\"%s\\"}",
                idx, escJson(rawInput), escJson(expected), escJson(actual), escJson(stderrS), dur, verdict
            );
            results.add(entry);
        }

        System.out.print("{\\"results\\":[");
        for (int i = 0; i < results.size(); i++) { if(i>0) System.out.print(","); System.out.print(results.get(i)); }
        System.out.println("]}");
    }
}
`;
  }

  return userCode;
}

// ---------------------------------------------------------------------------
// Compile + run
// ---------------------------------------------------------------------------
async function compileSource(workspace: string, language: SupportedLanguage): Promise<CommandResult | null> {
  const config = LANGUAGE_CONFIG[language];
  if (!config.compileCommand) return null;
  console.debug('Compiling', { language, workspace });
  const result = await executeDockerCommand(
    buildDockerArgs(workspace, `timeout 15s ${config.compileCommand} 2>&1`),
  );
  console.debug('Compile result', { exitCode: result.exitCode, stderr: result.stderr?.slice(0, 200) });
  return result;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export async function executeCode(input: ExecuteCodeInput): Promise<ExecutionResult> {
  const { language, code, testCases, timeoutMs } = input;
  const config = LANGUAGE_CONFIG[language];
  const startTime = Date.now();
  console.info('executeCode request', {
    language,
    timeoutMs,
    testCaseCount: testCases.length,
    code,
    testCases: testCases.map((tc) => ({
      input: tc.input,
      executionInput: tc.executionInput,
      expectedOutput: tc.expectedOutput,
    })),
  });

  const harnessed = buildHarnessedSource(language, code, testCases as any);
  const workspace = await createWorkspace(harnessed, config.sourceFile);

  try {
    // Compile step
    const compileResult = await compileSource(workspace, language);
    if (compileResult && compileResult.exitCode !== 0) {
      const compileOutput = normalizeOutput(compileResult.stderr || compileResult.stdout);
      console.info('executeCode compile failed', {
        language,
        compileOutput,
        wrapperPreview: harnessed.slice(0, 1024),
      });
      return {
        verdict: 'Compilation Error',
        runtimeMs: Date.now() - startTime,
        compileOutput,
        testCaseResults: [],
      };
    }

    // Run step
    const timeoutSeconds = Math.ceil((timeoutMs ?? 5000) / 1000) + 5;
    const runArgs = buildDockerArgs(workspace, `timeout ${timeoutSeconds}s ${config.runCommand}`);
    const proc = await executeDockerCommand(runArgs);
    const stdout = proc.stdout || '';
    const stderrAll = proc.stderr || '';

    // Parse JSON output from harness
    let parsed: any = null;
    try {
      parsed = JSON.parse(stdout.trim());
    } catch (error) {
      console.error('Harness JSON parse failed', {
        error: error instanceof Error ? error.message : String(error),
        stdout: stdout.slice(0, 400),
        stderr: stderrAll.slice(0, 400),
        wrapperPreview: harnessed.slice(0, 1024),
      });
      return {
        verdict: 'Runtime Error',
        runtimeMs: Date.now() - startTime,
        compileOutput: stderrAll || stdout,
        testCaseResults: [],
      };
    }

    if (!parsed || !Array.isArray(parsed.results)) {
      console.error('executeCode invalid harness result', {
        parsed,
        stdout: stdout.slice(0, 400),
        stderr: stderrAll.slice(0, 400),
      });
      return { verdict: 'Runtime Error', runtimeMs: Date.now() - startTime, testCaseResults: [] };
    }

    const testCaseResults: TestCaseResult[] = [];
    let overallVerdict: ExecutionVerdict = 'Accepted';
    for (const r of parsed.results) {
      const tc: TestCaseResult = {
        index: r.index,
        input: String(r.input ?? ''),
        expectedOutput: String(r.expectedOutput ?? ''),
        actualOutput: r.actualOutput !== undefined ? String(r.actualOutput) : '',
        stderr: r.stderr || '',
        durationMs: r.durationMs || 0,
        verdict: (r.verdict as ExecutionVerdict) || 'Runtime Error',
      };
      testCaseResults.push(tc);
      if (tc.verdict !== 'Accepted' && overallVerdict === 'Accepted') {
        overallVerdict = tc.verdict;
      }
    }

    console.info('executeCode result', {
      language,
      runtimeMs: Date.now() - startTime,
      verdict: overallVerdict,
      testCases: testCaseResults.map((tc) => ({
        index: tc.index,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: tc.actualOutput,
        stderr: tc.stderr,
        verdict: tc.verdict,
      })),
    });

    if (overallVerdict !== 'Accepted') {
      return { verdict: overallVerdict, runtimeMs: Date.now() - startTime, testCaseResults };
    }

    return { verdict: 'Accepted', runtimeMs: Date.now() - startTime, testCaseResults };
  } finally {
    await fs.rm(workspace, { recursive: true, force: true });
  }
}

export async function runCodeAgainstProblem(
  problemId: string,
  input: { code: string; language: SupportedLanguage },
): Promise<ExecutionResult> {
  const testCases = await prisma.testCase.findMany({
    where: { questionId: problemId },
    orderBy: { createdAt: 'asc' },
  });
  if (!testCases || testCases.length === 0)
    throw new AppError('No test cases found for this problem', 404);

  const mapped = testCases.map((t) => ({
    input: t.input,
    executionInput: t.executionInput ?? t.input,
    expectedOutput: t.expectedOutput,
  }));

  console.info('runCodeAgainstProblem', { problemId, language: input.language, testCaseCount: mapped.length });
  try {
    return await executeCode({
      language: input.language as any,
      code: input.code,
      testCases: mapped,
      timeoutMs: 5000,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(
      'Error executing submission: ' + (err instanceof Error ? err.message : String(err)),
      500,
    );
  }
}
