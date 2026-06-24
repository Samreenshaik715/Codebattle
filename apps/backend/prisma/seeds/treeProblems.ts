import type { ProblemSeed } from '../seed.ts';

export const treeProblems: ProblemSeed[] = [
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    description:
      'Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3',
        explanation: 'The longest path is 3 -> 20 -> 15 or 3 -> 20 -> 7.',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '3',
    testCases: [
      { input: 'root = [1,null,2]', expectedOutput: '2' },
      { input: 'root = []', expectedOutput: '0' },
      { input: 'root = [0,1,2,3,null,null,4]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    description:
      'Invert a binary tree and return its root. Inversion swaps the left and right children of every node in the tree.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]',
        explanation: 'The left and right children of every node are swapped.',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 100].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [4,2,7,1,3,6,9]',
    sampleOutput: '[4,7,2,9,6,3,1]',
    testCases: [
      { input: 'root = [2,1,3]', expectedOutput: '[2,3,1]' },
      { input: 'root = []', expectedOutput: '[]' },
      { input: 'root = [1,2]', expectedOutput: '[1,null,2]', isHidden: true },
    ],
  },
  {
    title: 'Same Tree',
    slug: 'same-tree',
    description:
      'Given the roots of two binary trees, determine if the two trees are structurally identical and the nodes have the same values.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'p = [1,2,3], q = [1,2,3]',
        output: 'true',
        explanation: 'Both trees are identical in structure and values.',
      },
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4',
    ],
    sampleInput: 'p = [1,2,3], q = [1,2,3]',
    sampleOutput: 'true',
    testCases: [
      { input: 'p = [1,2], q = [1,null,2]', expectedOutput: 'false' },
      { input: 'p = [1,2,1], q = [1,1,2]', expectedOutput: 'false' },
      { input: 'p = [], q = []', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Symmetric Tree',
    slug: 'symmetric-tree',
    description:
      'Given a binary tree, check whether it is a mirror of itself (symmetric around its center).',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,2,3,4,4,3]',
        output: 'true',
        explanation: 'The tree is symmetric around its root.',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 1000].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [1,2,2,3,4,4,3]',
    sampleOutput: 'true',
    testCases: [
      { input: 'root = [1,2,2,null,3,null,3]', expectedOutput: 'false' },
      { input: 'root = [1,2,2,3,4,4,3]', expectedOutput: 'true' },
      { input: 'root = [1,2,2,2,null,2]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Path Sum',
    slug: 'path-sum',
    description:
      'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
        output: 'true',
      },
    ],
    constraints: [
      'The number of nodes is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000',
    ],
    sampleInput: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
    sampleOutput: 'true',
    testCases: [
      { input: 'root = [1,2,3], targetSum = 5', expectedOutput: 'false' },
      { input: 'root = [1,2], targetSum = 0', expectedOutput: 'false' },
      { input: 'root = [1,2,3], targetSum = 3', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Balanced Binary Tree',
    slug: 'balanced-binary-tree',
    description:
      'Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than one.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: 'true',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 5000].', '-10^4 <= Node.val <= 10^4'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: 'true',
    testCases: [
      { input: 'root = [1,2,2,3,3,null,null,4,4]', expectedOutput: 'false' },
      { input: 'root = []', expectedOutput: 'true' },
      {
        input: 'root = [1,2,2,3,null,null,3,4,null,null,4]',
        expectedOutput: 'false',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Minimum Depth of Binary Tree',
    slug: 'minimum-depth-of-binary-tree',
    description:
      'Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '2',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 10^5].', '-1000 <= Node.val <= 1000'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '2',
    testCases: [
      { input: 'root = [2,null,3,null,4,null,5,null,6]', expectedOutput: '5' },
      { input: 'root = []', expectedOutput: '0' },
      { input: 'root = [1,2]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Count Complete Tree Nodes',
    slug: 'count-complete-tree-nodes',
    description:
      'Given the root of a complete binary tree, return the number of the nodes in the tree.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,3,4,5,6]',
        output: '6',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5 * 10^4].',
      'The tree is complete.',
    ],
    sampleInput: 'root = [1,2,3,4,5,6]',
    sampleOutput: '6',
    testCases: [
      { input: 'root = []', expectedOutput: '0' },
      { input: 'root = [1,2,3,4,5,6,7]', expectedOutput: '7' },
      { input: 'root = [1,2,3,4,5,6]', expectedOutput: '6', isHidden: true },
    ],
  },
  {
    title: 'Search in a Binary Search Tree',
    slug: 'search-in-a-binary-search-tree',
    description:
      'Given the root of a binary search tree and a value val, return the subtree rooted with the node whose value equals val. If such a node does not exist, return null.',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [4,2,7,1,3], val = 2',
        output: '[2,1,3]',
      },
    ],
    constraints: [
      'The number of nodes is in the range [1, 5000].',
      '1 <= Node.val <= 10^7',
      'All values are unique.',
    ],
    sampleInput: 'root = [4,2,7,1,3], val = 2',
    sampleOutput: '[2,1,3]',
    testCases: [
      { input: 'root = [4,2,7,1,3], val = 5', expectedOutput: '[]' },
      { input: 'root = [4,2,7,1,3], val = 4', expectedOutput: '[4,2,7,1,3]' },
      { input: 'root = [4,2,7,1,3], val = 3', expectedOutput: '[3]', isHidden: true },
    ],
  },
  {
    title: 'Range Sum of BST',
    slug: 'range-sum-of-bst',
    description:
      'Given the root of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].',
    difficulty: 'EASY',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [10,5,15,3,7,null,18], low = 7, high = 15',
        output: '32',
      },
    ],
    constraints: [
      'The number of nodes is in the range [1, 2 * 10^4].',
      '1 <= Node.val <= 10^5',
      'All Node.val are unique.',
    ],
    sampleInput: 'root = [10,5,15,3,7,null,18], low = 7, high = 15',
    sampleOutput: '32',
    testCases: [
      { input: 'root = [10,5,15,3,7,null,18], low = 6, high = 10', expectedOutput: '23' },
      { input: 'root = [1,0,2], low = 1, high = 2', expectedOutput: '3' },
      {
        input: 'root = [10,5,15,3,7,13,18], low = 6, high = 10',
        expectedOutput: '23',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    description:
      'Given the root of a binary tree, return the level order traversal of its nodes values. (i.e., from left to right, level by level).',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '[[3],[9,20],[15,7]]',
    testCases: [
      { input: 'root = [1]', expectedOutput: '[[1]]' },
      { input: 'root = []', expectedOutput: '[]' },
      { input: 'root = [1,2,3,4,5,null,7]', expectedOutput: '[[1],[2,3],[4,5,7]]', isHidden: true },
    ],
  },
  {
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true',
      },
    ],
    constraints: [
      'The number of nodes is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1',
    ],
    sampleInput: 'root = [2,1,3]',
    sampleOutput: 'true',
    testCases: [
      { input: 'root = [5,1,4,null,null,3,6]', expectedOutput: 'false' },
      { input: 'root = [2,1,3]', expectedOutput: 'true' },
      { input: 'root = [10,5,15,null,null,6,20]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Lowest Common Ancestor of a Binary Tree',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    description:
      'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        output: '3',
      },
    ],
    constraints: ['The number of nodes is in the range [2, 10^4].', '-10^9 <= Node.val <= 10^9'],
    sampleInput: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
    sampleOutput: '3',
    testCases: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', expectedOutput: '5' },
      { input: 'root = [1,2], p = 1, q = 2', expectedOutput: '1' },
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 7, q = 4',
        expectedOutput: '2',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Kth Smallest Element in a BST',
    slug: 'kth-smallest-element-in-a-bst',
    description:
      'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,1,4,null,2], k = 1',
        output: '1',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 10^4].', '1 <= k <= number of nodes'],
    sampleInput: 'root = [3,1,4,null,2], k = 1',
    sampleOutput: '1',
    testCases: [
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', expectedOutput: '3' },
      { input: 'root = [1], k = 1', expectedOutput: '1' },
      { input: 'root = [2,1,3], k = 2', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Binary Tree Right Side View',
    slug: 'binary-tree-right-side-view',
    description:
      'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,3,null,5,null,4]',
        output: '[1,3,4]',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 100].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [1,2,3,null,5,null,4]',
    sampleOutput: '[1,3,4]',
    testCases: [
      { input: 'root = [1,null,3]', expectedOutput: '[1,3]' },
      { input: 'root = []', expectedOutput: '[]' },
      { input: 'root = [1,2,3,4,5,null,4]', expectedOutput: '[1,3,4]', isHidden: true },
    ],
  },
  {
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    description:
      'Given preorder and inorder traversal of a binary tree, construct and return the binary tree.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        output: '[3,9,20,null,null,15,7]',
      },
    ],
    constraints: [
      '1 <= preorder.length <= 3000',
      'preorder.length == inorder.length',
      'preorder and inorder consist of unique values.',
    ],
    sampleInput: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
    sampleOutput: '[3,9,20,null,null,15,7]',
    testCases: [
      { input: 'preorder = [1,2], inorder = [2,1]', expectedOutput: '[1,2]' },
      { input: 'preorder = [1], inorder = [1]', expectedOutput: '[1]' },
      {
        input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        expectedOutput: '[3,9,20,null,null,15,7]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Binary Tree Zigzag Level Order Traversal',
    slug: 'binary-tree-zigzag-level-order-traversal',
    description:
      'Given the root of a binary tree, return the zigzag level order traversal of its nodes values. (i.e., the first level is left to right, the next level is right to left, and alternate.)',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[20,9],[15,7]]',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 2000].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '[[3],[20,9],[15,7]]',
    testCases: [
      { input: 'root = [1]', expectedOutput: '[[1]]' },
      { input: 'root = [1,2,3,4,null,null,5]', expectedOutput: '[[1],[3,2],[4,5]]' },
      { input: 'root = [3,9,20,15,7]', expectedOutput: '[[3],[20,9],[15,7]]', isHidden: true },
    ],
  },
  {
    title: 'Sum Root to Leaf Numbers',
    slug: 'sum-root-to-leaf-numbers',
    description:
      'Given a binary tree containing digits from 0 to 9 only, each root-to-leaf path represents a number. Return the total sum of all root-to-leaf numbers.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '25',
        explanation: 'The numbers are 12 and 13.',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 1000].', '0 <= Node.val <= 9'],
    sampleInput: 'root = [1,2,3]',
    sampleOutput: '25',
    testCases: [
      { input: 'root = [4,9,0,5,1]', expectedOutput: '1026' },
      { input: 'root = [1,0,1]', expectedOutput: '101' },
      { input: 'root = [1,2,3,4,5,null,6]', expectedOutput: '281', isHidden: true },
    ],
  },
  {
    title: 'House Robber III',
    slug: 'house-robber-iii',
    description:
      'The thief has found himself a new place for robbing. Each house is a node in a binary tree. If two directly-linked houses are robbed on the same night, the police will be alerted. Return the maximum amount of money the thief can rob without alerting the police.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,2,3,null,3,null,1]',
        output: '7',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 10^4].', '0 <= Node.val <= 10^4'],
    sampleInput: 'root = [3,2,3,null,3,null,1]',
    sampleOutput: '7',
    testCases: [
      { input: 'root = [3,4,5,1,3,null,1]', expectedOutput: '9' },
      { input: 'root = [3,2,3,null,3,null,1]', expectedOutput: '7' },
      { input: 'root = [4,1,null,2,null,3]', expectedOutput: '7', isHidden: true },
    ],
  },
  {
    title: 'Delete Node in a BST',
    slug: 'delete-node-in-a-bst',
    description:
      'Given a root node reference of a binary search tree and a key, delete the node with the given key in the BST. Return the root node of the modified tree.',
    difficulty: 'MEDIUM',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [5,3,6,2,4,null,7], key = 3',
        output: '[5,4,6,2,null,null,7]',
      },
    ],
    constraints: [
      'The number of nodes is in the range [0, 10^4].',
      'Each node has a unique value.',
    ],
    sampleInput: 'root = [5,3,6,2,4,null,7], key = 3',
    sampleOutput: '[5,4,6,2,null,null,7]',
    testCases: [
      { input: 'root = [5,3,6,2,4,null,7], key = 0', expectedOutput: '[5,3,6,2,4,null,7]' },
      { input: 'root = [5,3,6,2,4,null,7], key = 3', expectedOutput: '[5,4,6,2,null,null,7]' },
      {
        input: 'root = [5,3,6,2,4,null,7], key = 5',
        expectedOutput: '[4,3,6,2,null,null,7]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Serialize and Deserialize Binary Tree',
    slug: 'serialize-and-deserialize-binary-tree',
    description:
      'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work, but it must be able to serialize and deserialize a tree to the same structure.',
    difficulty: 'HARD',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,3,null,null,4,5]',
        output: '[1,2,3,null,null,4,5]',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 10^4].', '-1000 <= Node.val <= 1000'],
    sampleInput: 'root = [1,2,3,null,null,4,5]',
    sampleOutput: '[1,2,3,null,null,4,5]',
    testCases: [
      { input: 'root = [1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' },
      { input: 'root = []', expectedOutput: '[]' },
      { input: 'root = [1,2]', expectedOutput: '[1,2]', isHidden: true },
    ],
  },
  {
    title: 'Recover Binary Search Tree',
    slug: 'recover-binary-search-tree',
    description:
      'Two elements of a binary search tree are swapped by mistake. Recover the tree without changing its structure.',
    difficulty: 'HARD',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,3,null,null,2]',
        output: '[3,1,null,null,2]',
      },
    ],
    constraints: [
      'The number of nodes is in the range [2, 1000].',
      '-2^31 <= Node.val <= 2^31 - 1',
    ],
    sampleInput: 'root = [1,3,null,null,2]',
    sampleOutput: '[3,1,null,null,2]',
    testCases: [
      { input: 'root = [3,1,4,null,null,2]', expectedOutput: '[2,1,4,null,null,3]' },
      { input: 'root = [1,3,null,null,2]', expectedOutput: '[3,1,null,null,2]' },
      { input: 'root = [2,1,4,3]', expectedOutput: '[2,3,4,1]', isHidden: true },
    ],
  },
  {
    title: 'Binary Tree Maximum Path Sum',
    slug: 'binary-tree-maximum-path-sum',
    description:
      'Given a non-empty binary tree, find the maximum path sum. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections.',
    difficulty: 'HARD',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '6',
      },
    ],
    constraints: [
      'The number of nodes is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000',
    ],
    sampleInput: 'root = [1,2,3]',
    sampleOutput: '6',
    testCases: [
      { input: 'root = [-10,9,20,null,null,15,7]', expectedOutput: '42' },
      { input: 'root = [2,-1]', expectedOutput: '2' },
      { input: 'root = [-3]', expectedOutput: '-3', isHidden: true },
    ],
  },
  {
    title: 'Vertical Order Traversal of a Binary Tree',
    slug: 'vertical-order-traversal-of-a-binary-tree',
    description:
      'Given a binary tree, return the vertical order traversal of its nodes values. Nodes with the same position should be ordered from left to right and top to bottom.',
    difficulty: 'HARD',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[9],[3,15],[20],[7]]',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 1000].', '-1000 <= Node.val <= 1000'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '[[9],[3,15],[20],[7]]',
    testCases: [
      { input: 'root = [1,2,3,4,5,6,7]', expectedOutput: '[[4],[2],[1,5,6],[3],[7]]' },
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[9],[3,15],[20],[7]]' },
      {
        input: 'root = [1,2,3,4,6,5,7]',
        expectedOutput: '[[4],[2],[1,5],[3],[7]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Binary Tree Cameras',
    slug: 'binary-tree-cameras',
    description:
      'Given a binary tree, place cameras on the nodes so that every node is monitored. Return the minimum number of cameras needed. A camera at a node can monitor its parent, itself, and its immediate children.',
    difficulty: 'HARD',
    topic: 'Trees',
    examples: [
      {
        input: 'root = [0,0,null,0,0]',
        output: '1',
      },
    ],
    constraints: ['The number of nodes is in the range [1, 1000].', 'Node.val is 0 or 1.'],
    sampleInput: 'root = [0,0,null,0,0]',
    sampleOutput: '1',
    testCases: [
      { input: 'root = [0,0,null,0,0]', expectedOutput: '1' },
      { input: 'root = [0,0,0,null,0,null,0]', expectedOutput: '2' },
      { input: 'root = [0]', expectedOutput: '1', isHidden: true },
    ],
  },
];
