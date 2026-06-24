import type { ProblemSeed } from '../seed.ts';

export const queuesProblems: ProblemSeed[] = [
  {
    title: 'Implement Queue using Stacks',
    slug: 'implement-queue-using-stacks',
    description: 'Implement a FIFO queue using only two stacks.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'push(1), push(2), peek(), pop(), empty()', output: '[1,1,false]' }],
    constraints: ['1 <= x <= 10^9', 'At most 100 calls will be made.'],
    sampleInput: 'push(1), push(2), peek(), pop(), empty()',
    sampleOutput: '[1,1,false]',
    testCases: [
      { input: 'push(1), push(2), peek(), pop(), empty()', expectedOutput: '[1,1,false]' },
      { input: 'push(5), push(6), pop(), peek()', expectedOutput: '[5,6]' },
      { input: 'empty()', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Design Circular Queue',
    slug: 'design-circular-queue',
    description:
      'Design a circular queue with fixed capacity supporting enqueue, dequeue, front, rear, and empty/full checks.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [
      {
        input: 'MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), deQueue(), Front()',
        output: '[true,true,true,true,2]',
      },
    ],
    constraints: ['1 <= k <= 1000', 'At most 1000 calls will be made.'],
    sampleInput: 'MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), deQueue(), Front()',
    sampleOutput: '[true,true,true,true,2]',
    testCases: [
      {
        input: 'MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), deQueue(), Front()',
        expectedOutput: '[true,true,true,true,2]',
      },
      {
        input: 'MyCircularQueue(2), enQueue(2), enQueue(3), deQueue(), enQueue(4), Rear()',
        expectedOutput: '[true,true,true,true,4]',
      },
      {
        input: 'MyCircularQueue(1), enQueue(1), enQueue(2)',
        expectedOutput: '[true,false]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Number of Recent Calls',
    slug: 'number-of-recent-calls',
    description:
      'Implement a recent counter that counts the number of requests in the past 3000 milliseconds.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'Pings(1), Pings(100), Pings(3001), Pings(3002)', output: '[1,2,3,3]' }],
    constraints: ['1 <= t <= 10^9', 'At most 10^4 calls will be made.'],
    sampleInput: 'Pings(1), Pings(100), Pings(3001), Pings(3002)',
    sampleOutput: '[1,2,3,3]',
    testCases: [
      { input: 'Pings(1), Pings(100), Pings(3001), Pings(3002)', expectedOutput: '[1,2,3,3]' },
      { input: 'Pings(3000), Pings(6000)', expectedOutput: '[1,1]' },
      { input: 'Pings(1), Pings(3000), Pings(3001)', expectedOutput: '[1,2,3]', isHidden: true },
    ],
  },
  {
    title: 'Moving Average from Data Stream',
    slug: 'moving-average-from-data-stream',
    description: 'Calculate the moving average of values in a sliding window stream.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [
      {
        input: 'MovingAverage(3), next(1), next(10), next(3), next(5)',
        output: '[null,1.0,5.5,4.666666666666667,6.0]',
      },
    ],
    constraints: ['1 <= size <= 1000', '-10^5 <= val <= 10^5'],
    sampleInput: 'MovingAverage(3), next(1), next(10), next(3), next(5)',
    sampleOutput: '[null,1.0,5.5,4.666666666666667,6.0]',
    testCases: [
      {
        input: 'MovingAverage(3), next(1), next(10), next(3), next(5)',
        expectedOutput: '[null,1.0,5.5,4.666666666666667,6.0]',
      },
      { input: 'MovingAverage(1), next(10), next(-1)', expectedOutput: '[null,10.0,-1.0]' },
      {
        input: 'MovingAverage(2), next(5), next(7)',
        expectedOutput: '[null,5.0,6.0]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Design Hit Counter',
    slug: 'design-hit-counter',
    description: 'Implement a hit counter that counts hits received in the past 5 minutes.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [
      {
        input: 'HitCounter(), hit(1), hit(2), hit(300), getHits(300), getHits(301)',
        output: '[null,null,null,null,3,2]',
      },
    ],
    constraints: ['1 <= timestamp <= 10^9', 'Timestamps are monotonically increasing.'],
    sampleInput: 'HitCounter(), hit(1), hit(2), hit(300), getHits(300), getHits(301)',
    sampleOutput: '[null,null,null,null,3,2]',
    testCases: [
      {
        input: 'HitCounter(), hit(1), hit(2), hit(300), getHits(300), getHits(301)',
        expectedOutput: '[null,null,null,null,3,2]',
      },
      {
        input: 'HitCounter(), hit(1), hit(301), getHits(301)',
        expectedOutput: '[null,null,null,1]',
      },
      {
        input: 'HitCounter(), hit(1), hit(100), getHits(400)',
        expectedOutput: '[null,null,1]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    description: 'Return the level order traversal of a binary tree as a list of levels.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
    ],
    constraints: ['The number of nodes is in the range [0, 2000].'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '[[3],[9,20],[15,7]]',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', expectedOutput: '[[1]]' },
      { input: 'root = []', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Symmetric Tree',
    slug: 'symmetric-tree',
    description: 'Determine whether a binary tree is symmetric around its center.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'root = [1,2,2,3,4,4,3]', output: 'true' }],
    constraints: ['The number of nodes is in the range [1, 1000].'],
    sampleInput: 'root = [1,2,2,3,4,4,3]',
    sampleOutput: 'true',
    testCases: [
      { input: 'root = [1,2,2,3,4,4,3]', expectedOutput: 'true' },
      { input: 'root = [1,2,2,null,3,null,3]', expectedOutput: 'false' },
      { input: 'root = [1,2,2,2,null,2]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Minimum Depth of Binary Tree',
    slug: 'minimum-depth-of-binary-tree',
    description:
      'Find the minimum depth of a binary tree. The minimum depth is the shortest path from the root node down to the nearest leaf node.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '2' }],
    constraints: ['The number of nodes is in the range [0, 10^5].'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '2',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '2' },
      { input: 'root = [2,null,3,null,4,null,5,null,6]', expectedOutput: '5' },
      { input: 'root = []', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Average of Levels in Binary Tree',
    slug: 'average-of-levels-in-binary-tree',
    description: 'Return the average value of the nodes on each level of a binary tree.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '[3,14.5,11]' }],
    constraints: ['The number of nodes is in the range [1, 10^4].'],
    sampleInput: 'root = [3,9,20,null,null,15,7]',
    sampleOutput: '[3,14.5,11]',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[3,14.5,11]' },
      { input: 'root = [3,7,5,6,2,null,null,9,null,4]', expectedOutput: '[3,6,6,9,4]' },
      { input: 'root = [1]', expectedOutput: '[1]', isHidden: true },
    ],
  },
  {
    title: 'Binary Tree Right Side View',
    slug: 'binary-tree-right-side-view',
    description: 'Return the values of the nodes visible from the right side of a binary tree.',
    difficulty: 'EASY',
    topic: 'Queues',
    examples: [{ input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' }],
    constraints: ['The number of nodes is in the range [0, 100].'],
    sampleInput: 'root = [1,2,3,null,5,null,4]',
    sampleOutput: '[1,3,4]',
    testCases: [
      { input: 'root = [1,2,3,null,5,null,4]', expectedOutput: '[1,3,4]' },
      { input: 'root = [1,null,3]', expectedOutput: '[1,3]' },
      { input: 'root = []', expectedOutput: '[]', isHidden: true },
    ],
  },
  {
    title: 'Implement Stack using Queues',
    slug: 'implement-stack-using-queues',
    description: 'Implement a LIFO stack using only two queues.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [{ input: 'push(1), push(2), top(), pop(), empty()', output: '[2,2,false]' }],
    constraints: ['1 <= x <= 10^9', 'At most 100 calls will be made.'],
    sampleInput: 'push(1), push(2), top(), pop(), empty()',
    sampleOutput: '[2,2,false]',
    testCases: [
      { input: 'push(1), push(2), top(), pop(), empty()', expectedOutput: '[2,2,false]' },
      { input: 'push(3), push(4), pop(), top()', expectedOutput: '[4,3]' },
      { input: 'empty()', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Design Circular Deque',
    slug: 'design-circular-deque',
    description:
      'Design a circular deque with fixed capacity supporting insertions, deletions, front, rear, and empty/full checks.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      {
        input:
          'MyCircularDeque(3), insertLast(1), insertLast(2), insertFront(3), insertFront(4), getRear(), isFull()',
        output: '[null,true,true,true,false,2,true]',
      },
    ],
    constraints: ['1 <= k <= 1000', 'At most 1000 calls will be made.'],
    sampleInput:
      'MyCircularDeque(3), insertLast(1), insertLast(2), insertFront(3), insertFront(4), getRear(), isFull()',
    sampleOutput: '[null,true,true,true,false,2,true]',
    testCases: [
      {
        input:
          'MyCircularDeque(3), insertLast(1), insertLast(2), insertFront(3), insertFront(4), getRear(), isFull()',
        expectedOutput: '[null,true,true,true,false,2,true]',
      },
      {
        input:
          'MyCircularDeque(2), insertFront(1), insertLast(2), insertFront(3), getFront(), getRear()',
        expectedOutput: '[null,true,true,false,1,2]',
      },
      {
        input: 'MyCircularDeque(1), insertLast(1), deleteFront(), isEmpty()',
        expectedOutput: '[null,true,true,true]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Open the Lock',
    slug: 'open-the-lock',
    description:
      'Find the minimum number of moves to open a lock using a 4-digit wheel configuration and deadends.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      { input: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"', output: '6' },
    ],
    constraints: ['1 <= deadends.length <= 500', 'target.length == 4'],
    sampleInput: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"',
    sampleOutput: '6',
    testCases: [
      {
        input: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"',
        expectedOutput: '6',
      },
      { input: 'deadends = ["8888"], target = "0009"', expectedOutput: '1' },
      { input: 'deadends = ["0000"], target = "8888"', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Walls and Gates',
    slug: 'walls-and-gates',
    description: 'Fill each empty room with the distance to its nearest gate using BFS on a grid.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      {
        input:
          'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]',
        output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]',
      },
    ],
    constraints: ['m == rooms.length', '1 <= m, n <= 250'],
    sampleInput:
      'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]',
    sampleOutput: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]',
    testCases: [
      {
        input:
          'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]',
        expectedOutput: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]',
      },
      { input: 'rooms = [[0]]', expectedOutput: '[[0]]' },
      { input: 'rooms = [[2147483647]]', expectedOutput: '[[2147483647]]', isHidden: true },
    ],
  },
  {
    title: 'Perfect Squares',
    slug: 'perfect-squares',
    description:
      'Return the least number of perfect square numbers that sum to n, using BFS on perfect square sums.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [{ input: 'n = 12', output: '3' }],
    constraints: ['1 <= n <= 10^4'],
    sampleInput: 'n = 12',
    sampleOutput: '3',
    testCases: [
      { input: 'n = 12', expectedOutput: '3' },
      { input: 'n = 13', expectedOutput: '2' },
      { input: 'n = 1', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    description:
      'Determine if all courses can be finished given prerequisites using topological sorting.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' }],
    constraints: ['1 <= numCourses <= 10^5', '0 <= prerequisites.length <= 10^5'],
    sampleInput: 'numCourses = 2, prerequisites = [[1,0]]',
    sampleOutput: 'true',
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expectedOutput: 'false' },
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]',
        expectedOutput: 'true',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Word Ladder',
    slug: 'word-ladder',
    description:
      'Given a begin word, end word, and a word list, return the length of the shortest transformation sequence using one-letter changes.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
      },
    ],
    constraints: ['1 <= wordList.length <= 5000', 'All words are the same length.'],
    sampleInput:
      'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
    sampleOutput: '5',
    testCases: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        expectedOutput: '5',
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        expectedOutput: '0',
      },
      {
        input:
          'beginWord = "red", endWord = "tax", wordList = ["ted","tex","red","tax","tad","den","rex","pee"]',
        expectedOutput: '4',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Update Matrix',
    slug: 'update-matrix',
    description:
      'Given a binary matrix, return a matrix where each cell contains the distance to the nearest 0.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      {
        input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]',
        output: '[[0,0,0],[0,1,0],[1,2,1]]',
      },
    ],
    constraints: ['m == mat.length', '1 <= m, n <= 100'],
    sampleInput: 'mat = [[0,0,0],[0,1,0],[1,1,1]]',
    sampleOutput: '[[0,0,0],[0,1,0],[1,2,1]]',
    testCases: [
      { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', expectedOutput: '[[0,0,0],[0,1,0],[1,2,1]]' },
      { input: 'mat = [[0,1,1],[1,1,1],[1,1,0]]', expectedOutput: '[[0,1,2],[1,2,1],[1,1,0]]' },
      { input: 'mat = [[0]]', expectedOutput: '[[0]]', isHidden: true },
    ],
  },
  {
    title: 'Shortest Path in a Binary Matrix',
    slug: 'shortest-path-in-binary-matrix',
    description:
      'Find the length of the shortest path from the top-left to the bottom-right corner in a binary matrix, moving in 8 directions.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [{ input: 'grid = [[0,1],[1,0]]', output: '2' }],
    constraints: ['n == grid.length', '1 <= n <= 100', 'grid[i][j] is 0 or 1'],
    sampleInput: 'grid = [[0,1],[1,0]]',
    sampleOutput: '2',
    testCases: [
      { input: 'grid = [[0,1],[1,0]]', expectedOutput: '2' },
      { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', expectedOutput: '4' },
      { input: 'grid = [[1]]', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    description:
      'Return a valid ordering of courses given prerequisites, or an empty list if no ordering exists.',
    difficulty: 'MEDIUM',
    topic: 'Queues',
    examples: [
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]' },
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
    sampleInput: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
    sampleOutput: '[0,1,2,3]',
    testCases: [
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        expectedOutput: '[0,1,2,3]',
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        expectedOutput: '[]',
      },
      {
        input: 'numCourses = 3, prerequisites = [[1,0],[2,0],[1,2]]',
        expectedOutput: '[0,2,1]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    description:
      'Given an array and a sliding window size k, return the maximum value in each window as it moves from left to right.',
    difficulty: 'HARD',
    topic: 'Queues',
    examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    sampleInput: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
    sampleOutput: '[3,3,5,5,6,7]',
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expectedOutput: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]' },
      { input: 'nums = [9,11], k = 2', expectedOutput: '[11]', isHidden: true },
    ],
  },
  {
    title: 'Word Ladder II',
    slug: 'word-ladder-ii',
    description:
      'Return all shortest transformation sequences from begin word to end word using one-letter changes and a valid dictionary.',
    difficulty: 'HARD',
    topic: 'Queues',
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
      },
    ],
    constraints: ['1 <= wordList.length <= 5000', 'All words have the same length.'],
    sampleInput:
      'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
    sampleOutput: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
    testCases: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        expectedOutput: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        expectedOutput: '[]',
      },
      {
        input:
          'beginWord = "red", endWord = "tax", wordList = ["ted","tex","red","tax","tad","den","rex","pee"]',
        expectedOutput: '[["red","ted","tex","tax"],["red","tad","tax"]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'The Maze II',
    slug: 'the-maze-ii',
    description:
      'Find the shortest distance for a ball to stop at the destination in a maze, where it rolls until hitting a wall.',
    difficulty: 'HARD',
    topic: 'Queues',
    examples: [
      {
        input:
          'maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]',
        output: '12',
      },
    ],
    constraints: ['1 <= m, n <= 100', 'maze[i][j] is 0 or 1.'],
    sampleInput:
      'maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]',
    sampleOutput: '12',
    testCases: [
      {
        input:
          'maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]',
        expectedOutput: '12',
      },
      {
        input:
          'maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]',
        expectedOutput: '-1',
      },
      {
        input:
          'maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]',
        expectedOutput: '16',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Swim in Rising Water',
    slug: 'swim-in-rising-water',
    description:
      'Find the minimum time required to swim from the top-left to the bottom-right of a rising water grid.',
    difficulty: 'HARD',
    topic: 'Queues',
    examples: [{ input: 'grid = [[0,2],[1,3]]', output: '3' }],
    constraints: ['n == grid.length', '1 <= n <= 50', '0 <= grid[i][j] < n^2'],
    sampleInput: 'grid = [[0,2],[1,3]]',
    sampleOutput: '3',
    testCases: [
      { input: 'grid = [[0,2],[1,3]]', expectedOutput: '3' },
      {
        input:
          'grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]',
        expectedOutput: '16',
      },
      { input: 'grid = [[0]]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Sliding Window Median',
    slug: 'sliding-window-median',
    description: 'Compute the median of every sliding window of size k in an array.',
    difficulty: 'HARD',
    topic: 'Queues',
    examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[1,-1,-1,3,5,6]' }],
    constraints: ['1 <= nums.length <= 10^5', '-10^5 <= nums[i] <= 10^5', '1 <= k <= nums.length'],
    sampleInput: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
    sampleOutput: '[1,-1,-1,3,5,6]',
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expectedOutput: '[1,-1,-1,3,5,6]' },
      { input: 'nums = [1,4,2,3], k = 4', expectedOutput: '[2.5]' },
      { input: 'nums = [7,0,3,9,9,9,1], k = 2', expectedOutput: '[3,1.5,6,9,9,5]', isHidden: true },
    ],
  },
];
