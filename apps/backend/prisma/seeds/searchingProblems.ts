import type { ProblemSeed } from '../seed.ts';

export const searchingProblems: ProblemSeed[] = [
  {
    title: 'Binary Search',
    slug: 'binary-search',
    description:
      'Given a sorted array of distinct integers and a target value, return the index of the target if it exists. Otherwise, return -1.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i], target <= 10^4',
      'All values in nums are distinct.',
      'nums is sorted in ascending order.',
    ],
    sampleInput: 'nums = [-1,0,3,5,9,12], target = 9',
    sampleOutput: '4',
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' },
      { input: 'nums = [1], target = 1', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Search Insert Position',
    slug: 'search-insert-position',
    description:
      'Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be inserted in order.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,3,5,6], target = 5',
        output: '2',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i], target <= 10^4',
      'nums is sorted in ascending order.',
    ],
    sampleInput: 'nums = [1,3,5,6], target = 5',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,3,5,6], target = 5', expectedOutput: '2' },
      { input: 'nums = [1,3,5,6], target = 2', expectedOutput: '1' },
      { input: 'nums = [1,3,5,6], target = 7', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'First Bad Version',
    slug: 'first-bad-version',
    description:
      'Given n versions and an API isBadVersion(version), find the first bad version that causes all later versions to be bad.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'n = 5, bad = 4',
        output: '4',
      },
    ],
    constraints: ['1 <= bad <= n <= 2^31 - 1'],
    sampleInput: 'n = 5, bad = 4',
    sampleOutput: '4',
    testCases: [
      { input: 'n = 5, bad = 4', expectedOutput: '4' },
      { input: 'n = 1, bad = 1', expectedOutput: '1' },
      { input: 'n = 10, bad = 7', expectedOutput: '7', isHidden: true },
    ],
  },
  {
    title: 'Guess Number Higher or Lower',
    slug: 'guess-number-higher-or-lower',
    description:
      'Guess the number chosen by the system using a higher/lower API and return the chosen number.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'n = 10, pick = 6',
        output: '6',
      },
    ],
    constraints: ['1 <= pick <= n <= 2^31 - 1'],
    sampleInput: 'n = 10, pick = 6',
    sampleOutput: '6',
    testCases: [
      { input: 'n = 10, pick = 6', expectedOutput: '6' },
      { input: 'n = 1, pick = 1', expectedOutput: '1' },
      { input: 'n = 2, pick = 2', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Square Root (Binary Search)',
    slug: 'square-root-binary-search',
    description:
      'Implement int sqrt(int x) to return the floor of the square root of x using binary search without using built-in exponent functions.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'x = 8',
        output: '2',
      },
    ],
    constraints: ['0 <= x <= 2^31 - 1'],
    sampleInput: 'x = 8',
    sampleOutput: '2',
    testCases: [
      { input: 'x = 8', expectedOutput: '2' },
      { input: 'x = 4', expectedOutput: '2' },
      { input: 'x = 1', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Find Peak Element (Easy Variant)',
    slug: 'find-peak-element-easy',
    description:
      'A peak element is greater than its neighbors. Given an array where adjacent elements are not equal, return an index of any peak element.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', 'nums[i] != nums[i+1]'],
    sampleInput: 'nums = [1,2,3,1]',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: '2' },
      { input: 'nums = [1,2,1,3,5,6,4]', expectedOutput: '1' },
      { input: 'nums = [1]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array (Easy)',
    slug: 'search-in-rotated-sorted-array-easy',
    description:
      'Given a rotated sorted array and a target value, return the index of the target if it exists, otherwise return -1.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
      },
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i], target <= 10^4',
      'All values of nums are unique.',
    ],
    sampleInput: 'nums = [4,5,6,7,0,1,2], target = 0',
    sampleOutput: '4',
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1' },
      { input: 'nums = [1], target = 0', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Count Occurrences',
    slug: 'count-occurrences',
    description:
      'Given a sorted array and a target value, count how many times the target appears in the array.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,2,2,2,3], target = 2',
        output: '3',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i], target <= 10^4',
      'nums is sorted in ascending order.',
    ],
    sampleInput: 'nums = [1,2,2,2,3], target = 2',
    sampleOutput: '3',
    testCases: [
      { input: 'nums = [1,2,2,2,3], target = 2', expectedOutput: '3' },
      { input: 'nums = [1,1,1,1], target = 1', expectedOutput: '4' },
      { input: 'nums = [1,2,3,4], target = 5', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Floor and Ceil in Sorted Array',
    slug: 'floor-and-ceil-in-sorted-array',
    description:
      'Given a sorted array and a target, return the floor and ceil values for the target. If floor or ceil does not exist, return -1 for that value.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,2,4,6,8], target = 5',
        output: '[4,6]',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^5 <= nums[i], target <= 10^5',
      'nums is sorted in ascending order.',
    ],
    sampleInput: 'nums = [1,2,4,6,8], target = 5',
    sampleOutput: '[4,6]',
    testCases: [
      { input: 'nums = [1,2,4,6,8], target = 5', expectedOutput: '[4,6]' },
      { input: 'nums = [1,2,4,6,8], target = 0', expectedOutput: '[-1,1]' },
      { input: 'nums = [1,2,4,6,8], target = 9', expectedOutput: '[8,-1]', isHidden: true },
    ],
  },
  {
    title: 'Lower Bound Basics',
    slug: 'lower-bound-basics',
    description:
      'Given a sorted array and a target value, return the first index where the target can be inserted without changing the order of the array.',
    difficulty: 'EASY',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,3,5,6], target = 5',
        output: '2',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i], target <= 10^4',
      'nums is sorted in ascending order.',
    ],
    sampleInput: 'nums = [1,3,5,6], target = 5',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,3,5,6], target = 5', expectedOutput: '2' },
      { input: 'nums = [1,3,5,6], target = 2', expectedOutput: '1' },
      { input: 'nums = [1,3,5,6], target = 7', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    description:
      'Given a rotated sorted array and a target, search for the target and return its index or -1 if it does not exist.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
      },
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i], target <= 10^4',
      'All values in nums are unique.',
    ],
    sampleInput: 'nums = [4,5,6,7,0,1,2], target = 0',
    sampleOutput: '4',
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1' },
      { input: 'nums = [1], target = 0', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    description:
      'Suppose an array sorted in ascending order is rotated at some pivot. Find the minimum element in the rotated array.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [3,4,5,1,2]',
        output: '1',
      },
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values in nums are unique.',
    ],
    sampleInput: 'nums = [3,4,5,1,2]',
    sampleOutput: '1',
    testCases: [
      { input: 'nums = [3,4,5,1,2]', expectedOutput: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', expectedOutput: '0' },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Koko Eating Bananas',
    slug: 'koko-eating-bananas',
    description:
      'Koko has piles of bananas and wants to finish eating them within h hours. Return the minimum eating speed (bananas per hour) that allows her to finish all piles.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'piles = [3,6,7,11], h = 8',
        output: '4',
      },
    ],
    constraints: [
      '1 <= piles.length <= 10^4',
      '1 <= piles[i] <= 10^9',
      'piles.length <= h <= 10^9',
    ],
    sampleInput: 'piles = [3,6,7,11], h = 8',
    sampleOutput: '4',
    testCases: [
      { input: 'piles = [3,6,7,11], h = 8', expectedOutput: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', expectedOutput: '30' },
      { input: 'piles = [30,11,23,4,20], h = 6', expectedOutput: '23', isHidden: true },
    ],
  },
  {
    title: 'Capacity To Ship Packages Within D Days',
    slug: 'capacity-to-ship-packages-within-d-days',
    description:
      'Given weights of packages and a deadline in days, find the least weight capacity of a ship that will ship all packages within D days.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5',
        output: '15',
      },
    ],
    constraints: ['1 <= days <= weights.length <= 50000', '1 <= weights[i] <= 500'],
    sampleInput: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5',
    sampleOutput: '15',
    testCases: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', expectedOutput: '15' },
      { input: 'weights = [3,2,2,4,1,4], days = 3', expectedOutput: '6' },
      { input: 'weights = [1,2,3,1,1], days = 4', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Search a 2D Matrix',
    slug: 'search-a-2d-matrix',
    description:
      'Write an efficient algorithm that searches for a value in an m x n matrix. The matrix has sorted rows and columns with row-to-row continuity.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
        output: 'true',
      },
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 100',
      '-10^4 <= matrix[i][j], target <= 10^4',
    ],
    sampleInput: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
    sampleOutput: 'true',
    testCases: [
      {
        input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
        expectedOutput: 'true',
      },
      {
        input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
        expectedOutput: 'false',
      },
      { input: 'matrix = [[1]], target = 1', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Find Peak Element',
    slug: 'find-peak-element',
    description:
      'A peak element is an element strictly greater than its neighbors. Given an integer array, return the index of any peak element.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [1,2,1,3,5,6,4]',
        output: '1',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', 'nums[i] != nums[i+1]'],
    sampleInput: 'nums = [1,2,1,3,5,6,4]',
    sampleOutput: '1',
    testCases: [
      { input: 'nums = [1,2,1,3,5,6,4]', expectedOutput: '1' },
      { input: 'nums = [1,2,3,1]', expectedOutput: '2' },
      { input: 'nums = [1,2]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Median of Two Sorted Arrays (Medium Variant)',
    slug: 'median-of-two-sorted-arrays-medium',
    description:
      'Given two sorted arrays, return the median of the combined sorted array using an efficient algorithm.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.0',
      },
    ],
    constraints: ['0 <= nums1.length, nums2.length <= 1000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    sampleInput: 'nums1 = [1,3], nums2 = [2]',
    sampleOutput: '2.0',
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2.5' },
      { input: 'nums1 = [0,0], nums2 = [0,0]', expectedOutput: '0.0', isHidden: true },
    ],
  },
  {
    title: 'Aggressive Cows',
    slug: 'aggressive-cows',
    description:
      'Given stall positions and a number of cows, place cows in stalls such that the minimum distance between any two cows is maximized.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'stalls = [1,2,4,8,9], cows = 3',
        output: '3',
      },
    ],
    constraints: [
      '2 <= stalls.length <= 10^5',
      '0 <= stalls[i] <= 10^9',
      '2 <= cows <= stalls.length',
    ],
    sampleInput: 'stalls = [1,2,4,8,9], cows = 3',
    sampleOutput: '3',
    testCases: [
      { input: 'stalls = [1,2,4,8,9], cows = 3', expectedOutput: '3' },
      { input: 'stalls = [1,2,4,8,9], cows = 4', expectedOutput: '2' },
      { input: 'stalls = [1,2,4,8,9], cows = 2', expectedOutput: '8', isHidden: true },
    ],
  },
  {
    title: 'Allocate Minimum Pages',
    slug: 'allocate-minimum-pages',
    description:
      'Given book page counts and a number of students, allocate contiguous books to students such that the maximum pages assigned to any student is minimized.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'pages = [12,34,67,90], students = 2',
        output: '113',
      },
    ],
    constraints: [
      '1 <= pages.length <= 10^5',
      '1 <= pages[i] <= 10^6',
      '1 <= students <= pages.length',
    ],
    sampleInput: 'pages = [12,34,67,90], students = 2',
    sampleOutput: '113',
    testCases: [
      { input: 'pages = [12,34,67,90], students = 2', expectedOutput: '113' },
      { input: 'pages = [5,17,100,11], students = 4', expectedOutput: '100' },
      { input: 'pages = [5,17,100,11], students = 3', expectedOutput: '117', isHidden: true },
    ],
  },
  {
    title: 'Binary Search on Answer',
    slug: 'binary-search-on-answer',
    description:
      'Given a monotonic function over an integer domain, find the smallest integer answer that satisfies a given predicate using binary search on the answer space.',
    difficulty: 'MEDIUM',
    topic: 'Searching',
    examples: [
      {
        input: 'domain = [1,2,3,4,5], predicate = [false,false,true,true,true]',
        output: '3',
      },
    ],
    constraints: ['1 <= domain.length <= 10^5', 'predicate values are monotonic (false then true)'],
    sampleInput: 'domain = [1,2,3,4,5], predicate = [false,false,true,true,true]',
    sampleOutput: '3',
    testCases: [
      {
        input: 'domain = [1,2,3,4,5], predicate = [false,false,true,true,true]',
        expectedOutput: '3',
      },
      {
        input: 'domain = [5,6,7,8,9], predicate = [false,false,false,true,true]',
        expectedOutput: '8',
      },
      {
        input: 'domain = [1,2,3], predicate = [true,true,true]',
        expectedOutput: '1',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    description:
      'Given two sorted arrays, return the median of the two sorted arrays in logarithmic time.',
    difficulty: 'HARD',
    topic: 'Searching',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.0',
      },
    ],
    constraints: ['0 <= nums1.length, nums2.length <= 1000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    sampleInput: 'nums1 = [1,3], nums2 = [2]',
    sampleOutput: '2.0',
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2.5' },
      { input: 'nums1 = [0,0], nums2 = [0,0]', expectedOutput: '0.0', isHidden: true },
    ],
  },
  {
    title: 'Split Array Largest Sum',
    slug: 'split-array-largest-sum',
    description:
      'Given an array and an integer m, split the array into m non-empty continuous subarrays to minimize the largest sum among these subarrays.',
    difficulty: 'HARD',
    topic: 'Searching',
    examples: [
      {
        input: 'nums = [7,2,5,10,8], m = 2',
        output: '18',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', '1 <= m <= nums.length', '0 <= nums[i] <= 10^6'],
    sampleInput: 'nums = [7,2,5,10,8], m = 2',
    sampleOutput: '18',
    testCases: [
      { input: 'nums = [7,2,5,10,8], m = 2', expectedOutput: '18' },
      { input: 'nums = [1,2,3,4,5], m = 2', expectedOutput: '9' },
      { input: 'nums = [1,4,4], m = 3', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Minimize Max Distance to Gas Station',
    slug: 'minimize-max-distance-to-gas-station',
    description:
      'Given gas station positions and a number of additional stations to build, minimize the maximum distance between adjacent gas stations.',
    difficulty: 'HARD',
    topic: 'Searching',
    examples: [
      {
        input: 'stations = [1,2,3,4,5,6,7,8,9], k = 2',
        output: '0.5',
      },
    ],
    constraints: ['2 <= stations.length <= 10^4', '0 <= stations[i] <= 10^8', '1 <= k <= 10^6'],
    sampleInput: 'stations = [1,2,3,4,5,6,7,8,9], k = 2',
    sampleOutput: '0.5',
    testCases: [
      { input: 'stations = [1,2,3,4,5,6,7,8,9], k = 2', expectedOutput: '0.5' },
      { input: 'stations = [1,2,3,4,5,6,7,8,9], k = 1', expectedOutput: '0.5' },
      { input: 'stations = [1,2,3,4,5], k = 5', expectedOutput: '0.5', isHidden: true },
    ],
  },
  {
    title: 'Advanced Binary Search on Answer',
    slug: 'advanced-binary-search-on-answer',
    description:
      'Use binary search on the answer space to solve a problem where the solution is the smallest value satisfying a monotonic condition.',
    difficulty: 'HARD',
    topic: 'Searching',
    examples: [
      {
        input: 'domain = [1,2,3,4,5], condition = [false,false,true,true,true]',
        output: '3',
      },
    ],
    constraints: ['1 <= domain.length <= 10^5', 'condition values are monotonic (false then true)'],
    sampleInput: 'domain = [1,2,3,4,5], condition = [false,false,true,true,true]',
    sampleOutput: '3',
    testCases: [
      {
        input: 'domain = [1,2,3,4,5], condition = [false,false,true,true,true]',
        expectedOutput: '3',
      },
      { input: 'domain = [1,2,3], condition = [false,true,true]', expectedOutput: '2' },
      {
        input: 'domain = [1,2,3], condition = [true,true,true]',
        expectedOutput: '1',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Hard Search Optimization Problem',
    slug: 'hard-search-optimization-problem',
    description:
      'Given a sorted search space and a hard feasibility function, use search and optimization techniques to find the optimal integer answer.',
    difficulty: 'HARD',
    topic: 'Searching',
    examples: [
      {
        input: 'space = [1,2,3,4,5], feasible = [false,false,true,true,true]',
        output: '3',
      },
    ],
    constraints: ['1 <= space.length <= 10^5', 'feasible values are monotonic (false then true)'],
    sampleInput: 'space = [1,2,3,4,5], feasible = [false,false,true,true,true]',
    sampleOutput: '3',
    testCases: [
      {
        input: 'space = [1,2,3,4,5], feasible = [false,false,true,true,true]',
        expectedOutput: '3',
      },
      { input: 'space = [2,4,6,8], feasible = [false,true,true,true]', expectedOutput: '4' },
      {
        input: 'space = [1,2,3], feasible = [false,false,true]',
        expectedOutput: '3',
        isHidden: true,
      },
    ],
  },
];
