import { PrismaClient } from '@prisma/client';
import { linkedListProblems } from './seeds/linkedListProblems.ts';
import { graphProblems } from './seeds/graphProblems.ts';
import { hashTablesProblems } from './seeds/hashTablesProblems.ts';
import { queuesProblems } from './seeds/queuesProblems.ts';
import { searchingProblems } from './seeds/searchingProblems.ts';
import { sortingProblems } from './seeds/sortingProblems.ts';
import { bitManipulationProblems } from './seeds/bitManipulationProblems.ts';
import { greedyProblems } from './seeds/greedyProblems.ts';
import { mathProblems } from './seeds/mathProblems.ts';
import { dpProblems } from './seeds/dpProblems.ts';
import { stacksProblems } from './seeds/stacksProblems.ts';
import { treeProblems } from './seeds/treeProblems.ts';

const prisma = new PrismaClient();

export type ProblemSeed = {
  title: string;
  slug?: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topic: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  testCases: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>;
  sampleInput?: string;
  sampleOutput?: string;
};

const boilerplate = {
  java: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  python: `def solve():
    # Your code here
    pass
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    // Your code here
    return 0;
}
`,
  javascript: `function solve() {
    // Your code here
}
`,
};

const problems: ProblemSeed[] = [
  // Arrays - Easy
  {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, return [0, 1].',
      },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]' },
    ],
  },
  {
    title: 'Move Zeroes',
    description:
      'Given an integer array nums, move all 0s to the end of the array while maintaining the relative order of the non-zero elements.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [0,1,0,3,12]',
        output: '[1,3,12,0,0]',
        explanation: 'All zeros are moved to the end while preserving the order of other elements.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: 'nums = [0,1,0,3,12]', expectedOutput: '[1,3,12,0,0]' },
      { input: 'nums = [0,0,1]', expectedOutput: '[1,0,0]' },
      { input: 'nums = [4,2,4,0,0,3,0,5,1,0]', expectedOutput: '[4,2,4,3,5,1,0,0,0,0]' },
    ],
  },
  {
    title: 'Contains Duplicate',
    description:
      'Given an integer array nums, return true if any value appears at least twice in the array.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: 'The value 1 appears twice.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true' },
    ],
  },
  {
    title: 'Plus One',
    description:
      'Given a non-empty array of decimal digits representing a non-negative integer, add one to the integer and return the resulting array of digits.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'digits = [1,2,3]',
        output: '[1,2,4]',
        explanation: '123 + 1 = 124.',
      },
    ],
    constraints: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9'],
    testCases: [
      { input: 'digits = [4,3,2,1]', expectedOutput: '[4,3,2,2]' },
      { input: 'digits = [9]', expectedOutput: '[1,0]' },
      { input: 'digits = [9,9,9]', expectedOutput: '[1,0,0,0]' },
    ],
  },
  {
    title: 'Rotate Array',
    description:
      'Given an array, rotate the array to the right by k steps, where k is non-negative.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,2,3,4,5,6,7], k = 3',
        output: '[5,6,7,1,2,3,4]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= k <= 10^5'],
    testCases: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', expectedOutput: '[5,6,7,1,2,3,4]' },
      { input: 'nums = [-1,-100,3,99], k = 2', expectedOutput: '[3,99,-1,-100]' },
      { input: 'nums = [1,2,3], k = 4', expectedOutput: '[3,1,2]' },
    ],
  },
  {
    title: 'Remove Duplicates from Sorted Array',
    description:
      'Given a sorted array nums, remove the duplicates in-place such that each element appears only once and return the new length.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
        output: '5',
        explanation: 'The first five elements after removal are [0,1,2,3,4].',
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100'],
    testCases: [
      { input: 'nums = [1,1,2]', expectedOutput: '2' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5' },
      { input: 'nums = [1,2,3]', expectedOutput: '3' },
    ],
  },
  {
    title: 'Intersection of Two Arrays',
    description:
      'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums1 = [1,2,2,1], nums2 = [2,2]',
        output: '[2]',
      },
    ],
    constraints: ['1 <= nums1.length, nums2.length <= 1000', '0 <= nums[i] <= 1000'],
    testCases: [
      { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expectedOutput: '[2]' },
      { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', expectedOutput: '[4,9]' },
      { input: 'nums1 = [1,2,3], nums2 = [4,5,6]', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Single Number',
    description:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1',
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4'],
    testCases: [
      { input: 'nums = [4,1,2,1,2]', expectedOutput: '4' },
      { input: 'nums = [2,2,1]', expectedOutput: '1' },
      { input: 'nums = [1]', expectedOutput: '1' },
    ],
  },
  {
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The contiguous subarray [4,-1,2,1] has the largest sum = 6.',
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-10^5 <= nums[i] <= 10^5'],
    testCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23' },
    ],
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve by choosing a single day to buy and a different day to sell.',
    difficulty: 'EASY',
    topic: 'Arrays',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 and sell on day 5 for profit 5.',
      },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expectedOutput: '5' },
      { input: 'prices = [7,6,4,3,1]', expectedOutput: '0' },
      { input: 'prices = [1,2]', expectedOutput: '1' },
    ],
  },
  // Arrays - Medium
  {
    title: 'Product of Array Except Self',
    description:
      'Given an array nums of n integers where n > 1, return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]',
      },
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    testCases: [
      { input: 'nums = [1,2,3,4]', expectedOutput: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]' },
      { input: 'nums = [2,3,4,5]', expectedOutput: '[60,40,30,24]' },
    ],
  },
  {
    title: '3Sum',
    description:
      'Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that their sum is zero.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
      },
    ],
    constraints: ['0 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = []', expectedOutput: '[]' },
      { input: 'nums = [0,0,0,0]', expectedOutput: '[[0,0,0]]' },
    ],
  },
  {
    title: 'Set Matrix Zeroes',
    description: 'Given an m x n matrix, if an element is 0, set its entire row and column to 0s.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
        output: '[[1,1,1],[1,0,1],[1,1,1]]',
      },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200'],
    testCases: [
      {
        input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]',
        expectedOutput: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]',
      },
      { input: 'matrix = [[1,2,3],[4,0,6],[7,8,9]]', expectedOutput: '[[1,0,3],[0,0,0],[7,0,9]]' },
      { input: 'matrix = [[1]]', expectedOutput: '[[1]]' },
    ],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    description:
      'Suppose an array sorted in ascending order is rotated at an unknown pivot. Find the minimum element.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [3,4,5,1,2]',
        output: '1',
      },
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: 'nums = [3,4,5,1,2]', expectedOutput: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', expectedOutput: '0' },
      { input: 'nums = [1]', expectedOutput: '1' },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array',
    description:
      'Given a rotated sorted array nums and a target value, return its index if found, otherwise return -1.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
      },
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1' },
      { input: 'nums = [1], target = 0', expectedOutput: '-1' },
    ],
  },
  {
    title: 'Find All Numbers Disappeared in an Array',
    description:
      'Given an array nums of integers where 1 <= nums[i] <= n, return all the numbers in the range [1,n] that do not appear in nums.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [4,3,2,7,8,2,3,1]',
        output: '[5,6]',
      },
    ],
    constraints: ['n == nums.length', '1 <= nums[i] <= n <= 10^5'],
    testCases: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', expectedOutput: '[5,6]' },
      { input: 'nums = [1,1]', expectedOutput: '[2]' },
      { input: 'nums = [2,2]', expectedOutput: '[1]' },
    ],
  },
  {
    title: 'Next Permutation',
    description:
      'Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[1,3,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 100', '-100 <= nums[i] <= 100'],
    testCases: [
      { input: 'nums = [1,2,3]', expectedOutput: '[1,3,2]' },
      { input: 'nums = [3,2,1]', expectedOutput: '[1,2,3]' },
      { input: 'nums = [1,1,5]', expectedOutput: '[1,5,1]' },
    ],
  },
  {
    title: 'Spiral Matrix',
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
      },
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10'],
    testCases: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]' },
      {
        input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]',
      },
      { input: 'matrix = [[7]]', expectedOutput: '[7]' },
    ],
  },
  {
    title: 'Find Peak Element',
    description:
      'A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, return the index of any peak element.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', 'nums[i] != nums[i+1]'],
    testCases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: '2' },
      { input: 'nums = [1,2,1,3,5,6,4]', expectedOutput: '1' },
      { input: 'nums = [1]', expectedOutput: '0' },
    ],
  },
  {
    title: 'Subarray Sum Equals K',
    description:
      'Given an array of integers and an integer k, return the total number of continuous subarrays whose sum equals k.',
    difficulty: 'MEDIUM',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,1,1], k = 2',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000'],
    testCases: [
      { input: 'nums = [1,1,1], k = 2', expectedOutput: '2' },
      { input: 'nums = [1,2,3], k = 3', expectedOutput: '2' },
      { input: 'nums = [1,-1,0], k = 0', expectedOutput: '3' },
    ],
  },
  // Arrays - Hard
  {
    title: 'Sliding Window Maximum',
    description:
      'Given an array nums and a sliding window size k, return the maximum value in each window as it moves from left to right.',
    difficulty: 'HARD',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expectedOutput: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]' },
      { input: 'nums = [9,11], k = 2', expectedOutput: '[11]' },
    ],
  },
  {
    title: 'Trapping Rain Water',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'HARD',
    topic: 'Arrays',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
      },
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' },
      { input: 'height = [4,2,0,3,2,5]', expectedOutput: '9' },
      { input: 'height = [1,1,1,1]', expectedOutput: '0' },
    ],
  },
  {
    title: 'Longest Consecutive Sequence',
    description:
      'Given an unsorted array of integers, return the length of the longest consecutive elements sequence.',
    difficulty: 'HARD',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [100,4,200,1,3,2]',
        output: '4',
      },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: 'nums = [100,4,200,1,3,2]', expectedOutput: '4' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9' },
      { input: 'nums = []', expectedOutput: '0' },
    ],
  },
  {
    title: 'Median of Two Sorted Arrays',
    description:
      'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
    difficulty: 'HARD',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.0',
      },
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m, n <= 1000'],
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2.5' },
      { input: 'nums1 = [0,0], nums2 = [0,0]', expectedOutput: '0.0' },
    ],
  },
  {
    title: '4Sum',
    description:
      'Given an array nums of n integers, find all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that they add up to a target.',
    difficulty: 'HARD',
    topic: 'Arrays',
    examples: [
      {
        input: 'nums = [1,0,-1,0,-2,2], target = 0',
        output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
      },
    ],
    constraints: ['0 <= nums.length <= 200', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      {
        input: 'nums = [1,0,-1,0,-2,2], target = 0',
        expectedOutput: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
      },
      { input: 'nums = [2,2,2,2,2], target = 8', expectedOutput: '[[2,2,2,2]]' },
      { input: 'nums = [], target = 0', expectedOutput: '[]' },
    ],
  },
  // Strings - Easy
  {
    title: 'Valid Palindrome',
    description:
      'A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
      },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: 's = "race a car"', expectedOutput: 'false' },
      { input: 's = ""', expectedOutput: 'true' },
    ],
  },
  {
    title: 'Reverse String',
    description: 'Write a function that reverses a string represented as an array of characters.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
    ],
    constraints: ['1 <= s.length <= 10^5'],
    testCases: [
      { input: 's = ["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
      { input: 's = ["a"]', expectedOutput: '["a"]' },
    ],
  },
  {
    title: 'First Unique Character in a String',
    description:
      'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = "leetcode"',
        output: '0',
      },
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    testCases: [
      { input: 's = "loveleetcode"', expectedOutput: '2' },
      { input: 's = "aabb"', expectedOutput: '-1' },
      { input: 's = "test"', expectedOutput: '0' },
    ],
  },
  {
    title: 'Implement strStr()',
    description:
      'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 'haystack = "hello", needle = "ll"',
        output: '2',
      },
    ],
    constraints: ['1 <= haystack.length, needle.length <= 10^4'],
    testCases: [
      { input: 'haystack = "hello", needle = "ll"', expectedOutput: '2' },
      { input: 'haystack = "aaaaa", needle = "bba"', expectedOutput: '-1' },
      { input: 'haystack = "", needle = ""', expectedOutput: '0' },
    ],
  },
  {
    title: 'Longest Common Prefix',
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
      },
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
    testCases: [
      { input: 'strs = ["flower","flow","flight"]', expectedOutput: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', expectedOutput: '""' },
      { input: 'strs = ["interspecies","interstellar","interstate"]', expectedOutput: '"inters"' },
    ],
  },
  {
    title: 'Count and Say',
    description:
      'The count-and-say sequence is a sequence of digit strings. Given n, return the nth term of the sequence.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 'n = 4',
        output: '"1211"',
      },
    ],
    constraints: ['1 <= n <= 30'],
    testCases: [
      { input: 'n = 1', expectedOutput: '"1"' },
      { input: 'n = 4', expectedOutput: '"1211"' },
      { input: 'n = 5', expectedOutput: '"111221"' },
    ],
  },
  {
    title: 'Valid Anagram',
    description:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true',
      },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    testCases: [
      { input: 's = "rat", t = "car"', expectedOutput: 'false' },
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "", t = ""', expectedOutput: 'true' },
    ],
  },
  {
    title: 'Palindrome Number',
    description: 'Given an integer x, return true if x is a palindrome integer.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 'x = 121',
        output: 'true',
      },
    ],
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    testCases: [
      { input: 'x = 121', expectedOutput: 'true' },
      { input: 'x = -121', expectedOutput: 'false' },
      { input: 'x = 10', expectedOutput: 'false' },
    ],
  },
  {
    title: 'Reverse Words in a String',
    description:
      'Given a string s, reverse the order of the words. A word is defined as a sequence of non-space characters.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = "the sky is blue"',
        output: '"blue is sky the"',
      },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    testCases: [
      { input: 's = "the sky is blue"', expectedOutput: '"blue is sky the"' },
      { input: 's = "  hello world  "', expectedOutput: '"world hello"' },
      { input: 's = "a good   example"', expectedOutput: '"example good a"' },
    ],
  },
  {
    title: 'Length of Last Word',
    description:
      'Given a string s consisting of words and spaces, return the length of the last word in the string.',
    difficulty: 'EASY',
    topic: 'Strings',
    examples: [
      {
        input: 's = "Hello World"',
        output: '5',
      },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    testCases: [
      { input: 's = "Hello World"', expectedOutput: '5' },
      { input: 's = "   fly me   to   the moon  "', expectedOutput: '4' },
      { input: 's = "luffy is still joyboy"', expectedOutput: '6' },
    ],
  },
  // Strings - Medium
  {
    title: 'Group Anagrams',
    description:
      'Given an array of strings, group the anagrams together. Return the answer in any order.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    testCases: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      { input: 'strs = [""]', expectedOutput: '[[""]]' },
      { input: 'strs = ["a"]', expectedOutput: '[["a"]]' },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
      },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3' },
      { input: 's = "bbbbb"', expectedOutput: '1' },
      { input: 's = "pwwkew"', expectedOutput: '3' },
    ],
  },
  {
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring in s.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
      },
    ],
    constraints: ['1 <= s.length <= 1000'],
    testCases: [
      { input: 's = "babad"', expectedOutput: '"bab"' },
      { input: 's = "cbbd"', expectedOutput: '"bb"' },
      { input: 's = "a"', expectedOutput: '"a"' },
    ],
  },
  {
    title: 'Valid Parentheses',
    description:
      'Given a string containing just the characters ()[]{} , determine if the input string is valid.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
    ],
  },
  {
    title: 'String to Integer (atoi)',
    description:
      'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer. The function should handle optional whitespace, plus/minus sign, and invalid characters.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "42"',
        output: '42',
      },
    ],
    constraints: ['0 <= s.length <= 200'],
    testCases: [
      { input: 's = "42"', expectedOutput: '42' },
      { input: 's = "   -42"', expectedOutput: '-42' },
      { input: 's = "4193 with words"', expectedOutput: '4193' },
    ],
  },
  {
    title: 'Minimum Window Substring',
    description:
      'Given strings s and t, return the smallest substring of s that contains all characters of t. If there is no such substring, return an empty string.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
      },
    ],
    constraints: ['1 <= s.length, t.length <= 10^5'],
    testCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: '"BANC"' },
      { input: 's = "a", t = "aa"', expectedOutput: '""' },
      { input: 's = "a", t = "a"', expectedOutput: '"a"' },
    ],
  },
  {
    title: 'Decode Ways',
    description:
      'A message containing letters from A-Z is encoded as numbers. Given a digit string, determine the total number of ways to decode it.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 's = "12"',
        output: '2',
      },
    ],
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeroes.'],
    testCases: [
      { input: 's = "12"', expectedOutput: '2' },
      { input: 's = "226"', expectedOutput: '3' },
      { input: 's = "0"', expectedOutput: '0' },
    ],
  },
  {
    title: 'Simplify Path',
    description: 'Given a Unix-style file path, simplify it to the canonical path.',
    difficulty: 'MEDIUM',
    topic: 'Strings',
    examples: [
      {
        input: 'path = "/home//foo/"',
        output: '"/home/foo"',
      },
    ],
    constraints: ['1 <= path.length <= 3000'],
    testCases: [
      { input: 'path = "/home//foo/"', expectedOutput: '"/home/foo"' },
      { input: 'path = "/../"', expectedOutput: '"/"' },
      { input: 'path = "/a/./b/../../c/"', expectedOutput: '"/c"' },
    ],
  },
  // Strings - Hard
  {
    title: 'Regular Expression Matching',
    description: 'Implement regular expression matching with support for "." and "*".',
    difficulty: 'HARD',
    topic: 'Strings',
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: 'false',
      },
    ],
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30'],
    testCases: [
      { input: 's = "aa", p = "a"', expectedOutput: 'false' },
      { input: 's = "aa", p = "a*"', expectedOutput: 'true' },
      { input: 's = "ab", p = ".*"', expectedOutput: 'true' },
    ],
  },
  {
    title: 'Wildcard Matching',
    description:
      'Given an input string s and a pattern p with ? and *, implement wildcard pattern matching.',
    difficulty: 'HARD',
    topic: 'Strings',
    examples: [
      {
        input: 's = "adceb", p = "*a*b"',
        output: 'true',
      },
    ],
    constraints: ['1 <= s.length, p.length <= 1000'],
    testCases: [
      { input: 's = "aa", p = "a"', expectedOutput: 'false' },
      { input: 's = "aa", p = "*"', expectedOutput: 'true' },
      { input: 's = "cb", p = "?a"', expectedOutput: 'false' },
    ],
  },
  {
    title: 'Minimum Window Subsequence',
    description:
      'Given strings s and t, find the minimum-length subsequence of s that contains t as a subsequence.',
    difficulty: 'HARD',
    topic: 'Strings',
    examples: [
      {
        input: 's = "abcdebdde", t = "bde"',
        output: '"bcde"',
      },
    ],
    constraints: ['1 <= s.length, t.length <= 1000'],
    testCases: [
      { input: 's = "abcdebdde", t = "bde"', expectedOutput: '"bcde"' },
      { input: 's = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl", t = "u"', expectedOutput: '""' },
      {
        input: 's = "fgrqsqsnodwmxzkzxwqegkndaa", t = "fnok"',
        expectedOutput: '"fgrqsqsnodwmxzkzxwqegkndaa"',
      },
    ],
  },
  {
    title: 'Longest Valid Parentheses',
    description:
      'Given a string containing just the characters "(" and ")", return the length of the longest valid parentheses substring.',
    difficulty: 'HARD',
    topic: 'Strings',
    examples: [
      {
        input: 's = ")()())"',
        output: '4',
      },
    ],
    constraints: ['0 <= s.length <= 3 * 10^4'],
    testCases: [
      { input: 's = ")()())"', expectedOutput: '4' },
      { input: 's = "(()"', expectedOutput: '2' },
      { input: 's = ""', expectedOutput: '0' },
    ],
  },
  {
    title: 'Palindrome Partitioning II',
    description:
      'Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed to partition s.',
    difficulty: 'HARD',
    topic: 'Strings',
    examples: [
      {
        input: 's = "aab"',
        output: '1',
      },
    ],
    constraints: ['1 <= s.length <= 2000'],
    testCases: [
      { input: 's = "aab"', expectedOutput: '1' },
      { input: 's = "a"', expectedOutput: '0' },
      { input: 's = "ab"', expectedOutput: '1' },
    ],
  },
  // SQL - Easy
  {
    title: 'Employees with Salary Above Threshold',
    description:
      'Given a list of employee records and a salary threshold, return the names of employees whose salary is above the threshold.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'employees = [["Alice",70000],["Bob",50000]], threshold = 60000',
        output: '["Alice"]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000', '0 <= salary <= 10^7'],
    testCases: [
      {
        input: 'employees = [["Alice",70000],["Bob",50000]], threshold = 60000',
        expectedOutput: '["Alice"]',
      },
      {
        input: 'employees = [["Ana",40000],["Ben",45000]], threshold = 50000',
        expectedOutput: '[]',
      },
      {
        input: 'employees = [["Tom",90000],["Jane",95000],["Ezra",85000]], threshold = 90000',
        expectedOutput: '["Jane"]',
      },
    ],
  },
  {
    title: 'Customers with Orders',
    description:
      'Given a list of customers and orders, return the IDs of customers who have placed at least one order.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'customers = [[1,"Alice"],[2,"Bob"]], orders = [[101,1],[102,1]]',
        output: '[1]',
      },
    ],
    constraints: ['1 <= customers.length, orders.length <= 1000'],
    testCases: [
      {
        input: 'customers = [[1,"Alice"],[2,"Bob"]], orders = [[101,1],[102,1]]',
        expectedOutput: '[1]',
      },
      { input: 'customers = [[1,"Cindy"],[2,"Dan"]], orders = []', expectedOutput: '[]' },
      {
        input: 'customers = [[1,"A"],[2,"B"],[3,"C"]], orders = [[1,101],[3,102]]',
        expectedOutput: '[1,3]',
      },
    ],
  },
  {
    title: 'Products Under Budget',
    description:
      'Given a list of products with prices and a budget, return all product names with price less than or equal to budget.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'products = [["Pen",3],["Notebook",10]], budget = 5',
        output: '["Pen"]',
      },
    ],
    constraints: ['1 <= products.length <= 1000', '0 <= price <= 10^5'],
    testCases: [
      { input: 'products = [["Pen",3],["Notebook",10]], budget = 5', expectedOutput: '["Pen"]' },
      {
        input: 'products = [["Pencil",1],["Eraser",2]], budget = 2',
        expectedOutput: '["Pencil","Eraser"]',
      },
      { input: 'products = [["Phone",500]], budget = 100', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Students with Top Score',
    description:
      'Given a list of student records and scores, return the names of students who achieved the top score.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'scores = [["Alice",95],["Bob",95],["Charlie",90]]',
        output: '["Alice","Bob"]',
      },
    ],
    constraints: ['1 <= scores.length <= 1000', '0 <= score <= 100'],
    testCases: [
      {
        input: 'scores = [["Alice",95],["Bob",95],["Charlie",90]]',
        expectedOutput: '["Alice","Bob"]',
      },
      { input: 'scores = [["Sam",88]]', expectedOutput: '["Sam"]' },
      { input: 'scores = [["A",70],["B",80],["C",70]]', expectedOutput: '["B"]' },
    ],
  },
  {
    title: 'Orders by Customer',
    description:
      'Given a list of orders and customer IDs, return the orders grouped by customer ID in ascending customer order.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[101,1],[102,1],[103,2]]',
        output: '[[1,[101,102]],[2,[103]]]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [[101,1],[102,1],[103,2]]', expectedOutput: '[[1,[101,102]],[2,[103]]]' },
      { input: 'orders = [[201,3]]', expectedOutput: '[[3,[201]]]' },
      { input: 'orders = []', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Available Inventory',
    description:
      'Given inventory items with a quantity and a threshold, return item names that need restocking when quantity is less than the threshold.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'inventory = [["Apples",5,10],["Bananas",12,10]]',
        output: '["Apples"]',
      },
    ],
    constraints: ['1 <= inventory.length <= 1000'],
    testCases: [
      { input: 'inventory = [["Apples",5,10],["Bananas",12,10]]', expectedOutput: '["Apples"]' },
      { input: 'inventory = [["Chips",10,10]]', expectedOutput: '[]' },
      { input: 'inventory = [["Milk",0,1]]', expectedOutput: '["Milk"]' },
    ],
  },
  {
    title: 'Top Rated Movies',
    description:
      'Given a list of movies and their ratings, return the names of movies with rating at least the threshold.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'movies = [["MovieA",8.5],["MovieB",7.0]], threshold = 8.0',
        output: '["MovieA"]',
      },
    ],
    constraints: ['1 <= movies.length <= 1000', '0 <= rating <= 10'],
    testCases: [
      {
        input: 'movies = [["MovieA",8.5],["MovieB",7.0]], threshold = 8.0',
        expectedOutput: '["MovieA"]',
      },
      { input: 'movies = [["X",9.2],["Y",9.2]] , threshold = 9.0', expectedOutput: '["X","Y"]' },
      { input: 'movies = [["Low",3.5]] , threshold = 4.0', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Users with Active Status',
    description:
      'Given a list of users and a status field, return the IDs of users whose status is active.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'users = [[1,"active"],[2,"inactive"],[3,"active"]]',
        output: '[1,3]',
      },
    ],
    constraints: ['1 <= users.length <= 1000'],
    testCases: [
      { input: 'users = [[1,"active"],[2,"inactive"],[3,"active"]]', expectedOutput: '[1,3]' },
      { input: 'users = [[1,"inactive"]]', expectedOutput: '[]' },
      { input: 'users = [[1,"active"],[2,"active"]]', expectedOutput: '[1,2]' },
    ],
  },
  {
    title: 'Employee Count by Department',
    description:
      'Given employee records with a department field, return the number of employees in each department.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'employees = [["Sales"],["Sales"],["IT"]]',
        output: '[["IT",1],["Sales",2]]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000'],
    testCases: [
      {
        input: 'employees = [["Sales"],["Sales"],["IT"]]',
        expectedOutput: '[["IT",1],["Sales",2]]',
      },
      { input: 'employees = [["HR"]]', expectedOutput: '[["HR",1]]' },
      { input: 'employees = []', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Customers Without Orders',
    description:
      'Given lists of customers and orders, return customer IDs that have not placed any orders.',
    difficulty: 'EASY',
    topic: 'SQL',
    examples: [
      {
        input: 'customers = [1,2,3], orders = [[101,1],[102,2]]',
        output: '[3]',
      },
    ],
    constraints: ['1 <= customers.length <= 1000', '0 <= orders.length <= 1000'],
    testCases: [
      { input: 'customers = [1,2,3], orders = [[101,1],[102,2]]', expectedOutput: '[3]' },
      { input: 'customers = [1], orders = []', expectedOutput: '[1]' },
      { input: 'customers = [1,2], orders = [[201,2]]', expectedOutput: '[1]' },
    ],
  },
  // SQL - Medium
  {
    title: 'Department Average Salary',
    description:
      'Given a list of employee records with department names and salaries, return the average salary for each department.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'employees = [["Sales",70000],["IT",90000],["Sales",80000]]',
        output: '[["IT",90000],["Sales",75000]]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000'],
    testCases: [
      {
        input: 'employees = [["Sales",70000],["IT",90000],["Sales",80000]]',
        expectedOutput: '[["IT",90000],["Sales",75000]]',
      },
      { input: 'employees = [["HR",40000]]', expectedOutput: '[["HR",40000]]' },
      { input: 'employees = [["IT",60000],["IT",80000]]', expectedOutput: '[["IT",70000]]' },
    ],
  },
  {
    title: 'Orders Above Average',
    description:
      'Given a list of orders with order values, return the order IDs with value above the average value.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[101,100],[102,150],[103,50]]',
        output: '[102]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [[101,100],[102,150],[103,50]]', expectedOutput: '[102]' },
      { input: 'orders = [[201,50],[202,50]]', expectedOutput: '[]' },
      { input: 'orders = [[301,120],[302,130]]', expectedOutput: '[302]' },
    ],
  },
  {
    title: 'Top Customers by Order Count',
    description:
      'Given a list of orders, return customers ordered by the number of orders they placed, highest first.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[101,1],[102,2],[103,1]]',
        output: '[1,2]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [[101,1],[102,2],[103,1]]', expectedOutput: '[1,2]' },
      { input: 'orders = [[101,3],[102,3],[103,2]]', expectedOutput: '[3,2]' },
      { input: 'orders = [[101,1]]', expectedOutput: '[1]' },
    ],
  },
  {
    title: 'Most Frequent Product',
    description: 'Given a list of product orders, return the product that appears most frequently.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [["apple"],["banana"],["apple"]]',
        output: '"apple"',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [["apple"],["banana"],["apple"]]', expectedOutput: '"apple"' },
      { input: 'orders = [["x"]]', expectedOutput: '"x"' },
      { input: 'orders = [["a"],["b"],["b"],["a"],["b"]]', expectedOutput: '"b"' },
    ],
  },
  {
    title: 'Orders Value by Customer',
    description:
      'Given orders with a customer ID and order value, compute the total spending amount per customer.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[1,100],[2,200],[1,50]]',
        output: '[[1,150],[2,200]]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [[1,100],[2,200],[1,50]]', expectedOutput: '[[1,150],[2,200]]' },
      { input: 'orders = [[3,10]]', expectedOutput: '[[3,10]]' },
      { input: 'orders = [[1,5],[1,5],[2,5]]', expectedOutput: '[[1,10],[2,5]]' },
    ],
  },
  {
    title: 'Highest Paid Employee per Department',
    description:
      'Given employee records with department information and salaries, return the highest-paid employee name for each department.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'employees = [["Sales","Alice",70000],["Sales","Bob",80000],["IT","Carol",90000]]',
        output: '[["IT","Carol"],["Sales","Bob"]]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000'],
    testCases: [
      {
        input: 'employees = [["Sales","Alice",70000],["Sales","Bob",80000],["IT","Carol",90000]]',
        expectedOutput: '[["IT","Carol"],["Sales","Bob"]]',
      },
      { input: 'employees = [["HR","Dana",50000]]', expectedOutput: '[["HR","Dana"]]' },
      {
        input: 'employees = [["Ops","Eve",60000],["Ops","Frank",60000]]',
        expectedOutput: '[["Ops","Eve"]]',
      },
    ],
  },
  {
    title: 'Customers with Multiple Orders',
    description: 'Given a list of orders, return customer IDs who have placed more than one order.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[101,1],[102,2],[103,1],[104,2]]',
        output: '[1,2]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      { input: 'orders = [[101,1],[102,2],[103,1],[104,2]]', expectedOutput: '[1,2]' },
      { input: 'orders = [[101,3]]', expectedOutput: '[]' },
      { input: 'orders = [[1,1],[2,2],[3,2],[4,2]]', expectedOutput: '[2]' },
    ],
  },
  {
    title: 'Recent Orders by Date',
    description:
      'Given a list of orders with dates, return the IDs of orders placed on or after a specified date.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'orders = [[101,"2024-01-10"],[102,"2024-01-15"]], date = "2024-01-12"',
        output: '[102]',
      },
    ],
    constraints: ['1 <= orders.length <= 1000'],
    testCases: [
      {
        input: 'orders = [[101,"2024-01-10"],[102,"2024-01-15"]], date = "2024-01-12"',
        expectedOutput: '[102]',
      },
      { input: 'orders = [[201,"2024-03-01"]], date = "2024-03-01"', expectedOutput: '[201]' },
      { input: 'orders = [[301,"2024-02-01"]], date = "2024-02-02"', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Supplier Inventory Count',
    description:
      'Given a list of inventory items and supplier names, count how many items each supplier provides.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'items = [["A","Supplier1"],["B","Supplier2"],["C","Supplier1"]]',
        output: '[["Supplier1",2],["Supplier2",1]]',
      },
    ],
    constraints: ['1 <= items.length <= 1000'],
    testCases: [
      {
        input: 'items = [["A","Supplier1"],["B","Supplier2"],["C","Supplier1"]]',
        expectedOutput: '[["Supplier1",2],["Supplier2",1]]',
      },
      { input: 'items = [["X","S1"]]', expectedOutput: '[["S1",1]]' },
      { input: 'items = []', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Average Rating by Product',
    description:
      'Given ratings for products, compute the average rating for each product and return them in ascending product order.',
    difficulty: 'MEDIUM',
    topic: 'SQL',
    examples: [
      {
        input: 'ratings = [["P1",5],["P1",3],["P2",4]]',
        output: '[["P1",4],["P2",4]]',
      },
    ],
    constraints: ['1 <= ratings.length <= 1000'],
    testCases: [
      { input: 'ratings = [["P1",5],["P1",3],["P2",4]]', expectedOutput: '[["P1",4],["P2",4]]' },
      { input: 'ratings = [["X",1]]', expectedOutput: '[["X",1]]' },
      { input: 'ratings = [["A",4],["A",4],["A",4]]', expectedOutput: '[["A",4]]' },
    ],
  },
  // SQL - Hard
  {
    title: 'Second Highest Salary',
    description:
      'Given a list of employee salaries, return the second highest salary. If it does not exist, return null.',
    difficulty: 'HARD',
    topic: 'SQL',
    examples: [
      {
        input: 'salaries = [100,200,300]',
        output: '200',
      },
    ],
    constraints: ['1 <= salaries.length <= 1000'],
    testCases: [
      { input: 'salaries = [100,200,300]', expectedOutput: '200' },
      { input: 'salaries = [100,100]', expectedOutput: 'null' },
      { input: 'salaries = [700,500,900,900]', expectedOutput: '700' },
    ],
  },
  {
    title: 'Top N Highest Salary Per Department',
    description:
      'Given employee records with department and salary, return the top N salaries for each department.',
    difficulty: 'HARD',
    topic: 'SQL',
    examples: [
      {
        input: 'employees = [["HR","Alice",70000],["HR","Bob",80000],["IT","Carol",90000]], n = 1',
        output: '[["HR","Bob",80000],["IT","Carol",90000]]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000', '1 <= n <= 100'],
    testCases: [
      {
        input: 'employees = [["HR","Alice",70000],["HR","Bob",80000],["IT","Carol",90000]], n = 1',
        expectedOutput: '[["HR","Bob",80000],["IT","Carol",90000]]',
      },
      {
        input: 'employees = [["Sales","A",40000],["Sales","B",50000]], n = 2',
        expectedOutput: '[["Sales","B",50000],["Sales","A",40000]]',
      },
      { input: 'employees = [["Ops","X",100000]], n = 3', expectedOutput: '[["Ops","X",100000]]' },
    ],
  },
  {
    title: 'Highest Transaction Value',
    description:
      'Given transaction records with customer IDs and transaction values, return the highest value per customer.',
    difficulty: 'HARD',
    topic: 'SQL',
    examples: [
      {
        input: 'transactions = [[1,100],[2,150],[1,200]]',
        output: '[[1,200],[2,150]]',
      },
    ],
    constraints: ['1 <= transactions.length <= 1000'],
    testCases: [
      { input: 'transactions = [[1,100],[2,150],[1,200]]', expectedOutput: '[[1,200],[2,150]]' },
      { input: 'transactions = [[3,50]]', expectedOutput: '[[3,50]]' },
      { input: 'transactions = [[1,5],[1,5],[2,10]]', expectedOutput: '[[1,5],[2,10]]' },
    ],
  },
  {
    title: 'Department Salary Range Count',
    description:
      'Given employee salaries and a range, count how many employees in each department fall inside the salary range.',
    difficulty: 'HARD',
    topic: 'SQL',
    examples: [
      {
        input:
          'employees = [["Sales",70000],["Sales",85000],["IT",90000]], minSalary = 70000, maxSalary = 90000',
        output: '[["IT",1],["Sales",2]]',
      },
    ],
    constraints: ['1 <= employees.length <= 1000'],
    testCases: [
      {
        input:
          'employees = [["Sales",70000],["Sales",85000],["IT",90000]], minSalary = 70000, maxSalary = 90000',
        expectedOutput: '[["IT",1],["Sales",2]]',
      },
      {
        input: 'employees = [["HR",60000]], minSalary = 70000, maxSalary = 80000',
        expectedOutput: '[]',
      },
      {
        input:
          'employees = [["IT",75000],["IT",80000],["Sales",72000]], minSalary = 70000, maxSalary = 76000',
        expectedOutput: '[["IT",1],["Sales",1]]',
      },
    ],
  },
  {
    title: 'Ranked Sales by Month',
    description:
      'Given monthly sales and a ranking threshold, return months where sales rank in the top N.',
    difficulty: 'HARD',
    topic: 'SQL',
    examples: [
      {
        input: 'sales = [["Jan",100],["Feb",200],["Mar",150]], n = 2',
        output: '["Feb","Mar"]',
      },
    ],
    constraints: ['1 <= sales.length <= 12', '0 <= salesAmount <= 10^6'],
    testCases: [
      {
        input: 'sales = [["Jan",100],["Feb",200],["Mar",150]], n = 2',
        expectedOutput: '["Feb","Mar"]',
      },
      { input: 'sales = [["Apr",50]], n = 1', expectedOutput: '["Apr"]' },
      { input: 'sales = [["A",100],["B",100]], n = 1', expectedOutput: '["A","B"]' },
    ],
  },
  // Vectors - Easy
  {
    title: 'Vector Sum',
    description: 'Given a vector of integers, return the sum of all elements.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '10',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: 'nums = [1,2,3,4]', expectedOutput: '10' },
      { input: 'nums = [-1,-2,-3]', expectedOutput: '-6' },
      { input: 'nums = [0]', expectedOutput: '0' },
    ],
  },
  {
    title: 'Find Even Numbers in a Vector',
    description: 'Given a vector of integers, return all even numbers in the original order.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[2,4]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    testCases: [
      { input: 'nums = [1,2,3,4]', expectedOutput: '[2,4]' },
      { input: 'nums = [2,2,3]', expectedOutput: '[2,2]' },
      { input: 'nums = [1,3,5]', expectedOutput: '[]' },
    ],
  },
  {
    title: 'Max Consecutive Ones',
    description:
      'Given a binary vector, return the maximum number of consecutive 1s in the vector.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,1,0,1,1,1]',
        output: '3',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1'],
    testCases: [
      { input: 'nums = [1,1,0,1,1,1]', expectedOutput: '3' },
      { input: 'nums = [0,0,0]', expectedOutput: '0' },
      { input: 'nums = [1,0,1,1]', expectedOutput: '2' },
    ],
  },
  {
    title: 'Running Sum of 1d Array',
    description:
      'Given a vector nums, return the running sum of the vector where runningSum[i] is the sum of nums[0] through nums[i].',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[1,3,6,10]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^3', '-10^6 <= nums[i] <= 10^6'],
    testCases: [
      { input: 'nums = [1,2,3,4]', expectedOutput: '[1,3,6,10]' },
      { input: 'nums = [1,1,1,1,1]', expectedOutput: '[1,2,3,4,5]' },
      { input: 'nums = [3,1,2,10,1]', expectedOutput: '[3,4,6,16,17]' },
    ],
  },
  {
    title: 'Squares of a Sorted Array',
    description:
      'Given a sorted vector nums, return a sorted vector of the squares of each number.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [-4,-1,0,3,10]',
        output: '[0,1,9,16,100]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: 'nums = [-4,-1,0,3,10]', expectedOutput: '[0,1,9,16,100]' },
      { input: 'nums = [-7,-3,2,3,11]', expectedOutput: '[4,9,9,49,121]' },
      { input: 'nums = [0]', expectedOutput: '[0]' },
    ],
  },
  {
    title: 'Find Numbers with Even Number of Digits',
    description:
      'Given an array of integers, return how many numbers contain an even number of digits.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [12,345,2,6,7896]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 500', '1 <= nums[i] <= 10^5'],
    testCases: [
      { input: 'nums = [12,345,2,6,7896]', expectedOutput: '2' },
      { input: 'nums = [555,901,482,1771]', expectedOutput: '1' },
      { input: 'nums = [1,10,100]', expectedOutput: '1' },
    ],
  },
  {
    title: 'Richest Customer Wealth',
    description:
      'Given a 2D array where each row represents a customer and each element represents wealth in a bank account, return the maximum wealth of any customer.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'accounts = [[1,2,3],[3,2,1]]',
        output: '6',
      },
    ],
    constraints: ['m == accounts.length', 'n == accounts[i].length', '1 <= m, n <= 50'],
    testCases: [
      { input: 'accounts = [[1,5],[7,3],[3,5]]', expectedOutput: '10' },
      { input: 'accounts = [[2,8,7],[7,1,3],[1,9,5]]', expectedOutput: '17' },
      { input: 'accounts = [[1,2,3]]', expectedOutput: '6' },
    ],
  },
  {
    title: 'Flip and Invert Image',
    description:
      'Given a binary matrix, flip each row horizontally, then invert the image (change 0 to 1 and 1 to 0).',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'image = [[1,1,0],[1,0,1],[0,0,0]]',
        output: '[[1,0,0],[0,1,0],[1,1,1]]',
      },
    ],
    constraints: ['m == image.length', 'n == image[i].length', '1 <= m, n <= 20'],
    testCases: [
      { input: 'image = [[1,1,0],[1,0,1],[0,0,0]]', expectedOutput: '[[1,0,0],[0,1,0],[1,1,1]]' },
      { input: 'image = [[1,0,1],[0,1,0]]', expectedOutput: '[[0,1,0],[1,0,1]]' },
      { input: 'image = [[0]]', expectedOutput: '[[1]]' },
    ],
  },
  {
    title: 'Build Array from Permutation',
    description:
      'Given a zero-based permutation nums, build an array ans where ans[i] = nums[nums[i]].',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [0,2,1,5,3,4]',
        output: '[0,1,2,4,5,3]',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', 'nums is a permutation of [0,1,...,n-1]'],
    testCases: [
      { input: 'nums = [0,2,1,5,3,4]', expectedOutput: '[0,1,2,4,5,3]' },
      { input: 'nums = [5,0,1,2,3,4]', expectedOutput: '[4,5,0,1,2,3]' },
      { input: 'nums = [1,0]', expectedOutput: '[0,1]' },
    ],
  },
  {
    title: 'Vector Maximum',
    description: 'Given a vector of integers, return the maximum value in the vector.',
    difficulty: 'EASY',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,3,2,5,4]',
        output: '5',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: 'nums = [1,3,2,5,4]', expectedOutput: '5' },
      { input: 'nums = [-1,-2,-3]', expectedOutput: '-1' },
      { input: 'nums = [0]', expectedOutput: '0' },
    ],
  },
  // Vectors - Medium
  {
    title: 'Sort Array By Parity',
    description:
      'Given an array nums, return an array with all even elements followed by odd elements. The order of the elements is not important.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [3,1,2,4]',
        output: '[2,4,3,1]',
      },
    ],
    constraints: ['1 <= nums.length <= 5000', '0 <= nums[i] <= 1000'],
    testCases: [
      { input: 'nums = [3,1,2,4]', expectedOutput: '[2,4,3,1]' },
      { input: 'nums = [0]', expectedOutput: '[0]' },
      { input: 'nums = [2,2,1,1]', expectedOutput: '[2,2,1,1]' },
    ],
  },
  {
    title: 'Height Checker',
    description:
      'Students are standing in a line. Return the minimum number of students that must move to make the heights non-decreasing.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'heights = [1,1,4,2,1,3]',
        output: '3',
      },
    ],
    constraints: ['1 <= heights.length <= 100', '1 <= heights[i] <= 100'],
    testCases: [
      { input: 'heights = [1,1,4,2,1,3]', expectedOutput: '3' },
      { input: 'heights = [5,1,2,3,4]', expectedOutput: '5' },
      { input: 'heights = [1,2,3,4,5]', expectedOutput: '0' },
    ],
  },
  {
    title: 'Shuffle the Array',
    description:
      'Given an array nums consisting of 2n elements, return an array in the form [nums[0], nums[n], nums[1], nums[n+1], ...].',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [2,5,1,3,4,7], n = 3',
        output: '[2,3,5,4,1,7]',
      },
    ],
    constraints: ['1 <= n <= 5000', 'nums.length == 2n'],
    testCases: [
      { input: 'nums = [2,5,1,3,4,7], n = 3', expectedOutput: '[2,3,5,4,1,7]' },
      { input: 'nums = [1,2,3,4,4,3,2,1], n = 4', expectedOutput: '[1,4,2,3,3,2,4,1]' },
      { input: 'nums = [1,1,2,2], n = 2', expectedOutput: '[1,2,1,2]' },
    ],
  },
  {
    title: 'Three Sum Closest',
    description:
      'Given an array nums and a target, return the sum of three integers in nums such that the sum is closest to target.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [-1,2,1,-4], target = 1',
        output: '2',
      },
    ],
    constraints: ['3 <= nums.length <= 1000', '-10^3 <= nums[i] <= 10^3'],
    testCases: [
      { input: 'nums = [-1,2,1,-4], target = 1', expectedOutput: '2' },
      { input: 'nums = [0,0,0], target = 1', expectedOutput: '0' },
      { input: 'nums = [1,1,1,0], target = -100', expectedOutput: '2' },
    ],
  },
  {
    title: 'Minimum Size Subarray Sum',
    description:
      'Given an array and a target sum, find the minimal length of a contiguous subarray of which the sum is at least target.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'target = 7, nums = [2,3,1,2,4,3]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^5'],
    testCases: [
      { input: 'target = 7, nums = [2,3,1,2,4,3]', expectedOutput: '2' },
      { input: 'target = 4, nums = [1,4,4]', expectedOutput: '1' },
      { input: 'target = 11, nums = [1,2,3,4,5]', expectedOutput: '3' },
    ],
  },
  {
    title: 'Sort Colors',
    description:
      'Given an array nums containing 0, 1, and 2, sort the array in-place so that objects of the same color are adjacent.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [2,0,2,1,1,0]',
        output: '[0,0,1,1,2,2]',
      },
    ],
    constraints: ['1 <= nums.length <= 300', 'nums[i] is 0, 1, or 2'],
    testCases: [
      { input: 'nums = [2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', expectedOutput: '[0,1,2]' },
      { input: 'nums = [0]', expectedOutput: '[0]' },
    ],
  },
  {
    title: 'Minimum Operations to Reduce X to Zero',
    description:
      'Given an array nums and an integer x, return the minimum number of operations to reduce x to zero by removing elements from the ends of the array.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'nums = [1,1,4,2,3], x = 5',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i], x <= 10^4'],
    testCases: [
      { input: 'nums = [1,1,4,2,3], x = 5', expectedOutput: '2' },
      { input: 'nums = [5,6,7,8,9], x = 4', expectedOutput: '-1' },
      { input: 'nums = [3,2,20,1,1,3], x = 10', expectedOutput: '5' },
    ],
  },
  {
    title: 'Diagonal Traverse',
    description:
      'Given a matrix, return the elements of the matrix in diagonal order starting at the top-left corner.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,4,7,5,3,6,8,9]',
      },
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10'],
    testCases: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,4,7,5,3,6,8,9]' },
      { input: 'matrix = [[1,2],[3,4]]', expectedOutput: '[1,2,3,4]' },
      { input: 'matrix = [[1]]', expectedOutput: '[1]' },
    ],
  },
  {
    title: 'Game of Life',
    description:
      'Simulate one step of Conway’s Game of Life on a binary matrix and return the next state.',
    difficulty: 'MEDIUM',
    topic: 'Vectors',
    examples: [
      {
        input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]',
        output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]',
      },
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 25'],
    testCases: [
      {
        input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]',
        expectedOutput: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]',
      },
      { input: 'board = [[1,1],[1,0]]', expectedOutput: '[[1,1],[1,1]]' },
      { input: 'board = [[0]]', expectedOutput: '[[0]]' },
    ],
  },
];

async function main() {
  await prisma.testCase.deleteMany();
  await prisma.problem.deleteMany();

  problems.push(...linkedListProblems);
  problems.push(...graphProblems);
  problems.push(...searchingProblems);
  problems.push(...sortingProblems);
  problems.push(...bitManipulationProblems);
  problems.push(...greedyProblems);
  problems.push(...mathProblems);
  problems.push(...dpProblems);
  problems.push(...stacksProblems);
  problems.push(...queuesProblems);
  problems.push(...hashTablesProblems);
  problems.push(...treeProblems);

  for (const problem of problems) {
    await prisma.problem.create({
      data: {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        topic: problem.topic,
        examples: problem.examples,
        constraints: problem.constraints,
        sampleInput: problem.sampleInput,
        sampleOutput: problem.sampleOutput,
        boilerplate,
        testCases: {
          create: problem.testCases.map((testCase) => ({
            input: testCase.input,
            executionInput: testCase.input,
            expectedOutput: testCase.expectedOutput,
            isHidden: testCase.isHidden ?? false,
          })),
        },
      },
    });
  }

  console.log(`Database seed completed with ${problems.length} problems.`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
