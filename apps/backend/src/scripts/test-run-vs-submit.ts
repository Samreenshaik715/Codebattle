import { executeCode } from '../modules/execution/execution.service.js';

async function test() {
  // Simple sum problem in python
  const pyCode = `def solve(nums):\n    return sum(nums)`;
  const jsCode = `function solve(nums) { return nums.reduce((a,b)=>a+b,0); }`;
  const cppCode = `#include <vector>\nlong long solve(const std::vector<long long>& nums) { long long s=0; for(auto v: nums) s+=v; return s; }`;
  const javaCode = `public static Object solve(java.util.List nums) { int s=0; for(Object x: nums) s += ((Number)x).intValue(); return s; }`;

  const testCases = [
    {
      input: '[1,2,3]',
      executionInput: JSON.stringify([[1, 2, 3]]),
      expectedOutput: JSON.stringify(6),
    },
    { input: '[4,5]', executionInput: JSON.stringify([[4, 5]]), expectedOutput: JSON.stringify(9) },
  ];

  console.log('Testing Python run vs submit');
  const pyResultRun = await executeCode({
    language: 'python',
    code: pyCode,
    testCases,
    timeoutMs: 5000,
  });
  const pyResultSubmit = await executeCode({
    language: 'python',
    code: pyCode,
    testCases,
    timeoutMs: 5000,
  });
  console.log('Python verdicts', pyResultRun.verdict, pyResultSubmit.verdict);
  if (pyResultRun.verdict !== pyResultSubmit.verdict) {
    console.error('Mismatch between run and submit for python');
    process.exit(1);
  }

  console.log('Testing JS run vs submit');
  const jsResultRun = await executeCode({
    language: 'javascript',
    code: jsCode,
    testCases,
    timeoutMs: 5000,
  });
  const jsResultSubmit = await executeCode({
    language: 'javascript',
    code: jsCode,
    testCases,
    timeoutMs: 5000,
  });
  console.log('JS verdicts', jsResultRun.verdict, jsResultSubmit.verdict);
  if (jsResultRun.verdict !== jsResultSubmit.verdict) {
    console.error('Mismatch between run and submit for javascript');
    process.exit(1);
  }

  console.log('Run vs Submit identical for Python and JS');
  // C++
  console.log('Testing C++ run vs submit');
  const cppResultRun = await executeCode({
    language: 'cpp',
    code: cppCode,
    testCases,
    timeoutMs: 5000,
  });
  const cppResultSubmit = await executeCode({
    language: 'cpp',
    code: cppCode,
    testCases,
    timeoutMs: 5000,
  });
  console.log('C++ verdicts', cppResultRun.verdict, cppResultSubmit.verdict);
  if (cppResultRun.verdict !== cppResultSubmit.verdict) {
    console.error('Mismatch for cpp');
    process.exit(1);
  }

  // Java
  console.log('Testing Java run vs submit');
  const javaResultRun = await executeCode({
    language: 'java',
    code: javaCode,
    testCases,
    timeoutMs: 5000,
  });
  const javaResultSubmit = await executeCode({
    language: 'java',
    code: javaCode,
    testCases,
    timeoutMs: 5000,
  });
  console.log('Java verdicts', javaResultRun.verdict, javaResultSubmit.verdict);
  if (javaResultRun.verdict !== javaResultSubmit.verdict) {
    console.error('Mismatch for java');
    process.exit(1);
  }

  console.log('Run vs Submit identical for Python, JS, C++, and Java');
  process.exit(0);
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
