import type { ProblemSeed } from '../seed.ts';

export const graphProblems: ProblemSeed[] = [
  {
    title: 'Find if Path Exists in Graph',
    slug: 'find-if-path-exists-in-graph',
    description:
      'Given n nodes labeled from 0 to n - 1 and a list of undirected edges, determine if there is a path between the source and destination nodes.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2',
        output: 'true',
      },
    ],
    constraints: ['1 <= n <= 2 * 10^5', '0 <= edges.length <= 2 * 10^5', 'edges[i].length == 2'],
    sampleInput: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2',
    sampleOutput: 'true',
    testCases: [
      {
        input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2',
        expectedOutput: 'true',
      },
      {
        input: 'n = 6, edges = [[0,1],[0,2],[3,4],[2,5]], source = 0, destination = 5',
        expectedOutput: 'true',
      },
      {
        input: 'n = 6, edges = [[0,1],[0,2],[3,4],[2,5]], source = 0, destination = 4',
        expectedOutput: 'false',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Number of Connected Components in an Undirected Graph',
    slug: 'number-of-connected-components-in-an-undirected-graph',
    description:
      'Given n nodes and a list of undirected edges, return the number of connected components in the graph.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
        output: '2',
      },
    ],
    constraints: ['1 <= n <= 10^5', '0 <= edges.length <= 2 * 10^5', 'edges[i].length == 2'],
    sampleInput: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
    sampleOutput: '2',
    testCases: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', expectedOutput: '2' },
      { input: 'n = 4, edges = [[0,1],[2,3]]', expectedOutput: '2' },
      { input: 'n = 4, edges = [[0,1],[1,2],[2,3]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Find the Town Judge',
    slug: 'find-the-town-judge',
    description:
      'In a town, the judge trusts nobody and everyone else trusts the judge. Given trust relationships, find the judge if they exist.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 3, trust = [[1,3],[2,3]]',
        output: '3',
      },
    ],
    constraints: ['1 <= n <= 1000', '0 <= trust.length <= 10^4', 'trust[i].length == 2'],
    sampleInput: 'n = 3, trust = [[1,3],[2,3]]',
    sampleOutput: '3',
    testCases: [
      { input: 'n = 3, trust = [[1,3],[2,3]]', expectedOutput: '3' },
      { input: 'n = 3, trust = [[1,3],[2,3],[3,1]]', expectedOutput: '-1' },
      {
        input: 'n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]',
        expectedOutput: '3',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Flood Fill',
    slug: 'flood-fill',
    description:
      'Perform a flood fill on an image represented by a 2D grid of colors, replacing the starting pixel and all connected pixels of the same color with a new color.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2',
        output: '[[2,2,2],[2,2,0],[2,0,1]]',
      },
    ],
    constraints: ['1 <= m, n <= 50', '0 <= image[i][j], newColor <= 65535'],
    sampleInput: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2',
    sampleOutput: '[[2,2,2],[2,2,0],[2,0,1]]',
    testCases: [
      {
        input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2',
        expectedOutput: '[[2,2,2],[2,2,2]]',
      },
      {
        input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2',
        expectedOutput: '[[2,2,2],[2,2,0],[2,0,1]]',
      },
      {
        input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 1, newColor = 1',
        expectedOutput: '[[0,0,0],[0,0,0]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Number of Provinces',
    slug: 'number-of-provinces',
    description:
      'Given an adjacency matrix representing connections between cities, return the number of connected provinces.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]',
        output: '2',
      },
    ],
    constraints: [
      '1 <= n <= 200',
      'isConnected[i][i] == 1',
      'isConnected[i][j] == isConnected[j][i]',
    ],
    sampleInput: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]',
    sampleOutput: '2',
    testCases: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', expectedOutput: '3' },
      { input: 'isConnected = [[1,1,0],[1,1,1],[0,1,1]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'DFS Traversal',
    slug: 'dfs-traversal',
    description:
      'Given a graph represented as an adjacency list and a starting vertex, return the list of nodes visited by a depth-first search.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0',
        output: '[0,1,3,2]',
      },
    ],
    constraints: ['1 <= graph.length <= 1000', '0 <= graph[i][j] < graph.length'],
    sampleInput: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0',
    sampleOutput: '[0,1,3,2]',
    testCases: [
      { input: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0', expectedOutput: '[0,1,3,2]' },
      { input: 'graph = [[1],[0,2],[1]], start = 1', expectedOutput: '[1,0,2]' },
      { input: 'graph = [[1,2],[0],[0]], start = 0', expectedOutput: '[0,1,2]', isHidden: true },
    ],
  },
  {
    title: 'BFS Traversal',
    slug: 'bfs-traversal',
    description:
      'Given a graph represented as an adjacency list and a starting vertex, return the nodes visited in breadth-first order.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0',
        output: '[0,1,2,3]',
      },
    ],
    constraints: ['1 <= graph.length <= 1000', '0 <= graph[i][j] < graph.length'],
    sampleInput: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0',
    sampleOutput: '[0,1,2,3]',
    testCases: [
      { input: 'graph = [[1,2],[0,3],[0,3],[1,2]], start = 0', expectedOutput: '[0,1,2,3]' },
      { input: 'graph = [[1],[0,2],[1]], start = 1', expectedOutput: '[1,0,2]' },
      {
        input: 'graph = [[2,3],[2],[0,1,3],[0,2]], start = 0',
        expectedOutput: '[0,2,3,1]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Employee Importance',
    slug: 'employee-importance',
    description:
      'Given a list of employees, each with an id, importance value, and list of direct subordinates, return the total importance value of an employee and all their subordinates.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1',
        output: '11',
      },
    ],
    constraints: [
      '1 <= employees.length <= 2000',
      '1 <= importance <= 1000',
      '0 <= subordinates.length < employees.length',
    ],
    sampleInput: 'employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1',
    sampleOutput: '11',
    testCases: [
      { input: 'employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1', expectedOutput: '11' },
      { input: 'employees = [[1,5,[2]],[2,3,[]]], id = 2', expectedOutput: '3' },
      {
        input: 'employees = [[1,5,[2,3,4]],[2,3,[]],[3,4,[]],[4,1,[]]], id = 1',
        expectedOutput: '13',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Find Center of Star Graph',
    slug: 'find-center-of-star-graph',
    description:
      'Given edges of a star graph, return the center node of the graph. The center is the node connected to all other nodes.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'edges = [[1,2],[2,3],[4,2]]',
        output: '2',
      },
    ],
    constraints: ['3 <= edges.length + 1 <= 10^5', 'edges[i].length == 2'],
    sampleInput: 'edges = [[1,2],[2,3],[4,2]]',
    sampleOutput: '2',
    testCases: [
      { input: 'edges = [[1,2],[2,3],[4,2]]', expectedOutput: '2' },
      { input: 'edges = [[1,3],[2,3],[4,3]]', expectedOutput: '3' },
      { input: 'edges = [[1,2],[2,3],[2,4],[2,5]]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Island Perimeter',
    slug: 'island-perimeter',
    description:
      'Given a grid where 1 represents land and 0 represents water, return the perimeter of the island. The grid contains exactly one island and no lakes.',
    difficulty: 'EASY',
    topic: 'Graphs',
    examples: [
      {
        input: 'grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]',
        output: '16',
      },
    ],
    constraints: ['1 <= grid.length, grid[i].length <= 100', 'grid[i][j] is 0 or 1'],
    sampleInput: 'grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]',
    sampleOutput: '16',
    testCases: [
      { input: 'grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]', expectedOutput: '16' },
      { input: 'grid = [[1]]', expectedOutput: '4' },
      { input: 'grid = [[1,0]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    description:
      'Given a grid of 0s and 1s where 1 represents land and 0 represents water, return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]',
        output: '1',
      },
    ],
    constraints: ['1 <= grid.length, grid[i].length <= 300', 'grid[i][j] is 0 or 1'],
    sampleInput: 'grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]',
    sampleOutput: '1',
    testCases: [
      { input: 'grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]', expectedOutput: '1' },
      { input: 'grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]', expectedOutput: '3' },
      {
        input: 'grid = [[1,0,1,1,0],[1,0,1,0,0],[1,0,1,0,1],[0,0,0,0,1]]',
        expectedOutput: '3',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    description:
      'Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: '[[2,4],[1,3],[2,4],[1,3]]',
      },
    ],
    constraints: ['1 <= node.val <= 100', 'The number of nodes is in the range [1, 100].'],
    sampleInput: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
    sampleOutput: '[[2,4],[1,3],[2,4],[1,3]]',
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: 'adjList = [[]]', expectedOutput: '[[]]' },
      {
        input: 'adjList = [[2],[1,3],[2,4],[3]]',
        expectedOutput: '[[2],[1,3],[2,4],[3]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    description:
      'There are numCourses you must take, labeled from 0 to numCourses-1. Given prerequisites, determine if you can finish all courses.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
      },
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
    ],
    sampleInput: 'numCourses = 2, prerequisites = [[1,0]]',
    sampleOutput: 'true',
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expectedOutput: 'false' },
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        expectedOutput: 'true',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    description:
      'Given an m x n matrix of heights, return coordinates where water can flow to both the Pacific and Atlantic oceans.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
        output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
      },
    ],
    constraints: ['1 <= m, n <= 150', '0 <= heights[i][j] <= 10^5'],
    sampleInput: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
    sampleOutput: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
    testCases: [
      {
        input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
        expectedOutput: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
      },
      { input: 'heights = [[2,1],[1,2]]', expectedOutput: '[[0,0],[0,1],[1,0],[1,1]]' },
      {
        input: 'heights = [[3,3,3],[3,1,3],[3,3,3]]',
        expectedOutput: '[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Rotting Oranges',
    slug: 'rotting-oranges',
    description:
      'Given a grid representing fresh and rotten oranges, return the minimum number of minutes until no cell has a fresh orange. Return -1 if this is impossible.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
        output: '4',
      },
    ],
    constraints: ['1 <= grid.length, grid[i].length <= 10', 'grid[i][j] is 0, 1, or 2'],
    sampleInput: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
    sampleOutput: '4',
    testCases: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expectedOutput: '-1' },
      { input: 'grid = [[0,2]]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Surrounded Regions',
    slug: 'surrounded-regions',
    description:
      'Capture all regions surrounded by X in a 2D board by flipping surrounded O regions to X. O regions connected to the border remain unchanged.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
      },
    ],
    constraints: ['1 <= board.length, board[i].length <= 200', 'board[i][j] is X or O'],
    sampleInput:
      'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
    sampleOutput: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
    testCases: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        expectedOutput: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
      },
      { input: 'board = [["X"]]', expectedOutput: '[["X"]]' },
      {
        input: 'board = [["X","O","X"],["O","X","O"],["X","O","X"]]',
        expectedOutput: '[["X","O","X"],["O","X","O"],["X","O","X"]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Network Delay Time',
    slug: 'network-delay-time',
    description:
      'There are n network nodes, and times[i] describes the travel time from node u to node v. Return the time it takes for all nodes to receive the signal sent from node k, or -1 if impossible.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
        output: '2',
      },
    ],
    constraints: ['1 <= n <= 100', '1 <= times.length <= 6000', 'times[i].length == 3'],
    sampleInput: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
    sampleOutput: '2',
    testCases: [
      { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', expectedOutput: '2' },
      { input: 'times = [[1,2,1]], n = 2, k = 1', expectedOutput: '1' },
      { input: 'times = [[1,2,1]], n = 2, k = 2', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Minimum Height Trees',
    slug: 'minimum-height-trees',
    description:
      'Given n nodes and an undirected tree edge list, return all possible roots that produce the minimum height trees.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 4, edges = [[1,0],[1,2],[1,3]]',
        output: '[1]',
      },
    ],
    constraints: ['1 <= n <= 2 * 10^4', 'edges.length == n - 1'],
    sampleInput: 'n = 4, edges = [[1,0],[1,2],[1,3]]',
    sampleOutput: '[1]',
    testCases: [
      { input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', expectedOutput: '[1]' },
      { input: 'n = 6, edges = [[0,3],[1,3],[2,3],[4,3],[5,4]]', expectedOutput: '[3,4]' },
      { input: 'n = 1, edges = []', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Graph Valid Tree',
    slug: 'graph-valid-tree',
    description:
      'Given n nodes and a list of undirected edges, determine if these edges form a valid tree.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
        output: 'true',
      },
    ],
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'edges[i].length == 2'],
    sampleInput: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
    sampleOutput: 'true',
    testCases: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', expectedOutput: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', expectedOutput: 'false' },
      { input: 'n = 1, edges = []', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Word Ladder',
    slug: 'word-ladder',
    description:
      'Given beginWord, endWord, and a word list, return the length of the shortest transformation sequence from beginWord to endWord, or 0 if none exists.',
    difficulty: 'MEDIUM',
    topic: 'Graphs',
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
      },
    ],
    constraints: [
      '1 <= beginWord.length <= 10',
      '1 <= wordList.length <= 5000',
      'wordList[i].length == beginWord.length',
    ],
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
        input: 'beginWord = "a", endWord = "c", wordList = ["a","b","c"]',
        expectedOutput: '0',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Alien Dictionary',
    slug: 'alien-dictionary',
    description:
      'Given a sorted list of words in an alien language, derive the order of the letters in that language. Return an empty string if the order is invalid.',
    difficulty: 'HARD',
    topic: 'Graphs',
    examples: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        output: 'wertf',
      },
    ],
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100'],
    sampleInput: 'words = ["wrt","wrf","er","ett","rftt"]',
    sampleOutput: 'wertf',
    testCases: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', expectedOutput: 'wertf' },
      { input: 'words = ["z","x"]', expectedOutput: 'zx' },
      { input: 'words = ["abc","ab"]', expectedOutput: '', isHidden: true },
    ],
  },
  {
    title: 'Reconstruct Itinerary',
    slug: 'reconstruct-itinerary',
    description:
      'Given a list of airline tickets represented by pairs of departure and arrival airports, reconstruct the itinerary in lexicographically smallest order.',
    difficulty: 'HARD',
    topic: 'Graphs',
    examples: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        output: '["JFK","MUC","LHR","SFO","SJC"]',
      },
    ],
    constraints: ['1 <= tickets.length <= 300', 'tickets[i].length == 2'],
    sampleInput: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
    sampleOutput: '["JFK","MUC","LHR","SFO","SJC"]',
    testCases: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        expectedOutput: '["JFK","MUC","LHR","SFO","SJC"]',
      },
      {
        input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
        expectedOutput: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
      },
      {
        input: 'tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]',
        expectedOutput: '["JFK","NRT","JFK","KUL"]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Critical Connections in a Network',
    slug: 'critical-connections-in-a-network',
    description:
      'Given an undirected network of n servers and connections, return all critical connections that, if removed, will make some server unable to reach some other server.',
    difficulty: 'HARD',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]',
        output: '[[1,3]]',
      },
    ],
    constraints: ['2 <= n <= 10^5', 'connections.length == n - 1'],
    sampleInput: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]',
    sampleOutput: '[[1,3]]',
    testCases: [
      { input: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]', expectedOutput: '[[1,3]]' },
      { input: 'n = 2, connections = [[0,1]]', expectedOutput: '[[0,1]]' },
      {
        input: 'n = 5, connections = [[0,1],[1,2],[2,3],[3,4]]',
        expectedOutput: '[[3,4],[2,3],[1,2],[0,1]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Shortest Path Visiting All Nodes',
    slug: 'shortest-path-visiting-all-nodes',
    description:
      'Given an undirected, connected graph, return the length of the shortest path that visits every node at least once.',
    difficulty: 'HARD',
    topic: 'Graphs',
    examples: [
      {
        input: 'graph = [[1,2,3],[0],[0],[0]]',
        output: '4',
      },
    ],
    constraints: ['1 <= graph.length <= 12', '0 <= graph[i][j] < graph.length'],
    sampleInput: 'graph = [[1,2,3],[0],[0],[0]]',
    sampleOutput: '4',
    testCases: [
      { input: 'graph = [[1,2,3],[0],[0],[0]]', expectedOutput: '4' },
      { input: 'graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]', expectedOutput: '4' },
      { input: 'graph = [[1],[0,2,3,4],[1],[1],[1]]', expectedOutput: '4', isHidden: true },
    ],
  },
  {
    title: 'Graph Coloring with Constraints',
    slug: 'graph-coloring-with-constraints',
    description:
      'Given an undirected graph and a number of colors, determine whether you can assign a color to each node such that no adjacent nodes share the same color.',
    difficulty: 'HARD',
    topic: 'Graphs',
    examples: [
      {
        input: 'n = 4, edges = [[0,1],[1,2],[2,3],[3,0]], colors = 3',
        output: 'true',
      },
    ],
    constraints: ['1 <= n <= 50', '0 <= edges.length <= n*(n-1)/2', '1 <= colors <= n'],
    sampleInput: 'n = 4, edges = [[0,1],[1,2],[2,3],[3,0]], colors = 3',
    sampleOutput: 'true',
    testCases: [
      { input: 'n = 4, edges = [[0,1],[1,2],[2,3],[3,0]], colors = 3', expectedOutput: 'true' },
      { input: 'n = 3, edges = [[0,1],[1,2],[2,0]], colors = 3', expectedOutput: 'true' },
      {
        input: 'n = 3, edges = [[0,1],[1,2],[2,0]], colors = 2',
        expectedOutput: 'false',
        isHidden: true,
      },
    ],
  },
];
