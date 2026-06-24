import type { ProblemSeed } from '../seed.ts';

export const stacksProblems: ProblemSeed[] = [
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description:
      'Given a string containing just the characters ()[]{} , determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All open brackets are closed in the correct order.',
      },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only.'],
    sampleInput: 's = "()[]{}"',
    sampleOutput: 'true',
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
      { input: 's = "([)]"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    slug: 'evaluate-reverse-polish-notation',
    description:
      'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 'tokens = ["2","1","+","3","*"]', output: '9' }],
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is an integer or operator.'],
    sampleInput: 'tokens = ["2","1","+","3","*"]',
    sampleOutput: '9',
    testCases: [
      { input: 'tokens = ["2","1","+","3","*"]', expectedOutput: '9' },
      { input: 'tokens = ["4","13","5","/","+"]', expectedOutput: '6' },
      {
        input: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',
        expectedOutput: '22',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Min Stack',
    slug: 'min-stack',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [
      {
        input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
        output: '[-3,0,-2]',
      },
    ],
    constraints: ['Methods called at most 3 * 10^4 times', '-10^5 <= value <= 10^5'],
    sampleInput: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
    sampleOutput: '[-3,0,-2]',
    testCases: [
      {
        input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
        expectedOutput: '[-3,0,-2]',
      },
      { input: 'push(1), push(2), getMin(), pop(), getMin()', expectedOutput: '[1,1]' },
      {
        input: 'push(2), push(2), getMin(), pop(), getMin()',
        expectedOutput: '[2,2]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Simplify Path',
    slug: 'simplify-path',
    description: 'Simplify a given Unix-style file path and return its canonical path.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 'path = "/a/./b/../../c/"', output: '/c' }],
    constraints: ['1 <= path.length <= 3000', 'path is a valid absolute Unix path.'],
    sampleInput: 'path = "/a/./b/../../c/"',
    sampleOutput: '/c',
    testCases: [
      { input: 'path = "/home/"', expectedOutput: '/home' },
      { input: 'path = "/../"', expectedOutput: '/' },
      { input: 'path = "/home//foo/"', expectedOutput: '/home/foo', isHidden: true },
    ],
  },
  {
    title: 'Score of Parentheses',
    slug: 'score-of-parentheses',
    description: 'Compute the score of a balanced parentheses string.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 's = "()"', output: '1' }],
    constraints: ['2 <= s.length <= 50', 's is a balanced parentheses string.'],
    sampleInput: 's = "()"',
    sampleOutput: '1',
    testCases: [
      { input: 's = "()"', expectedOutput: '1' },
      { input: 's = "(())"', expectedOutput: '2' },
      { input: 's = "()()"', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Backspace String Compare',
    slug: 'backspace-string-compare',
    description: 'Compare two strings after processing backspace characters (#).',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 's = "ab#c", t = "ad#c"', output: 'true' }],
    constraints: ['1 <= s.length, t.length <= 200', 's and t contain lowercase letters and #.'],
    sampleInput: 's = "ab#c", t = "ad#c"',
    sampleOutput: 'true',
    testCases: [
      { input: 's = "ab#c", t = "ad#c"', expectedOutput: 'true' },
      { input: 's = "a##c", t = "#a#c"', expectedOutput: 'true' },
      { input: 's = "a#c", t = "b"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Baseball Game',
    slug: 'baseball-game',
    description: 'Calculate the total score of a baseball game given a list of operations.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 'ops = ["5","2","C","D","+"]', output: '30' }],
    constraints: ['1 <= ops.length <= 1000', 'ops[i] is a valid operation.'],
    sampleInput: 'ops = ["5","2","C","D","+"]',
    sampleOutput: '30',
    testCases: [
      { input: 'ops = ["5","2","C","D","+"]', expectedOutput: '30' },
      { input: 'ops = ["5","-2","4","C","D","9","+","+"]', expectedOutput: '27' },
      { input: 'ops = ["1"]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Remove Outermost Parentheses',
    slug: 'remove-outermost-parentheses',
    description:
      'Remove the outermost parentheses of every primitive valid parentheses string in the input string.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 's = "(()())(())"', output: '()()()' }],
    constraints: ['1 <= s.length <= 10^5', 's is a valid parentheses string.'],
    sampleInput: 's = "(()())(())"',
    sampleOutput: '()()()',
    testCases: [
      { input: 's = "(()())(())"', expectedOutput: '()()()' },
      { input: 's = "(()())(())(()())"', expectedOutput: '()()()()()' },
      { input: 's = "()()"', expectedOutput: '""', isHidden: true },
    ],
  },
  {
    title: 'Remove All Adjacent Duplicates in String',
    slug: 'remove-all-adjacent-duplicates-in-string',
    description:
      'Given a string s, repeatedly remove pairs of adjacent duplicate characters until no such pairs remain.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [{ input: 's = "abbaca"', output: '"ca"' }],
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    sampleInput: 's = "abbaca"',
    sampleOutput: '"ca"',
    testCases: [
      { input: 's = "abbaca"', expectedOutput: '"ca"' },
      { input: 's = "azxxzy"', expectedOutput: '"ay"' },
      { input: 's = "aab"', expectedOutput: '"b"', isHidden: true },
    ],
  },
  {
    title: 'Design Browser History',
    slug: 'design-browser-history',
    description:
      'Design a browser history system that supports visiting new URLs, moving backward, and moving forward in history.',
    difficulty: 'EASY',
    topic: 'Stacks',
    examples: [
      {
        input:
          'BrowserHistory("leetcode.com"), visit("google.com"), visit("facebook.com"), back(1), forward(1)',
        output: '[null,null,null,"google.com","facebook.com"]',
      },
    ],
    constraints: ['1 <= homepage.length <= 20', '1 <= url.length <= 20', '1 <= steps <= 100'],
    sampleInput:
      'BrowserHistory("leetcode.com"), visit("google.com"), visit("facebook.com"), back(1), forward(1)',
    sampleOutput: '[null,null,null,"google.com","facebook.com"]',
    testCases: [
      {
        input:
          'BrowserHistory("leetcode.com"), visit("google.com"), visit("facebook.com"), back(1), forward(1)',
        expectedOutput: '[null,null,null,"google.com","facebook.com"]',
      },
      {
        input: 'BrowserHistory("a.com"), visit("b.com"), visit("c.com"), back(2), forward(1)',
        expectedOutput: '[null,null,null,"a.com","b.com"]',
      },
      {
        input: 'BrowserHistory("start.com"), visit("a.com"), visit("b.com"), back(5)',
        expectedOutput: '[null,null,null,"start.com"]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Valid Parentheses II',
    slug: 'valid-parentheses-ii',
    description:
      'Check whether a string containing parentheses and * can be valid by treating * as (, ), or an empty string.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 's = "(*)"', output: 'true' }],
    constraints: ['1 <= s.length <= 100', 's contains only (, ), and *.'],
    sampleInput: 's = "(*)"',
    sampleOutput: 'true',
    testCases: [
      { input: 's = "(*)"', expectedOutput: 'true' },
      { input: 's = "(*))"', expectedOutput: 'true' },
      { input: 's = "((*)"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Implement Stack using Queues',
    slug: 'implement-stack-using-queues',
    description: 'Implement a LIFO stack using only two FIFO queues.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 'push(1), push(2), top(), pop(), empty()', output: '[2,2,false]' }],
    constraints: ['1 <= x <= 10^9', 'At most 100 calls will be made.'],
    sampleInput: 'push(1), push(2), top(), pop(), empty()',
    sampleOutput: '[2,2,false]',
    testCases: [
      { input: 'push(1), push(2), top(), pop(), empty()', expectedOutput: '[2,2,false]' },
      { input: 'push(5), push(3), pop(), top()', expectedOutput: '[3,5]' },
      { input: 'empty()', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Decode String',
    slug: 'decode-string',
    description: 'Decode an encoded string with numbers and nested brackets.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 's = "3[a]2[bc]"', output: '"aaabcbc"' }],
    constraints: ['1 <= s.length <= 30', 's consists of digits, letters, and brackets.'],
    sampleInput: 's = "3[a]2[bc]"',
    sampleOutput: '"aaabcbc"',
    testCases: [
      { input: 's = "3[a]2[bc]"', expectedOutput: '"aaabcbc"' },
      { input: 's = "3[a2[c]]"', expectedOutput: '"accaccacc"' },
      { input: 's = "2[abc]3[cd]ef"', expectedOutput: '"abcabccdcdcdef"', isHidden: true },
    ],
  },
  {
    title: 'Basic Calculator II',
    slug: 'basic-calculator-ii',
    description: 'Evaluate a simple arithmetic expression string containing +, -, *, and /.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 's = "3+2*2"', output: '7' }],
    constraints: ['1 <= s.length <= 3 * 10^5', 's contains digits, operators, and spaces.'],
    sampleInput: 's = "3+2*2"',
    sampleOutput: '7',
    testCases: [
      { input: 's = " 3/2 "', expectedOutput: '1' },
      { input: 's = " 3+5 / 2 "', expectedOutput: '5' },
      { input: 's = "14-3/2"', expectedOutput: '13', isHidden: true },
    ],
  },
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    description: 'Return the number of days until a warmer temperature for each day.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [
      {
        input: 'temperatures = [73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]',
      },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    sampleInput: 'temperatures = [73,74,75,71,69,72,76,73]',
    sampleOutput: '[1,1,4,2,1,1,0,0]',
    testCases: [
      { input: 'temperatures = [30,40,50,60]', expectedOutput: '[1,1,1,0]' },
      { input: 'temperatures = [30,60,90]', expectedOutput: '[1,1,0]' },
      { input: 'temperatures = [90,80,70]', expectedOutput: '[0,0,0]', isHidden: true },
    ],
  },
  {
    title: 'Next Greater Element I',
    slug: 'next-greater-element-i',
    description: 'For each element in nums1, find the next greater element in nums2.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' }],
    constraints: [
      '1 <= nums1.length <= nums2.length <= 1000',
      'nums1 and nums2 contain unique values.',
    ],
    sampleInput: 'nums1 = [4,1,2], nums2 = [1,3,4,2]',
    sampleOutput: '[-1,3,-1]',
    testCases: [
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', expectedOutput: '[3,-1]' },
      { input: 'nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,2,1,7]', expectedOutput: '[7,7,7,7,7]' },
      { input: 'nums1 = [1], nums2 = [1]', expectedOutput: '[-1]', isHidden: true },
    ],
  },
  {
    title: 'Next Greater Element II',
    slug: 'next-greater-element-ii',
    description: 'Find the next greater element for each element in a circular array.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 'nums = [1,2,1]', output: '[2,-1,2]' }],
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    sampleInput: 'nums = [1,2,1]',
    sampleOutput: '[2,-1,2]',
    testCases: [
      { input: 'nums = [1,2,3,4,3]', expectedOutput: '[2,3,4,-1,4]' },
      { input: 'nums = [2,2,2]', expectedOutput: '[-1,-1,-1]' },
      { input: 'nums = [5,4,3,2,1]', expectedOutput: '[-1,5,5,5,5]', isHidden: true },
    ],
  },
  {
    title: 'Validate Stack Sequences',
    slug: 'validate-stack-sequences',
    description: 'Check whether a pushed and popped sequence is valid for a stack.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 'pushed = [1,2,3,4,5], popped = [4,5,3,2,1]', output: 'true' }],
    constraints: ['1 <= pushed.length <= 1000', 'pushed and popped are permutations.'],
    sampleInput: 'pushed = [1,2,3,4,5], popped = [4,5,3,2,1]',
    sampleOutput: 'true',
    testCases: [
      { input: 'pushed = [1,2,3,4,5], popped = [4,5,3,2,1]', expectedOutput: 'true' },
      { input: 'pushed = [1,2,3,4,5], popped = [4,3,5,1,2]', expectedOutput: 'false' },
      { input: 'pushed = [2,1,0], popped = [1,2,0]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Remove K Digits',
    slug: 'remove-k-digits',
    description:
      'Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [{ input: 'num = "1432219", k = 3', output: '"1219"' }],
    constraints: [
      '1 <= k <= num.length <= 10^5',
      'num does not contain leading zeros unless it is zero.',
    ],
    sampleInput: 'num = "1432219", k = 3',
    sampleOutput: '"1219"',
    testCases: [
      { input: 'num = "1432219", k = 3', expectedOutput: '"1219"' },
      { input: 'num = "10200", k = 1', expectedOutput: '"200"' },
      { input: 'num = "10", k = 2', expectedOutput: '"0"', isHidden: true },
    ],
  },
  {
    title: 'Design a Stack With Increment Operation',
    slug: 'design-a-stack-with-increment-operation',
    description:
      'Design a stack which supports push, pop, and incrementing the bottom k elements by a given value.',
    difficulty: 'MEDIUM',
    topic: 'Stacks',
    examples: [
      {
        input: 'CustomStack(3), push(1), push(2), increment(2,100), pop(), pop()',
        output: '[null,null,null,null,102,1]',
      },
    ],
    constraints: [
      '1 <= maxSize <= 1000',
      '0 <= incrementVal <= 1000',
      'At most 1000 calls will be made.',
    ],
    sampleInput: 'CustomStack(3), push(1), push(2), increment(2,100), pop(), pop()',
    sampleOutput: '[null,null,null,null,102,1]',
    testCases: [
      {
        input: 'CustomStack(3), push(1), push(2), increment(2,100), pop(), pop()',
        expectedOutput: '[null,null,null,null,102,1]',
      },
      {
        input: 'CustomStack(2), push(5), increment(1,10), pop()',
        expectedOutput: '[null,null,null,15]',
      },
      {
        input: 'CustomStack(1), push(7), increment(3,5), pop()',
        expectedOutput: '[null,null,12]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Largest Rectangle in Histogram',
    slug: 'largest-rectangle-in-histogram',
    description:
      'Given histogram bar heights, find the area of the largest rectangle that can be formed in the histogram.',
    difficulty: 'HARD',
    topic: 'Stacks',
    examples: [{ input: 'heights = [2,1,5,6,2,3]', output: '10' }],
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    sampleInput: 'heights = [2,1,5,6,2,3]',
    sampleOutput: '10',
    testCases: [
      { input: 'heights = [2,4]', expectedOutput: '4' },
      { input: 'heights = [1,1]', expectedOutput: '2' },
      { input: 'heights = [2,3,2]', expectedOutput: '6', isHidden: true },
    ],
  },
  {
    title: 'Maximal Rectangle',
    slug: 'maximal-rectangle',
    description:
      'Given a binary matrix, find the largest rectangle containing only 1s and return its area.',
    difficulty: 'HARD',
    topic: 'Stacks',
    examples: [
      {
        input:
          'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]',
        output: '6',
      },
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200'],
    sampleInput:
      'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]',
    sampleOutput: '6',
    testCases: [
      {
        input:
          'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]',
        expectedOutput: '6',
      },
      {
        input: 'matrix = [["0","1"],["1","0"]]',
        expectedOutput: '1',
      },
      {
        input: 'matrix = [["0"]]',
        expectedOutput: '0',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Basic Calculator',
    slug: 'basic-calculator',
    description:
      'Evaluate a simple arithmetic expression string containing +, -, parentheses, and spaces.',
    difficulty: 'HARD',
    topic: 'Stacks',
    examples: [{ input: 's = "1 + 1"', output: '2' }],
    constraints: ['1 <= s.length <= 3 * 10^5', 's contains digits, +, -, parentheses, and spaces.'],
    sampleInput: 's = "1 + 1"',
    sampleOutput: '2',
    testCases: [
      { input: 's = " 2-1 + 2 "', expectedOutput: '3' },
      { input: 's = "(1+(4+5+2)-3)+(6+8)"', expectedOutput: '23' },
      { input: 's = "(1+2)-(3-4)"', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Longest Valid Parentheses',
    slug: 'longest-valid-parentheses',
    description:
      'Given a string containing just the characters ( and ), return the length of the longest valid parentheses substring.',
    difficulty: 'HARD',
    topic: 'Stacks',
    examples: [{ input: 's = ")()())"', output: '4' }],
    constraints: ['0 <= s.length <= 3 * 10^4'],
    sampleInput: 's = ")()())"',
    sampleOutput: '4',
    testCases: [
      { input: 's = ")()())"', expectedOutput: '4' },
      { input: 's = "(()"', expectedOutput: '2' },
      { input: 's = ""', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Smallest Subsequence of Distinct Characters',
    slug: 'smallest-subsequence-of-distinct-characters',
    description:
      'Return the lexicographically smallest subsequence of the given string that contains every distinct character exactly once.',
    difficulty: 'HARD',
    topic: 'Stacks',
    examples: [{ input: 's = "cbacdcbc"', output: '"acdb"' }],
    constraints: ['1 <= s.length <= 10^4', 's consists of lowercase English letters.'],
    sampleInput: 's = "cbacdcbc"',
    sampleOutput: '"acdb"',
    testCases: [
      { input: 's = "bcabc"', expectedOutput: '"abc"' },
      { input: 's = "cbacdcbc"', expectedOutput: '"acdb"' },
      { input: 's = "cdadabcc"', expectedOutput: '"adbc"', isHidden: true },
    ],
  },
];
