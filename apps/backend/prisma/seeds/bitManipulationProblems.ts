import type { ProblemSeed } from '../seed.ts';

export const bitManipulationProblems: ProblemSeed[] = [
  {
    title: 'Single Number',
    slug: 'single-number',
    description:
      'Given a non-empty array of integers where every element appears twice except for one, find that single one using bit manipulation.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1',
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4'],
    sampleInput: 'nums = [2,2,1]',
    sampleOutput: '1',
    testCases: [
      { input: 'nums = [2,2,1]', expectedOutput: '1' },
      { input: 'nums = [4,1,2,1,2]', expectedOutput: '4' },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Number of 1 Bits',
    slug: 'number-of-1-bits',
    description:
      'Write a function that returns the number of 1 bits in the binary representation of a given unsigned integer.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 00000000000000000000000000001011',
        output: '3',
      },
    ],
    constraints: ['The input is a 32-bit binary string.'],
    sampleInput: 'n = 00000000000000000000000000001011',
    sampleOutput: '3',
    testCases: [
      { input: 'n = 00000000000000000000000000001011', expectedOutput: '3' },
      { input: 'n = 00000000000000000000000010000000', expectedOutput: '1' },
      { input: 'n = 11111111111111111111111111111101', expectedOutput: '31', isHidden: true },
    ],
  },
  {
    title: 'Power of Two',
    slug: 'power-of-two',
    description:
      'Given an integer n, return true if it is a power of two. Use bit operations to determine this efficiently.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 16',
        output: 'true',
      },
    ],
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    sampleInput: 'n = 16',
    sampleOutput: 'true',
    testCases: [
      { input: 'n = 16', expectedOutput: 'true' },
      { input: 'n = 218', expectedOutput: 'false' },
      { input: 'n = 1', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Counting Bits',
    slug: 'counting-bits',
    description:
      'Given a non-negative integer n, return an array of length n + 1 where the ith element is the number of 1 bits in the binary representation of i.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 2',
        output: '[0,1,1]',
      },
    ],
    constraints: ['0 <= n <= 10^5'],
    sampleInput: 'n = 2',
    sampleOutput: '[0,1,1]',
    testCases: [
      { input: 'n = 2', expectedOutput: '[0,1,1]' },
      { input: 'n = 5', expectedOutput: '[0,1,1,2,1,2]' },
      { input: 'n = 0', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Missing Number',
    slug: 'missing-number',
    description:
      'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [3,0,1]',
        output: '2',
      },
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 10^4',
      '0 <= nums[i] <= n',
      'All the numbers of nums are unique.',
    ],
    sampleInput: 'nums = [3,0,1]',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [3,0,1]', expectedOutput: '2' },
      { input: 'nums = [0,1]', expectedOutput: '2' },
      { input: 'nums = [1]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Bitwise AND Basics',
    slug: 'bitwise-and-basics',
    description:
      'Given two integers a and b, return the result of a bitwise AND operation between them.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'a = 5, b = 3',
        output: '1',
      },
    ],
    constraints: ['-2^31 <= a, b <= 2^31 - 1'],
    sampleInput: 'a = 5, b = 3',
    sampleOutput: '1',
    testCases: [
      { input: 'a = 5, b = 3', expectedOutput: '1' },
      { input: 'a = 7, b = 2', expectedOutput: '2' },
      { input: 'a = -1, b = 1', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Even or Odd Using Bits',
    slug: 'even-or-odd-using-bits',
    description: 'Determine whether a number is even or odd using only bitwise operations.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 4',
        output: 'even',
      },
    ],
    constraints: ['-10^9 <= n <= 10^9'],
    sampleInput: 'n = 4',
    sampleOutput: 'even',
    testCases: [
      { input: 'n = 4', expectedOutput: 'even' },
      { input: 'n = 7', expectedOutput: 'odd' },
      { input: 'n = 0', expectedOutput: 'even', isHidden: true },
    ],
  },
  {
    title: 'Toggle a Bit',
    slug: 'toggle-a-bit',
    description:
      'Given an integer n and a 0-indexed bit position k, toggle the kth bit of n and return the resulting value.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 5, k = 0',
        output: '4',
      },
    ],
    constraints: ['0 <= k <= 31', '-2^31 <= n <= 2^31 - 1'],
    sampleInput: 'n = 5, k = 0',
    sampleOutput: '4',
    testCases: [
      { input: 'n = 5, k = 0', expectedOutput: '4' },
      { input: 'n = 5, k = 1', expectedOutput: '7' },
      { input: 'n = 0, k = 3', expectedOutput: '8', isHidden: true },
    ],
  },
  {
    title: 'Check Kth Bit',
    slug: 'check-kth-bit',
    description:
      'Given a non-negative integer n and a position k, return true if the kth bit in n is set to 1.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 5, k = 0',
        output: 'true',
      },
    ],
    constraints: ['0 <= n <= 10^9', '0 <= k <= 31'],
    sampleInput: 'n = 5, k = 0',
    sampleOutput: 'true',
    testCases: [
      { input: 'n = 5, k = 0', expectedOutput: 'true' },
      { input: 'n = 5, k = 1', expectedOutput: 'false' },
      { input: 'n = 8, k = 3', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Reverse Bits (Easy)',
    slug: 'reverse-bits-easy',
    description:
      'Reverse the bits of a 32-bit unsigned integer and return the resulting unsigned integer.',
    difficulty: 'EASY',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 00000010100101000001111010011100',
        output: '00111001011110000010100101000000',
      },
    ],
    constraints: ['The input is a 32-bit binary string.'],
    sampleInput: 'n = 00000010100101000001111010011100',
    sampleOutput: '00111001011110000010100101000000',
    testCases: [
      {
        input: 'n = 00000010100101000001111010011100',
        expectedOutput: '00111001011110000010100101000000',
      },
      {
        input: 'n = 11111111111111111111111111111101',
        expectedOutput: '10111111111111111111111111111111',
      },
      {
        input: 'n = 00000000000000000000000000000000',
        expectedOutput: '00000000000000000000000000000000',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Single Number II',
    slug: 'single-number-ii',
    description:
      'Given an array of integers where every element appears three times except for one, find the single element that appears only once.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [2,2,3,2]',
        output: '3',
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    sampleInput: 'nums = [2,2,3,2]',
    sampleOutput: '3',
    testCases: [
      { input: 'nums = [2,2,3,2]', expectedOutput: '3' },
      { input: 'nums = [0,1,0,1,0,1,99]', expectedOutput: '99' },
      { input: 'nums = [-2,-2,1,-2]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Bitwise AND of Numbers Range',
    slug: 'bitwise-and-of-numbers-range',
    description:
      'Given two integers left and right, return the bitwise AND of all numbers in the inclusive range [left, right].',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'left = 5, right = 7',
        output: '4',
      },
    ],
    constraints: ['0 <= left <= right <= 2^31 - 1'],
    sampleInput: 'left = 5, right = 7',
    sampleOutput: '4',
    testCases: [
      { input: 'left = 5, right = 7', expectedOutput: '4' },
      { input: 'left = 0, right = 1', expectedOutput: '0' },
      { input: 'left = 1, right = 2147483647', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Maximum XOR of Two Numbers',
    slug: 'maximum-xor-of-two-numbers',
    description:
      'Given an array of integers, return the maximum XOR of any two elements within the array.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [3,10,5,25,2,8]',
        output: '28',
      },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '0 <= nums[i] <= 2^31 - 1'],
    sampleInput: 'nums = [3,10,5,25,2,8]',
    sampleOutput: '28',
    testCases: [
      { input: 'nums = [3,10,5,25,2,8]', expectedOutput: '28' },
      { input: 'nums = [0,1]', expectedOutput: '1' },
      { input: 'nums = [2,4]', expectedOutput: '6', isHidden: true },
    ],
  },
  {
    title: 'Subsets Using Bitmasking',
    slug: 'subsets-using-bitmasking',
    description:
      'Given a set of distinct integers, return all possible subsets using bitmasking techniques.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10',
      '-10^5 <= nums[i] <= 10^5',
      'All elements are distinct.',
    ],
    sampleInput: 'nums = [1,2,3]',
    sampleOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
    testCases: [
      { input: 'nums = [1,2,3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', expectedOutput: '[[],[0]]' },
      { input: 'nums = [1,2]', expectedOutput: '[[],[1],[2],[1,2]]', isHidden: true },
    ],
  },
  {
    title: 'Gray Code',
    slug: 'gray-code',
    description:
      'Given a non-negative integer n, return the n-bit Gray code sequence. The sequence must start with 0 and each consecutive pair must differ by one bit.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 2',
        output: '[0,1,3,2]',
      },
    ],
    constraints: ['0 <= n <= 16'],
    sampleInput: 'n = 2',
    sampleOutput: '[0,1,3,2]',
    testCases: [
      { input: 'n = 2', expectedOutput: '[0,1,3,2]' },
      { input: 'n = 1', expectedOutput: '[0,1]' },
      { input: 'n = 0', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Divide Two Integers',
    slug: 'divide-two-integers',
    description:
      'Divide two integers without using multiplication, division, or mod operators, and return the quotient truncated toward zero.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'dividend = 10, divisor = 3',
        output: '3',
      },
    ],
    constraints: ['-2^31 <= dividend, divisor <= 2^31 - 1', 'divisor != 0'],
    sampleInput: 'dividend = 10, divisor = 3',
    sampleOutput: '3',
    testCases: [
      { input: 'dividend = 10, divisor = 3', expectedOutput: '3' },
      { input: 'dividend = 7, divisor = -3', expectedOutput: '-2' },
      {
        input: 'dividend = -2147483648, divisor = -1',
        expectedOutput: '2147483647',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Sum of Two Integers',
    slug: 'sum-of-two-integers',
    description: 'Calculate the sum of two integers a and b without using the + or - operators.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'a = 1, b = 2',
        output: '3',
      },
    ],
    constraints: ['-2^31 <= a, b <= 2^31 - 1'],
    sampleInput: 'a = 1, b = 2',
    sampleOutput: '3',
    testCases: [
      { input: 'a = 1, b = 2', expectedOutput: '3' },
      { input: 'a = -2, b = 3', expectedOutput: '1' },
      { input: 'a = -1, b = -1', expectedOutput: '-2', isHidden: true },
    ],
  },
  {
    title: 'UTF-8 Validation',
    slug: 'utf-8-validation',
    description:
      'Given an array of integers representing bytes, determine if it is a valid UTF-8 encoding.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'data = [197,130,1]',
        output: 'true',
      },
    ],
    constraints: ['1 <= data.length <= 10^3', '0 <= data[i] <= 255'],
    sampleInput: 'data = [197,130,1]',
    sampleOutput: 'true',
    testCases: [
      { input: 'data = [197,130,1]', expectedOutput: 'true' },
      { input: 'data = [235,140,4]', expectedOutput: 'false' },
      { input: 'data = [240,162,138,147]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Find Duplicate Number Using Bits',
    slug: 'find-duplicate-number-using-bits',
    description:
      'Given an array nums containing n + 1 integers where each integer is between 1 and n inclusive, find the duplicate number using bit manipulation.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [1,3,4,2,2]',
        output: '2',
      },
    ],
    constraints: ['2 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n'],
    sampleInput: 'nums = [1,3,4,2,2]',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,3,4,2,2]', expectedOutput: '2' },
      { input: 'nums = [3,1,3,4,2]', expectedOutput: '3' },
      { input: 'nums = [1,1]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Bitmask Dynamic State Problem',
    slug: 'bitmask-dynamic-state-problem',
    description:
      'Given n items with values and a bitmask constraint, compute the maximum value subset that satisfies a dynamic bitmask state transition rule.',
    difficulty: 'MEDIUM',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 3, items = [[1,1],[2,2],[3,4]]',
        output: '7',
      },
    ],
    constraints: ['1 <= n <= 15', 'items.length == n', '0 <= items[i][0], items[i][1] <= 1000'],
    sampleInput: 'n = 3, items = [[1,1],[2,2],[3,4]]',
    sampleOutput: '7',
    testCases: [
      { input: 'n = 3, items = [[1,1],[2,2],[3,4]]', expectedOutput: '7' },
      { input: 'n = 2, items = [[1,2],[2,3]]', expectedOutput: '5' },
      { input: 'n = 3, items = [[0,0],[0,0],[0,0]]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Maximum XOR With Constraints',
    slug: 'maximum-xor-with-constraints',
    description:
      'Given an array nums and an integer limit, return the maximum XOR of any two numbers in nums where the result does not exceed the given limit.',
    difficulty: 'HARD',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums = [3,10,5,25,2,8], limit = 28',
        output: '28',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i], limit <= 2^31 - 1'],
    sampleInput: 'nums = [3,10,5,25,2,8], limit = 28',
    sampleOutput: '28',
    testCases: [
      { input: 'nums = [3,10,5,25,2,8], limit = 28', expectedOutput: '28' },
      { input: 'nums = [0,1], limit = 1', expectedOutput: '1' },
      { input: 'nums = [8,1,2], limit = 5', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Advanced Bitmask Dynamic Programming',
    slug: 'advanced-bitmask-dynamic-programming',
    description:
      'Given n tasks and a compatibility mask for each worker, compute the number of valid assignments using advanced bitmask dynamic programming.',
    difficulty: 'HARD',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 3, mask = [3,5,6]',
        output: '3',
      },
    ],
    constraints: ['1 <= n <= 16', 'mask.length == n', '0 <= mask[i] < 2^n'],
    sampleInput: 'n = 3, mask = [3,5,6]',
    sampleOutput: '3',
    testCases: [
      { input: 'n = 3, mask = [3,5,6]', expectedOutput: '3' },
      { input: 'n = 2, mask = [1,2]', expectedOutput: '0' },
      { input: 'n = 3, mask = [7,7,7]', expectedOutput: '6', isHidden: true },
    ],
  },
  {
    title: 'Minimum One Bit Operations',
    slug: 'minimum-one-bit-operations',
    description:
      'Given a target integer, return the minimum number of bit flips needed to transform 0 into target using allowed bit operations.',
    difficulty: 'HARD',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'target = 3',
        output: '2',
      },
    ],
    constraints: ['0 <= target <= 10^4'],
    sampleInput: 'target = 3',
    sampleOutput: '2',
    testCases: [
      { input: 'target = 3', expectedOutput: '2' },
      { input: 'target = 6', expectedOutput: '4' },
      { input: 'target = 0', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Hard XOR Optimization Problem',
    slug: 'hard-xor-optimization-problem',
    description:
      'Given two arrays of numbers and an integer k, choose one number from each array to maximize their XOR subject to an optimization constraint.',
    difficulty: 'HARD',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'nums1 = [1,2,3], nums2 = [4,5,6], k = 7',
        output: '7',
      },
    ],
    constraints: [
      '1 <= nums1.length, nums2.length <= 10^4',
      '0 <= nums1[i], nums2[i], k <= 2^31 - 1',
    ],
    sampleInput: 'nums1 = [1,2,3], nums2 = [4,5,6], k = 7',
    sampleOutput: '7',
    testCases: [
      { input: 'nums1 = [1,2,3], nums2 = [4,5,6], k = 7', expectedOutput: '7' },
      { input: 'nums1 = [0,0], nums2 = [0,0], k = 1', expectedOutput: '0' },
      { input: 'nums1 = [5,1], nums2 = [2,4], k = 7', expectedOutput: '7', isHidden: true },
    ],
  },
  {
    title: 'Advanced State Compression Problem',
    slug: 'advanced-state-compression-problem',
    description:
      'Given n bits and constraints on which bits can be simultaneously set, compute the maximum number of valid bit states using state compression.',
    difficulty: 'HARD',
    topic: 'Bit Manipulation',
    examples: [
      {
        input: 'n = 3, forbidden = [[0,1]]',
        output: '5',
      },
    ],
    constraints: ['1 <= n <= 15', 'forbidden.length <= 20', 'forbidden[i].length == 2'],
    sampleInput: 'n = 3, forbidden = [[0,1]]',
    sampleOutput: '5',
    testCases: [
      { input: 'n = 3, forbidden = [[0,1]]', expectedOutput: '5' },
      { input: 'n = 2, forbidden = [[0,1]]', expectedOutput: '2' },
      { input: 'n = 3, forbidden = []', expectedOutput: '8', isHidden: true },
    ],
  },
];
