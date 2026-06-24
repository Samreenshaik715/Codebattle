import type { ProblemSeed } from '../seed.ts';

export const greedyProblems: ProblemSeed[] = [
  {
    title: 'Assign Cookies',
    slug: 'assign-cookies',
    description:
      'Given two arrays representing child greed factors and cookie sizes, assign cookies to maximize the number of content children.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'g = [1,2,3], s = [1,1]',
        output: '1',
      },
    ],
    constraints: ['1 <= g.length, s.length <= 10^4', '1 <= g[i], s[j] <= 10^5'],
    sampleInput: 'g = [1,2,3], s = [1,1]',
    sampleOutput: '1',
    testCases: [
      { input: 'g = [1,2,3], s = [1,1]', expectedOutput: '1' },
      { input: 'g = [1,2], s = [1,2,3]', expectedOutput: '2' },
      { input: 'g = [10,9,8], s = [5,6,7]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Lemonade Change',
    slug: 'lemonade-change',
    description:
      'Simulate a lemonade stand where each customer pays with a bill, and determine whether you can give correct change to every customer.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'bills = [5,5,5,10,20]',
        output: 'true',
      },
    ],
    constraints: ['1 <= bills.length <= 10^4', 'bills[i] is 5, 10, or 20'],
    sampleInput: 'bills = [5,5,5,10,20]',
    sampleOutput: 'true',
    testCases: [
      { input: 'bills = [5,5,5,10,20]', expectedOutput: 'true' },
      { input: 'bills = [5,5,10,10,20]', expectedOutput: 'false' },
      { input: 'bills = [5,5,10]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Maximum Units on a Truck',
    slug: 'maximum-units-on-a-truck',
    description:
      'Load boxes onto a truck to maximize total units, respecting the truck capacity and using the highest-unit boxes first.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4',
        output: '8',
      },
    ],
    constraints: [
      '1 <= boxTypes.length <= 1000',
      '1 <= boxTypes[i][0], boxTypes[i][1], truckSize <= 10^3',
    ],
    sampleInput: 'boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4',
    sampleOutput: '8',
    testCases: [
      { input: 'boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4', expectedOutput: '8' },
      { input: 'boxTypes = [[5,10]], truckSize = 3', expectedOutput: '30' },
      { input: 'boxTypes = [[1,5],[2,4]], truckSize = 2', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Minimum Cost to Move Chips',
    slug: 'minimum-cost-to-move-chips',
    description:
      'Given positions of chips on a number line, compute the minimum cost to move all chips to the same position using allowed moves.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'position = [1,2,3]',
        output: '1',
      },
    ],
    constraints: ['1 <= position.length <= 100', '1 <= position[i] <= 10^9'],
    sampleInput: 'position = [1,2,3]',
    sampleOutput: '1',
    testCases: [
      { input: 'position = [1,2,3]', expectedOutput: '1' },
      { input: 'position = [2,2,2,3,3]', expectedOutput: '0' },
      { input: 'position = [1,1000000000]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Can Place Flowers',
    slug: 'can-place-flowers',
    description:
      'Determine if n new flowers can be planted in a flowerbed without planting adjacent flowers.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'flowerbed = [1,0,0,0,1], n = 1',
        output: 'true',
      },
    ],
    constraints: [
      '1 <= flowerbed.length <= 10^4',
      'flowerbed[i] is 0 or 1',
      '0 <= n <= flowerbed.length',
    ],
    sampleInput: 'flowerbed = [1,0,0,0,1], n = 1',
    sampleOutput: 'true',
    testCases: [
      { input: 'flowerbed = [1,0,0,0,1], n = 1', expectedOutput: 'true' },
      { input: 'flowerbed = [1,0,0,0,1], n = 2', expectedOutput: 'false' },
      { input: 'flowerbed = [0,0,1,0,0], n = 2', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Largest Perimeter Triangle',
    slug: 'largest-perimeter-triangle',
    description:
      'Given side lengths, return the largest perimeter of a triangle that can be formed, or 0 if none can be formed.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'nums = [2,1,2]',
        output: '5',
      },
    ],
    constraints: ['3 <= nums.length <= 10^4', '1 <= nums[i] <= 10^6'],
    sampleInput: 'nums = [2,1,2]',
    sampleOutput: '5',
    testCases: [
      { input: 'nums = [2,1,2]', expectedOutput: '5' },
      { input: 'nums = [1,2,1]', expectedOutput: '0' },
      { input: 'nums = [3,2,3,4]', expectedOutput: '10', isHidden: true },
    ],
  },
  {
    title: 'Minimum Number of Coins',
    slug: 'minimum-number-of-coins',
    description:
      'Given coin denominations and a target amount, find the minimum number of coins required to make the amount assuming greedy coin selection is optimal for the given coin set.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'coins = [1,5,10,25], amount = 30',
        output: '2',
      },
    ],
    constraints: [
      '1 <= coins.length <= 100',
      '1 <= amount <= 10^4',
      'coins contain 1 and are sorted in ascending order',
    ],
    sampleInput: 'coins = [1,5,10,25], amount = 30',
    sampleOutput: '2',
    testCases: [
      { input: 'coins = [1,5,10,25], amount = 30', expectedOutput: '2' },
      { input: 'coins = [1,5,10], amount = 28', expectedOutput: '6' },
      { input: 'coins = [1,5,10,25], amount = 0', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Buy Two Chocolates',
    slug: 'buy-two-chocolates',
    description:
      'Given prices of chocolates and a budget, buy exactly two chocolates to maximize your spending without exceeding the budget.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'prices = [3,1,4,2], budget = 5',
        output: '5',
      },
    ],
    constraints: ['2 <= prices.length <= 10^4', '1 <= prices[i], budget <= 10^4'],
    sampleInput: 'prices = [3,1,4,2], budget = 5',
    sampleOutput: '5',
    testCases: [
      { input: 'prices = [3,1,4,2], budget = 5', expectedOutput: '5' },
      { input: 'prices = [1,1,1], budget = 1', expectedOutput: '0' },
      { input: 'prices = [2,3,4], budget = 5', expectedOutput: '5', isHidden: true },
    ],
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    description:
      'Given stock prices, determine the maximum profit from a single buy/sell transaction.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
      },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    sampleInput: 'prices = [7,1,5,3,6,4]',
    sampleOutput: '5',
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expectedOutput: '5' },
      { input: 'prices = [7,6,4,3,1]', expectedOutput: '0' },
      { input: 'prices = [1,2,3,4,5]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Fractional Knapsack (Easy)',
    slug: 'fractional-knapsack-easy',
    description:
      'Given weights and values, determine the maximum value that can be carried in a knapsack if fractional amounts of items are allowed.',
    difficulty: 'EASY',
    topic: 'Greedy',
    examples: [
      {
        input: 'capacity = 50, items = [[60,20],[100,50],[120,30]]',
        output: '240.0',
      },
    ],
    constraints: [
      '1 <= items.length <= 100',
      '1 <= capacity <= 10^4',
      '1 <= weights[i], values[i] <= 10^4',
    ],
    sampleInput: 'capacity = 50, items = [[60,20],[100,50],[120,30]]',
    sampleOutput: '240.0',
    testCases: [
      { input: 'capacity = 50, items = [[60,20],[100,50],[120,30]]', expectedOutput: '240.0' },
      { input: 'capacity = 10, items = [[100,30],[120,20]]', expectedOutput: '160.0' },
      { input: 'capacity = 5, items = [[20,5],[30,10]]', expectedOutput: '20.0', isHidden: true },
    ],
  },
  {
    title: 'Jump Game',
    slug: 'jump-game',
    description:
      'Given an array of non-negative integers representing jump lengths, determine whether you can reach the last index.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: 'true',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [2,3,1,1,4]',
    sampleOutput: 'true',
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expectedOutput: 'true' },
      { input: 'nums = [3,2,1,0,4]', expectedOutput: 'false' },
      { input: 'nums = [0]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Gas Station',
    slug: 'gas-station',
    description:
      'Find the starting gas station index from which you can travel around the circuit once without running out of gas.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
        output: '3',
      },
    ],
    constraints: [
      'gas.length == cost.length',
      '1 <= gas.length <= 10^5',
      '0 <= gas[i], cost[i] <= 10^4',
    ],
    sampleInput: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
    sampleOutput: '3',
    testCases: [
      { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', expectedOutput: '3' },
      { input: 'gas = [2,3,4], cost = [3,4,3]', expectedOutput: '-1' },
      { input: 'gas = [5,1,2,3,4], cost = [4,4,1,5,1]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Partition Labels',
    slug: 'partition-labels',
    description:
      'Partition a string into as many parts as possible so that each letter appears in at most one part.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 's = "ababcbacadefegdehijhklij"',
        output: '[9,7,8]',
      },
    ],
    constraints: ['1 <= s.length <= 500', 's contains only lowercase English letters'],
    sampleInput: 's = "ababcbacadefegdehijhklij"',
    sampleOutput: '[9,7,8]',
    testCases: [
      { input: 's = "ababcbacadefegdehijhklij"', expectedOutput: '[9,7,8]' },
      { input: 's = "eccbbbbdec"', expectedOutput: '[10]' },
      { input: 's = "abc"', expectedOutput: '[1,1,1]', isHidden: true },
    ],
  },
  {
    title: 'Queue Reconstruction by Height',
    slug: 'queue-reconstruction-by-height',
    description:
      'Reconstruct the queue by sorting people by height and insertion position to satisfy each person’s k-value constraint.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
        output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
      },
    ],
    constraints: ['1 <= people.length <= 2000', '0 <= ki < people.length'],
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
        input: 'people = [[9,0],[7,0],[1,9],[3,0],[2,7],[5,3],[6,0],[3,4],[6,2],[5,2]]',
        expectedOutput: '[[3,0],[6,0],[7,0],[5,2],[3,4],[5,3],[2,7],[6,2],[1,9],[9,0]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Non-overlapping Intervals',
    slug: 'non-overlapping-intervals',
    description:
      'Given intervals, find the minimum number to remove so that the remaining intervals do not overlap.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
        output: '1',
      },
    ],
    constraints: [
      '1 <= intervals.length <= 10^5',
      'intervals[i].length == 2',
      '-10^5 <= start < end <= 10^5',
    ],
    sampleInput: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
    sampleOutput: '1',
    testCases: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expectedOutput: '1' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', expectedOutput: '2' },
      { input: 'intervals = [[1,2],[2,3]]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Minimum Number of Arrows to Burst Balloons',
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    description:
      'Given balloon intervals, determine the minimum number of arrows required to burst them all.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'points = [[10,16],[2,8],[1,6],[7,12]]',
        output: '2',
      },
    ],
    constraints: ['1 <= points.length <= 10^5', '-10^9 <= start < end <= 10^9'],
    sampleInput: 'points = [[10,16],[2,8],[1,6],[7,12]]',
    sampleOutput: '2',
    testCases: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', expectedOutput: '2' },
      { input: 'points = [[1,2],[2,3],[3,4]]', expectedOutput: '3' },
      { input: 'points = [[1,10],[2,3],[3,4]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Reorganize String',
    slug: 'reorganize-string',
    description:
      'Rearrange a string so that no two adjacent characters are the same, or return an empty string if it is impossible.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
      },
    ],
    constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters'],
    sampleInput: 's = "aab"',
    sampleOutput: '"aba"',
    testCases: [
      { input: 's = "aab"', expectedOutput: '"aba"' },
      { input: 's = "aaab"', expectedOutput: '""' },
      { input: 's = "vvvlo"', expectedOutput: '"vlvov"', isHidden: true },
    ],
  },
  {
    title: 'Task Scheduler',
    slug: 'task-scheduler',
    description:
      'Given a list of tasks and a cooldown period, compute the minimum time needed to execute all tasks with idle intervals allowed.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: '8',
      },
    ],
    constraints: ['1 <= tasks.length <= 10^4', '0 <= n <= 100'],
    sampleInput: 'tasks = ["A","A","A","B","B","B"], n = 2',
    sampleOutput: '8',
    testCases: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', expectedOutput: '8' },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', expectedOutput: '6' },
      {
        input: 'tasks = ["A","A","A","A","B","B","B","B"], n = 3',
        expectedOutput: '16',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Boats to Save People',
    slug: 'boats-to-save-people',
    description:
      'Given the weights of people and a boat limit, return the minimum number of boats needed if each boat can carry at most two people.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'people = [3,2,2,1], limit = 3',
        output: '3',
      },
    ],
    constraints: ['1 <= people.length <= 5 * 10^4', '1 <= people[i] <= limit <= 3 * 10^4'],
    sampleInput: 'people = [3,2,2,1], limit = 3',
    sampleOutput: '3',
    testCases: [
      { input: 'people = [3,2,2,1], limit = 3', expectedOutput: '3' },
      { input: 'people = [3,5,3,4], limit = 5', expectedOutput: '4' },
      { input: 'people = [1,1,1], limit = 2', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Wiggle Subsequence',
    slug: 'wiggle-subsequence',
    description: 'Return the length of the longest wiggle subsequence in an integer array.',
    difficulty: 'MEDIUM',
    topic: 'Greedy',
    examples: [
      {
        input: 'nums = [1,7,4,9,2,5]',
        output: '6',
      },
    ],
    constraints: ['1 <= nums.length <= 1000', '-1000 <= nums[i] <= 1000'],
    sampleInput: 'nums = [1,7,4,9,2,5]',
    sampleOutput: '6',
    testCases: [
      { input: 'nums = [1,7,4,9,2,5]', expectedOutput: '6' },
      { input: 'nums = [1,4,7,2,5]', expectedOutput: '4' },
      { input: 'nums = [1,1,1,1]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Jump Game II',
    slug: 'jump-game-ii',
    description:
      'Given an array of jump lengths, return the minimum number of jumps required to reach the last index.',
    difficulty: 'HARD',
    topic: 'Greedy',
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: '2',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    sampleInput: 'nums = [2,3,1,1,4]',
    sampleOutput: '2',
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expectedOutput: '2' },
      { input: 'nums = [2,3,0,1,4]', expectedOutput: '2' },
      { input: 'nums = [0]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Candy',
    slug: 'candy',
    description:
      'Distribute candies to children so that each child has at least one candy and children with a higher rating get more candies than their immediate neighbors. Return the minimum candies required.',
    difficulty: 'HARD',
    topic: 'Greedy',
    examples: [
      {
        input: 'ratings = [1,0,2]',
        output: '5',
      },
    ],
    constraints: ['1 <= ratings.length <= 10^5', '0 <= ratings[i] <= 10^5'],
    sampleInput: 'ratings = [1,0,2]',
    sampleOutput: '5',
    testCases: [
      { input: 'ratings = [1,0,2]', expectedOutput: '5' },
      { input: 'ratings = [1,2,2]', expectedOutput: '4' },
      { input: 'ratings = [1,3,4,5,2]', expectedOutput: '11', isHidden: true },
    ],
  },
  {
    title: 'Minimum Refueling Stops',
    slug: 'minimum-refueling-stops',
    description:
      'Given a target distance and gas stations, compute the minimum number of refueling stops needed to reach the target.',
    difficulty: 'HARD',
    topic: 'Greedy',
    examples: [
      {
        input: 'target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]',
        output: '2',
      },
    ],
    constraints: [
      '1 <= target, startFuel <= 10^9',
      '0 <= stations.length <= 500',
      '0 <= stations[i][0] < target',
      '1 <= stations[i][1] <= 10^9',
    ],
    sampleInput: 'target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]',
    sampleOutput: '2',
    testCases: [
      {
        input: 'target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]',
        expectedOutput: '2',
      },
      { input: 'target = 100, startFuel = 50, stations = [[25,25],[50,25]]', expectedOutput: '1' },
      {
        input: 'target = 100, startFuel = 1, stations = [[10,100]]',
        expectedOutput: '-1',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Course Schedule III',
    slug: 'course-schedule-iii',
    description:
      'Given course durations and deadlines, find the maximum number of courses that can be taken before their deadlines.',
    difficulty: 'HARD',
    topic: 'Greedy',
    examples: [
      {
        input: 'courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]',
        output: '3',
      },
    ],
    constraints: ['1 <= courses.length <= 10^4', '1 <= duration, lastDay <= 10^4'],
    sampleInput: 'courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]',
    sampleOutput: '3',
    testCases: [
      { input: 'courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]', expectedOutput: '3' },
      { input: 'courses = [[5,5],[4,6],[2,6]]', expectedOutput: '2' },
      {
        input: 'courses = [[7,17],[3,12],[10,20],[9,10],[5,20],[4,20]]',
        expectedOutput: '4',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Advanced Greedy Scheduling Problem',
    slug: 'advanced-greedy-scheduling-problem',
    description:
      'Given tasks with deadlines, durations, and profit weights, select the largest profitable subset that can complete before all deadlines.',
    difficulty: 'HARD',
    topic: 'Greedy',
    examples: [
      {
        input: 'tasks = [[3,4,20],[1,1,10],[2,2,15]], deadline = 5',
        output: '45',
      },
    ],
    constraints: [
      '1 <= tasks.length <= 100',
      'tasks[i].length == 3',
      '1 <= duration, deadline, profit <= 10^4',
    ],
    sampleInput: 'tasks = [[3,4,20],[1,1,10],[2,2,15]], deadline = 5',
    sampleOutput: '45',
    testCases: [
      { input: 'tasks = [[3,4,20],[1,1,10],[2,2,15]], deadline = 5', expectedOutput: '45' },
      { input: 'tasks = [[2,2,20],[1,2,10],[1,3,15]], deadline = 4', expectedOutput: '35' },
      {
        input: 'tasks = [[4,4,50],[4,5,60],[1,2,10]], deadline = 5',
        expectedOutput: '60',
        isHidden: true,
      },
    ],
  },
];
