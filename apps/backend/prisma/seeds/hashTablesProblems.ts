import type { ProblemSeed } from '../seed.ts';

export const hashTablesProblems: ProblemSeed[] = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, return [0, 1].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
    ],
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]', isHidden: true },
    ],
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description:
      'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: 'The value 1 appears twice.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    sampleInput: 'nums = [1,2,3,1]',
    sampleOutput: 'true',
    testCases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.',
    ],
    sampleInput: 's = "anagram", t = "nagaram"',
    sampleOutput: 'true',
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "rat", t = "car"', expectedOutput: 'false' },
      { input: 's = "a", t = "aa"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Intersection of Two Arrays',
    slug: 'intersection-of-two-arrays',
    description:
      'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2]' }],
    constraints: ['1 <= nums1.length, nums2.length <= 1000', '0 <= nums[i] <= 1000'],
    sampleInput: 'nums1 = [1,2,2,1], nums2 = [2,2]',
    sampleOutput: '[2]',
    testCases: [
      { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expectedOutput: '[2]' },
      { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', expectedOutput: '[4,9]' },
      { input: 'nums1 = [], nums2 = [1,2]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Happy Number',
    slug: 'happy-number',
    description:
      'Write an algorithm to determine if a number n is happy. A number is happy if repeatedly replacing it with the sum of the squares of its digits eventually leads to 1.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 'n = 19', output: 'true' }],
    constraints: ['1 <= n <= 2^31 - 1'],
    sampleInput: 'n = 19',
    sampleOutput: 'true',
    testCases: [
      { input: 'n = 19', expectedOutput: 'true' },
      { input: 'n = 2', expectedOutput: 'false' },
      { input: 'n = 7', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Ransom Note',
    slug: 'ransom-note',
    description:
      'Given two strings ransomNote and magazine, return true if ransomNote can be constructed from the letters in magazine.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 'ransomNote = "a", magazine = "b"', output: 'false' }],
    constraints: [
      '1 <= ransomNote.length, magazine.length <= 10^5',
      'ransomNote and magazine consist of lowercase English letters.',
    ],
    sampleInput: 'ransomNote = "a", magazine = "b"',
    sampleOutput: 'false',
    testCases: [
      { input: 'ransomNote = "a", magazine = "b"', expectedOutput: 'false' },
      { input: 'ransomNote = "aa", magazine = "ab"', expectedOutput: 'false' },
      { input: 'ransomNote = "aa", magazine = "aab"', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'First Unique Character in a String',
    slug: 'first-unique-character-in-a-string',
    description:
      'Given a string s, return the index of the first non-repeating character in it. If it does not exist, return -1.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 's = "leetcode"', output: '0' }],
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    sampleInput: 's = "leetcode"',
    sampleOutput: '0',
    testCases: [
      { input: 's = "leetcode"', expectedOutput: '0' },
      { input: 's = "loveleetcode"', expectedOutput: '2' },
      { input: 's = "aabb"', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Jewels and Stones',
    slug: 'jewels-and-stones',
    description:
      "You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Return how many of the stones you have are jewels.",
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 'jewels = "aA", stones = "aAAbbbb"', output: '3' }],
    constraints: [
      '1 <= jewels.length, stones.length <= 50',
      'jewels and stones consist of English letters.',
    ],
    sampleInput: 'jewels = "aA", stones = "aAAbbbb"',
    sampleOutput: '3',
    testCases: [
      { input: 'jewels = "aA", stones = "aAAbbbb"', expectedOutput: '3' },
      { input: 'jewels = "z", stones = "ZZ"', expectedOutput: '0' },
      { input: 'jewels = "b", stones = "bbb"', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Word Pattern',
    slug: 'word-pattern',
    description:
      'Given a pattern and a string s, return true if s follows the same pattern. Each letter in pattern must map to a word in s bijectively.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [{ input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' }],
    constraints: ['1 <= pattern.length <= 300', 's contains lowercase English letters and spaces.'],
    sampleInput: 'pattern = "abba", s = "dog cat cat dog"',
    sampleOutput: 'true',
    testCases: [
      { input: 'pattern = "abba", s = "dog cat cat dog"', expectedOutput: 'true' },
      { input: 'pattern = "abba", s = "dog cat cat fish"', expectedOutput: 'false' },
      { input: 'pattern = "aaaa", s = "dog cat cat dog"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Design HashSet',
    slug: 'design-hashset',
    description:
      'Design a HashSet without using built-in hash table libraries. Implement add, remove, and contains operations.',
    difficulty: 'EASY',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'MyHashSet(), add(1), add(2), contains(1), contains(3), add(2), contains(2), remove(2), contains(2)',
        output: '[null,null,null,true,false,null,true,null,false]',
      },
    ],
    constraints: [
      '0 <= key <= 10^6',
      'At most 10^4 calls will be made to add, remove, and contains.',
    ],
    sampleInput:
      'MyHashSet(), add(1), add(2), contains(1), contains(3), add(2), contains(2), remove(2), contains(2)',
    sampleOutput: '[null,null,null,true,false,null,true,null,false]',
    testCases: [
      {
        input:
          'MyHashSet(), add(1), add(2), contains(1), contains(3), add(2), contains(2), remove(2), contains(2)',
        expectedOutput: '[null,null,null,true,false,null,true,null,false]',
      },
      {
        input: 'MyHashSet(), add(100), contains(100), remove(100), contains(100)',
        expectedOutput: '[null,null,true,null,false]',
      },
      {
        input: 'MyHashSet(), add(5), add(5), contains(5)',
        expectedOutput: '[null,null,true]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    description:
      'Given an array of strings strs, group the anagrams together. Return the answer in any order.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
      },
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '1 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.',
    ],
    sampleInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
    sampleOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
    testCases: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
      },
      {
        input: 'strs = ["" ,"b"]',
        expectedOutput: '[[""],["b"]]',
      },
      { input: 'strs = ["a"]', expectedOutput: '[["a"]]', isHidden: true },
    ],
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    description:
      'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k is in the range [1, the number of unique elements]',
    ],
    sampleInput: 'nums = [1,1,1,2,2,3], k = 2',
    sampleOutput: '[1,2]',
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expectedOutput: '[1,2]' },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]' },
      { input: 'nums = [4,1,-1,2,-1,2,3], k = 2', expectedOutput: '[ -1,2 ]', isHidden: true },
    ],
  },
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    description:
      'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [{ input: 'nums = [100,4,200,1,3,2]', output: '4' }],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    sampleInput: 'nums = [100,4,200,1,3,2]',
    sampleOutput: '4',
    testCases: [
      { input: 'nums = [100,4,200,1,3,2]', expectedOutput: '4' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9' },
      { input: 'nums = []', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    description:
      'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [{ input: 'nums = [1,1,1], k = 2', output: '2' }],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    sampleInput: 'nums = [1,1,1], k = 2',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [1,1,1], k = 2', expectedOutput: '2' },
      { input: 'nums = [1,2,3], k = 3', expectedOutput: '2' },
      { input: 'nums = [1,-1,0], k = 0', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Find Duplicate Files in System',
    slug: 'find-duplicate-files-in-system',
    description:
      'Given a list of directory info, return all groups of duplicate files in the file system based on content.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]',
        output: '[["root/a/1.txt","root/c/3.txt"],["root/a/2.txt","root/c/d/4.txt","root/4.txt"]]',
      },
    ],
    constraints: ['1 <= paths.length <= 2 * 10^4', '1 <= paths[i].length <= 3000'],
    sampleInput:
      'paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]',
    sampleOutput:
      '[["root/a/1.txt","root/c/3.txt"],["root/a/2.txt","root/c/d/4.txt","root/4.txt"]]',
    testCases: [
      {
        input:
          'paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]',
        expectedOutput:
          '[["root/a/1.txt","root/c/3.txt"],["root/a/2.txt","root/c/d/4.txt","root/4.txt"]]',
      },
      {
        input: 'paths = ["root/a 1.txt(abcd)", "root/b 2.txt(efgh)", "root/c 3.txt(abcd)"]',
        expectedOutput: '[["root/a/1.txt","root/c/3.txt"]]',
      },
      { input: 'paths = ["root/a 1.txt(abc)"]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Top K Frequent Words',
    slug: 'top-k-frequent-words',
    description:
      'Given an array of strings words and an integer k, return the k most frequent strings. Return them in order of frequency with ties broken lexicographically.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [
      {
        input: 'words = ["i","love","leetcode","i","love","coding"], k = 2',
        output: '["i","love"]',
      },
    ],
    constraints: [
      '1 <= words.length <= 500',
      '1 <= words[i].length <= 10',
      'k is in the range [1, number of unique words]',
    ],
    sampleInput: 'words = ["i","love","leetcode","i","love","coding"], k = 2',
    sampleOutput: '["i","love"]',
    testCases: [
      {
        input: 'words = ["i","love","leetcode","i","love","coding"], k = 2',
        expectedOutput: '["i","love"]',
      },
      {
        input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4',
        expectedOutput: '["the","is","sunny","day"]',
      },
      { input: 'words = ["a"], k = 1', expectedOutput: '["a"]', isHidden: true },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description:
      'Given a string s, return the length of the longest substring without repeating characters.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3' },
      { input: 's = "bbbbb"', expectedOutput: '1' },
      { input: 's = "pwwkew"', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Find All Anagrams in a String',
    slug: 'find-all-anagrams-in-a-string',
    description:
      "Given two strings s and p, return the start indices of p's anagrams in s. You may return the answer in any order.",
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [{ input: 's = "cbaebabacd", p = "abc"', output: '[0,6]' }],
    constraints: [
      '1 <= s.length, p.length <= 3 * 10^4',
      's and p consist of lowercase English letters.',
    ],
    sampleInput: 's = "cbaebabacd", p = "abc"',
    sampleOutput: '[0,6]',
    testCases: [
      { input: 's = "cbaebabacd", p = "abc"', expectedOutput: '[0,6]' },
      { input: 's = "abab", p = "ab"', expectedOutput: '[0,1,2]' },
      { input: 's = "a", p = "ab"', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Valid Sudoku',
    slug: 'valid-sudoku',
    description:
      'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to Sudoku rules.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true',
      },
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit or ".".'],
    sampleInput:
      'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
    sampleOutput: 'true',
    testCases: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expectedOutput: 'true',
      },
      {
        input:
          'board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expectedOutput: 'false',
      },
      { input: 'board = [["."]]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Minimum Index Sum of Two Lists',
    slug: 'minimum-index-sum-of-two-lists',
    description:
      'Given two arrays of strings list1 and list2, return the common interest(s) with the least list index sum.',
    difficulty: 'MEDIUM',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]',
        output: '["Shogun"]',
      },
    ],
    constraints: [
      '1 <= list1.length, list2.length <= 1000',
      '1 <= list1[i].length, list2[i].length <= 30',
    ],
    sampleInput:
      'list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]',
    sampleOutput: '["Shogun"]',
    testCases: [
      {
        input:
          'list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]',
        expectedOutput: '["Shogun"]',
      },
      {
        input: 'list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]',
        expectedOutput: '["sad","happy"]',
      },
      { input: 'list1 = ["a"], list2 = ["b"]', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'LFU Cache',
    slug: 'lfu-cache',
    description:
      'Design and implement a data structure for a Least Frequently Used (LFU) cache. It should support get and put operations in O(1) time.',
    difficulty: 'HARD',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)',
        output: '[null,null,null,1,null,-1,3,null,-1,3,4]',
      },
    ],
    constraints: [
      '0 <= key, value <= 10^5',
      '1 <= capacity <= 10^4',
      'At most 10^5 calls will be made.',
    ],
    sampleInput:
      'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)',
    sampleOutput: '[null,null,null,1,null,-1,3,null,-1,3,4]',
    testCases: [
      {
        input:
          'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)',
        expectedOutput: '[null,null,null,1,null,-1,3,null,-1,3,4]',
      },
      {
        input: 'LFUCache(1), put(1,1), put(2,2), get(1), get(2)',
        expectedOutput: '[null,null,null,-1,2]',
      },
      {
        input: 'LFUCache(2), put(2,1), put(2,2), get(2)',
        expectedOutput: '[null,null,2]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'All O(1) Data Structure',
    slug: 'all-o1-data-structure',
    description:
      'Design a data structure that supports increment, decrement, getMaxKey, and getMinKey operations in O(1) time.',
    difficulty: 'HARD',
    topic: 'Hash Tables',
    examples: [
      {
        input:
          'AllOne(), inc("hello"), inc("hello"), getMaxKey(), getMinKey(), inc("leet"), getMaxKey(), getMinKey()',
        output: '[null,null,null,"hello","hello",null,"hello","leet"]',
      },
    ],
    constraints: [
      '1 <= key.length <= 10',
      'key consists of lowercase letters.',
      'At most 10^5 calls will be made.',
    ],
    sampleInput:
      'AllOne(), inc("hello"), inc("hello"), getMaxKey(), getMinKey(), inc("leet"), getMaxKey(), getMinKey()',
    sampleOutput: '[null,null,null,"hello","hello",null,"hello","leet"]',
    testCases: [
      {
        input:
          'AllOne(), inc("hello"), inc("hello"), getMaxKey(), getMinKey(), inc("leet"), getMaxKey(), getMinKey()',
        expectedOutput: '[null,null,null,"hello","hello",null,"hello","leet"]',
      },
      {
        input: 'AllOne(), inc("a"), inc("b"), inc("b"), dec("b"), getMaxKey(), getMinKey()',
        expectedOutput: '[null,null,null,null,"a","a"]',
      },
      {
        input: 'AllOne(), inc("a"), inc("a"), dec("a"), dec("a"), getMaxKey(), getMinKey()',
        expectedOutput: '[null,null,null,null,null,"",""]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    description:
      'Given two strings s and t, return the smallest substring of s that contains all the characters of t. If there is no such substring, return an empty string.',
    difficulty: 'HARD',
    topic: 'Hash Tables',
    examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: 'BANC' }],
    constraints: [
      '1 <= s.length, t.length <= 10^5',
      's and t consist of uppercase and lowercase English letters.',
    ],
    sampleInput: 's = "ADOBECODEBANC", t = "ABC"',
    sampleOutput: 'BANC',
    testCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: 'BANC' },
      { input: 's = "a", t = "aa"', expectedOutput: '' },
      { input: 's = "a", t = "a"', expectedOutput: 'a', isHidden: true },
    ],
  },
  {
    title: 'Word Pattern II',
    slug: 'word-pattern-ii',
    description:
      'Given a pattern and a string s, return true if s matches pattern. Each letter in the pattern can map to any non-empty substring of s, with a bijective mapping.',
    difficulty: 'HARD',
    topic: 'Hash Tables',
    examples: [{ input: 'pattern = "abab", s = "redblueredblue"', output: 'true' }],
    constraints: [
      '1 <= pattern.length <= 20',
      '1 <= s.length <= 50',
      'pattern contains lowercase letters.',
    ],
    sampleInput: 'pattern = "abab", s = "redblueredblue"',
    sampleOutput: 'true',
    testCases: [
      { input: 'pattern = "abab", s = "redblueredblue"', expectedOutput: 'true' },
      { input: 'pattern = "aaaa", s = "asdasdasdasd"', expectedOutput: 'true' },
      { input: 'pattern = "aabb", s = "xyzabcxzyabc"', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Find All Concatenated Words in a Dictionary',
    slug: 'find-all-concatenated-words-in-a-dictionary',
    description:
      'Given an array of words, return all the words that are formed by concatenating two or more shorter words from the list.',
    difficulty: 'HARD',
    topic: 'Hash Tables',
    examples: [
      {
        input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamus"]',
        output: '["catsdogcats","dogcatsdog"]',
      },
    ],
    constraints: [
      '1 <= words.length <= 10^4',
      '1 <= words[i].length <= 30',
      'words[i] consists of lowercase English letters.',
    ],
    sampleInput: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamus"]',
    sampleOutput: '["catsdogcats","dogcatsdog"]',
    testCases: [
      {
        input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamus"]',
        expectedOutput: '["catsdogcats","dogcatsdog"]',
      },
      {
        input: 'words = ["cat","dog","catdog"]',
        expectedOutput: '["catdog"]',
      },
      { input: 'words = ["a","aa","aaa"]', expectedOutput: '["aa","aaa"]', isHidden: true },
    ],
  },
];
