import type { ProblemSeed } from '../seed.ts';

export const sortingProblems: ProblemSeed[] = [
  {
    title: 'Sort an Array',
    slug: 'sort-an-array',
    description:
      'Given an array of integers nums, return the array sorted in non-decreasing order.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [5,2,3,1]',
        output: '[1,2,3,5]',
        explanation: 'The array is sorted from smallest to largest.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [5,2,3,1]',
    sampleOutput: '[1,2,3,5]',
    testCases: [
      { input: 'nums = [5,2,3,1]', expectedOutput: '[1,2,3,5]' },
      { input: 'nums = [0,0,1,0]', expectedOutput: '[0,0,0,1]' },
      { input: 'nums = []', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Merge Sorted Arrays',
    slug: 'merge-sorted-arrays',
    description:
      'Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 in sorted order and return the merged array.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
      },
    ],
    constraints: ['nums1.length == m + n', 'nums2.length == n', '0 <= m, n <= 10^4'],
    sampleInput: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
    sampleOutput: '[1,2,2,3,5,6]',
    testCases: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        expectedOutput: '[1,2,2,3,5,6]',
      },
      { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', expectedOutput: '[1]' },
      { input: 'nums1 = [0], m = 0, nums2 = [1], n = 1', expectedOutput: '[1]', isHidden: true },
    ],
  },
  {
    title: 'Relative Sort Array',
    slug: 'relative-sort-array',
    description:
      'Given two arrays arr1 and arr2, sort the elements of arr1 such that the relative order of items in arr2 is preserved, and elements not in arr2 appear at the end in ascending order.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]',
        output: '[2,2,2,1,4,3,3,9,6,7,19]',
      },
    ],
    constraints: ['1 <= arr1.length, arr2.length <= 1000', 'arr2 contains unique values'],
    sampleInput: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]',
    sampleOutput: '[2,2,2,1,4,3,3,9,6,7,19]',
    testCases: [
      {
        input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]',
        expectedOutput: '[2,2,2,1,4,3,3,9,6,7,19]',
      },
      {
        input: 'arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]',
        expectedOutput: '[22,28,8,6,17,44]',
      },
      { input: 'arr1 = [5,5,5], arr2 = [5]', expectedOutput: '[5,5,5]', isHidden: true },
    ],
  },
  {
    title: 'Sort Colors (Easy Variant)',
    slug: 'sort-colors-easy-variant',
    description:
      'Given an array nums with values 0, 1, and 2, sort the array so that all 0s come first, followed by 1s, then 2s.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [2,0,2,1,1,0]',
        output: '[0,0,1,1,2,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 300', 'nums[i] is 0, 1, or 2'],
    sampleInput: 'nums = [2,0,2,1,1,0]',
    sampleOutput: '[0,0,1,1,2,2]',
    testCases: [
      { input: 'nums = [2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]' },
      { input: 'nums = [0,1,2,0,1,2]', expectedOutput: '[0,0,1,1,2,2]' },
      { input: 'nums = [0]', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Height Checker',
    slug: 'height-checker',
    description:
      'Given an array heights, count the number of indices where the height differs from what it would be after sorting the array in non-decreasing order.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'heights = [1,1,4,2,1,3]',
        output: '3',
      },
    ],
    constraints: ['1 <= heights.length <= 100', '1 <= heights[i] <= 100'],
    sampleInput: 'heights = [1,1,4,2,1,3]',
    sampleOutput: '3',
    testCases: [
      { input: 'heights = [1,1,4,2,1,3]', expectedOutput: '3' },
      { input: 'heights = [5,1,2,3,4]', expectedOutput: '5' },
      { input: 'heights = [1,2,3,4,5]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Largest Number At Least Twice of Others',
    slug: 'largest-number-at-least-twice-of-others',
    description:
      'Given an array nums, return the index of the largest element if it is at least twice as large as every other number; otherwise return -1.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [3,6,1,0]',
        output: '1',
      },
    ],
    constraints: ['1 <= nums.length <= 50', '0 <= nums[i] <= 100'],
    sampleInput: 'nums = [3,6,1,0]',
    sampleOutput: '1',
    testCases: [
      { input: 'nums = [3,6,1,0]', expectedOutput: '1' },
      { input: 'nums = [1,2,3,4]', expectedOutput: '-1' },
      { input: 'nums = [0,0,0,1]', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Sort Characters By Frequency',
    slug: 'sort-characters-by-frequency',
    description:
      'Given a string s, return a string with the characters sorted by frequency in descending order.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 's = "tree"',
        output: '"eert"',
      },
    ],
    constraints: ['1 <= s.length <= 5 * 10^4', 's consists of lowercase English letters.'],
    sampleInput: 's = "tree"',
    sampleOutput: '"eert"',
    testCases: [
      { input: 's = "tree"', expectedOutput: '"eert"' },
      { input: 's = "cccaaa"', expectedOutput: '"aaaccc"' },
      { input: 's = "Aabb"', expectedOutput: '"bbAa"', isHidden: true },
    ],
  },
  {
    title: 'Bubble Sort Simulation',
    slug: 'bubble-sort-simulation',
    description:
      'Given an array nums, return the number of swaps required to sort the array in non-decreasing order using the bubble sort algorithm.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [3,2,1]',
        output: '3',
      },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    sampleInput: 'nums = [3,2,1]',
    sampleOutput: '3',
    testCases: [
      { input: 'nums = [3,2,1]', expectedOutput: '3' },
      { input: 'nums = [1,2,3]', expectedOutput: '0' },
      { input: 'nums = [2,1,3]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Selection Sort Basics',
    slug: 'selection-sort-basics',
    description:
      'Given an array nums, return the array after performing one full pass of selection sort, where the smallest element is placed at the beginning.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [64,25,12,22,11]',
        output: '[11,25,12,22,64]',
      },
    ],
    constraints: ['1 <= nums.length <= 100', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [64,25,12,22,11]',
    sampleOutput: '[11,25,12,22,64]',
    testCases: [
      { input: 'nums = [64,25,12,22,11]', expectedOutput: '[11,25,12,22,64]' },
      { input: 'nums = [1,2,3,4]', expectedOutput: '[1,2,3,4]' },
      { input: 'nums = [3,1,2]', expectedOutput: '[1,3,2]', isHidden: true },
    ],
  },
  {
    title: 'Insertion Sort Basics',
    slug: 'insertion-sort-basics',
    description:
      'Given an array nums, insert the last element into its correct position in the sorted prefix and return the resulting array.',
    difficulty: 'EASY',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [1,3,2,5,4]',
        output: '[1,2,3,5,4]',
      },
    ],
    constraints: ['2 <= nums.length <= 100', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [1,3,2,5,4]',
    sampleOutput: '[1,2,3,5,4]',
    testCases: [
      { input: 'nums = [1,3,2,5,4]', expectedOutput: '[1,2,3,5,4]' },
      { input: 'nums = [2,1]', expectedOutput: '[1,2]' },
      { input: 'nums = [1,2,3,4,0]', expectedOutput: '[0,1,2,3,4]', isHidden: true },
    ],
  },
  {
    title: 'Sort Colors',
    slug: 'sort-colors',
    description:
      'Given an array nums containing red, white, and blue colors represented by 0, 1, and 2, sort them in-place so that colors are grouped together.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [2,0,2,1,1,0]',
        output: '[0,0,1,1,2,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 300', 'nums[i] is 0, 1, or 2'],
    sampleInput: 'nums = [2,0,2,1,1,0]',
    sampleOutput: '[0,0,1,1,2,2]',
    testCases: [
      { input: 'nums = [2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', expectedOutput: '[0,1,2]' },
      { input: 'nums = [0,0,1,1]', expectedOutput: '[0,0,1,1]', isHidden: true },
    ],
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    description:
      'Given a collection of intervals, merge all overlapping intervals and return the result sorted by start time.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
      },
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
    sampleInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
    sampleOutput: '[[1,6],[8,10],[15,18]]',
    testCases: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        expectedOutput: '[[1,6],[8,10],[15,18]]',
      },
      { input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1,5]]' },
      { input: 'intervals = [[1,4],[0,4]]', expectedOutput: '[[0,4]]', isHidden: true },
    ],
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements-sorting',
    description:
      'Given a non-empty array of integers, return the k most frequent elements sorted by frequency from highest to lowest.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [1,1,1,2,2,3], k = 2',
        output: '[1,2]',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      '1 <= k <= number of unique elements',
    ],
    sampleInput: 'nums = [1,1,1,2,2,3], k = 2',
    sampleOutput: '[1,2]',
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expectedOutput: '[1,2]' },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]' },
      { input: 'nums = [1,2], k = 2', expectedOutput: '[1,2]', isHidden: true },
    ],
  },
  {
    title: 'K Closest Points to Origin',
    slug: 'k-closest-points-to-origin',
    description:
      'Given an array of points where points[i] = [xi, yi], return the k closest points to the origin sorted by distance.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'points = [[1,3],[-2,2]], k = 1',
        output: '[[-2,2]]',
      },
    ],
    constraints: ['1 <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
    sampleInput: 'points = [[1,3],[-2,2]], k = 1',
    sampleOutput: '[[-2,2]]',
    testCases: [
      { input: 'points = [[1,3],[-2,2]], k = 1', expectedOutput: '[[-2,2]]' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', expectedOutput: '[[3,3],[-2,4]]' },
      { input: 'points = [[0,1],[1,0]], k = 2', expectedOutput: '[[0,1],[1,0]]', isHidden: true },
    ],
  },
  {
    title: 'Sort Characters by Frequency (Advanced)',
    slug: 'sort-characters-by-frequency-advanced',
    description:
      'Given a string s, return a string sorted by character frequency in descending order. If two characters have the same frequency, sort them by lexicographical order.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 's = "cccaaa"',
        output: '"aaaccc"',
      },
    ],
    constraints: ['1 <= s.length <= 5 * 10^4', 's consists of lowercase English letters.'],
    sampleInput: 's = "cccaaa"',
    sampleOutput: '"aaaccc"',
    testCases: [
      { input: 's = "cccaaa"', expectedOutput: '"aaaccc"' },
      { input: 's = "bbaacc"', expectedOutput: '"aabbcc"' },
      { input: 's = "tree"', expectedOutput: '"eert"', isHidden: true },
    ],
  },
  {
    title: 'Reorganize String',
    slug: 'reorganize-string',
    description:
      'Given a string s, rearrange the characters so that no two adjacent characters are the same, and return any valid result.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
      },
    ],
    constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters.'],
    sampleInput: 's = "aab"',
    sampleOutput: '"aba"',
    testCases: [
      { input: 's = "aab"', expectedOutput: '"aba"' },
      { input: 's = "aaab"', expectedOutput: '""' },
      { input: 's = "vvvlo"', expectedOutput: '"vlvov"', isHidden: true },
    ],
  },
  {
    title: 'Queue Reconstruction by Height',
    slug: 'queue-reconstruction-by-height',
    description:
      'Reconstruct a queue given a list of people described by height and the number of taller or equal-height people in front of them.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
        output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
      },
    ],
    constraints: ['1 <= people.length <= 2000', '0 <= hi <= 10^6'],
    sampleInput: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
    sampleOutput: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
    testCases: [
      {
        input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
        expectedOutput: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
      },
      {
        input: 'people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]',
        expectedOutput: '[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]',
      },
      {
        input: 'people = [[7,0],[4,4],[7,1]]',
        expectedOutput: '[[7,0],[7,1],[4,4]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Largest Number',
    slug: 'largest-number',
    description:
      'Given a list of non-negative integers, arrange them such that they form the largest possible number.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [3,30,34,5,9]',
        output: '"9534330"',
      },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 10^9'],
    sampleInput: 'nums = [3,30,34,5,9]',
    sampleOutput: '"9534330"',
    testCases: [
      { input: 'nums = [3,30,34,5,9]', expectedOutput: '"9534330"' },
      { input: 'nums = [10,2]', expectedOutput: '"210"' },
      { input: 'nums = [0,0]', expectedOutput: '"0"', isHidden: true },
    ],
  },
  {
    title: 'Sort Matrix Diagonally',
    slug: 'sort-matrix-diagonally',
    description:
      'Given a matrix, sort each diagonal in ascending order and return the resulting matrix.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]',
        output: '[[1,1,1,1],[1,2,2,2],[1,2,3,3]]',
      },
    ],
    constraints: ['m == mat.length', 'n == mat[i].length', '1 <= m, n <= 100'],
    sampleInput: 'mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]',
    sampleOutput: '[[1,1,1,1],[1,2,2,2],[1,2,3,3]]',
    testCases: [
      {
        input: 'mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]',
        expectedOutput: '[[1,1,1,1],[1,2,2,2],[1,2,3,3]]',
      },
      { input: 'mat = [[1,2],[3,4]]', expectedOutput: '[[1,2],[3,4]]' },
      {
        input: 'mat = [[11,25,66,1],[23,55,17,45],[75,31,36,44]]',
        expectedOutput: '[[1,11,25,66],[17,23,45,55],[31,36,44,75]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Sort Array by Frequency and Value',
    slug: 'sort-array-by-frequency-and-value',
    description:
      'Given an array nums, sort the numbers by increasing frequency. If two numbers have the same frequency, sort by value in ascending order.',
    difficulty: 'MEDIUM',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [1,1,2,2,2,3]',
        output: '[1,1,3,2,2,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [1,1,2,2,2,3]',
    sampleOutput: '[1,1,3,2,2,2]',
    testCases: [
      { input: 'nums = [1,1,2,2,2,3]', expectedOutput: '[1,1,3,2,2,2]' },
      { input: 'nums = [2,3,1,3,2]', expectedOutput: '[1,3,3,2,2]' },
      { input: 'nums = [5,5,4,4,4,6]', expectedOutput: '[6,5,5,4,4,4]', isHidden: true },
    ],
  },
  {
    title: 'Count of Smaller Numbers After Self',
    slug: 'count-of-smaller-numbers-after-self',
    description:
      'Given an integer array nums, return an array result where result[i] is the number of smaller elements to the right of nums[i].',
    difficulty: 'HARD',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [5,2,6,1]',
        output: '[2,1,1,0]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: 'nums = [5,2,6,1]',
    sampleOutput: '[2,1,1,0]',
    testCases: [
      { input: 'nums = [5,2,6,1]', expectedOutput: '[2,1,1,0]' },
      { input: 'nums = [-1,-1]', expectedOutput: '[0,0]' },
      { input: 'nums = [1,2,3,4]', expectedOutput: '[0,0,0,0]', isHidden: true },
    ],
  },
  {
    title: 'Reverse Pairs',
    slug: 'reverse-pairs',
    description:
      'Given an integer array nums, count the number of reverse pairs (i, j) such that i < j and nums[i] > 2 * nums[j].',
    difficulty: 'HARD',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [1,3,2,3,1]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    sampleInput: 'nums = [1,3,2,3,1]',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,3,2,3,1]', expectedOutput: '2' },
      { input: 'nums = [2,4,3,5,1]', expectedOutput: '3' },
      { input: 'nums = [5,4,3,2,1]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    description:
      'Given an array of k linked lists, each sorted in ascending order, merge them into one sorted linked list and return it in array form.',
    difficulty: 'HARD',
    topic: 'Sorting',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
      },
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'],
    sampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
    sampleOutput: '[1,1,2,3,4,4,5,6]',
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', expectedOutput: '[]' },
      { input: 'lists = [[]]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Minimum Number of Arrows to Burst Balloons',
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    description:
      'Given a list of balloons represented as intervals, return the minimum number of arrows required to burst all balloons if an arrow shot at x bursts all balloons whose intervals contain x.',
    difficulty: 'HARD',
    topic: 'Sorting',
    examples: [
      {
        input: 'points = [[10,16],[2,8],[1,6],[7,12]]',
        output: '2',
      },
    ],
    constraints: [
      '1 <= points.length <= 10^5',
      'points[i].length == 2',
      '-10^9 <= points[i][0] < points[i][1] <= 10^9',
    ],
    sampleInput: 'points = [[10,16],[2,8],[1,6],[7,12]]',
    sampleOutput: '2',
    testCases: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', expectedOutput: '2' },
      { input: 'points = [[1,2],[2,3],[3,4]]', expectedOutput: '3' },
      { input: 'points = [[1,10],[2,3],[4,5],[6,7]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Advanced Sorting Comparator Optimization',
    slug: 'advanced-sorting-comparator-optimization',
    description:
      'Given an array nums, sort the elements by a custom comparator that orders values by frequency and then by value, and return the sorted array with minimal reordering cost.',
    difficulty: 'HARD',
    topic: 'Sorting',
    examples: [
      {
        input: 'nums = [4,1,1,2,2,2,3]',
        output: '[3,4,1,1,2,2,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [4,1,1,2,2,2,3]',
    sampleOutput: '[3,4,1,1,2,2,2]',
    testCases: [
      { input: 'nums = [4,1,1,2,2,2,3]', expectedOutput: '[3,4,1,1,2,2,2]' },
      { input: 'nums = [1,2,2,3,3,3]', expectedOutput: '[1,2,2,3,3,3]' },
      { input: 'nums = [5,5,4,4,4,3,3]', expectedOutput: '[3,3,5,5,4,4,4]', isHidden: true },
    ],
  },
];
