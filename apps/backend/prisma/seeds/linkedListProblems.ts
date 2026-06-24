import type { ProblemSeed } from '../seed.ts';

export const linkedListProblems: ProblemSeed[] = [
  // Easy - 10 problems
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'The list is reversed in place.',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000]',
      '-5000 <= Node.val <= 5000',
    ],
    sampleInput: 'head = [1,2,3,4,5]',
    sampleOutput: '[5,4,3,2,1]',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expectedOutput: '[2,1]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // TODO: Implement reverse linked list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // TODO: Implement reverse linked list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # TODO: Implement reverse linked list
        pass`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var reverseList = function(head) {
    // TODO: Implement reverse linked list
    return null;
};`,
    },
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    description: 'Merge two sorted linked lists and return it as a new sorted list.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'The two lists are merged into one sorted list.',
      },
    ],
    constraints: [
      'The number of nodes in each list is in the range [0, 50]',
      '-100 <= Node.val <= 100',
    ],
    sampleInput: 'list1 = [1,2,4], list2 = [1,3,4]',
    sampleOutput: '[1,1,2,3,4,4]',
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', expectedOutput: '[]', isHidden: true },
      { input: 'list1 = [0], list2 = []', expectedOutput: '[0]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // TODO: Merge two sorted linked lists
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // TODO: Merge two sorted linked lists
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:
        # TODO: Merge two sorted linked lists
        pass`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var mergeTwoLists = function(list1, list2) {
    // TODO: Merge two sorted linked lists
    return null;
};`,
    },
  },
  {
    title: 'Palindrome Linked List',
    slug: 'palindrome-linked-list',
    description:
      'Given the head of a singly linked list, return true if it is a palindrome or false otherwise.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,2,1]',
        output: 'true',
        explanation: 'The list reads the same forwards and backwards.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 10^5]',
      '0 <= Node.val <= 9',
    ],
    sampleInput: 'head = [1,2,2,1]',
    sampleOutput: 'true',
    testCases: [
      { input: 'head = [1,2,2,1]', expectedOutput: 'true' },
      { input: 'head = [1,2]', expectedOutput: 'false', isHidden: true },
      { input: 'head = [1]', expectedOutput: 'true', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    bool isPalindrome(ListNode* head) {
        // TODO: Check if linked list is palindrome
        return false;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public boolean isPalindrome(ListNode head) {
        // TODO: Check if linked list is palindrome
        return false;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        # TODO: Check if linked list is palindrome
        return False`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var isPalindrome = function(head) {
    // TODO: Check if linked list is palindrome
    return false;
};`,
    },
  },
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    description:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation:
          'There is a cycle in the linked list, where tail connects to the node at index 1.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 10^4]',
      '-10^5 <= Node.val <= 10^5',
    ],
    sampleInput: 'head = [3,2,0,-4], pos = 1',
    sampleOutput: 'true',
    testCases: [
      { input: 'head = [3,2,0,-4], pos = 1', expectedOutput: 'true' },
      { input: 'head = [1,2], pos = 0', expectedOutput: 'true', isHidden: true },
      { input: 'head = [1], pos = -1', expectedOutput: 'false', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
        // TODO: Detect cycle in linked list
        return false;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int x) { this.val = x; }
}

class Solution {
    public boolean hasCycle(ListNode head) {
        // TODO: Detect cycle in linked list
        return false;
    }
}`,
      python: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        # TODO: Detect cycle in linked list
        return False`,
      javascript: `function ListNode(val) {
    this.val = val;
    this.next = null;
}

var hasCycle = function(head) {
    // TODO: Detect cycle in linked list
    return false;
};`,
    },
  },
  {
    title: 'Remove Nth Node From End of List',
    slug: 'remove-nth-node-from-end',
    description:
      'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5], n = 2',
        output: '[1,2,3,5]',
        explanation: 'The second node from the end is removed.',
      },
    ],
    constraints: [
      'The number of nodes in the list is sz',
      '1 <= sz <= 30',
      '0 <= Node.val <= 100',
      '1 <= n <= sz',
    ],
    sampleInput: 'head = [1,2,3,4,5], n = 2',
    sampleOutput: '[1,2,3,5]',
    testCases: [
      { input: 'head = [1,2,3,4,5], n = 2', expectedOutput: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', expectedOutput: '[]', isHidden: true },
      { input: 'head = [1,2], n = 1', expectedOutput: '[1]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // TODO: Remove nth node from end of list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // TODO: Remove nth node from end of list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # TODO: Remove nth node from end of list
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var removeNthFromEnd = function(head, n) {
    // TODO: Remove nth node from end of list
    return null;
};`,
    },
  },
  {
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    description:
      'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.',
      },
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100]',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros',
    ],
    sampleInput: 'l1 = [2,4,3], l2 = [5,6,4]',
    sampleOutput: '[7,0,8]',
    testCases: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', expectedOutput: '[7,0,8]' },
      { input: 'l1 = [0], l2 = [0]', expectedOutput: '[0]', isHidden: true },
      {
        input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
        expectedOutput: '[8,9,9,9,0,0,0,1]',
        isHidden: true,
      },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // TODO: Add two numbers represented as linked lists
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // TODO: Add two numbers represented as linked lists
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # TODO: Add two numbers represented as linked lists
        pass`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var addTwoNumbers = function(l1, l2) {
    // TODO: Add two numbers represented as linked lists
    return null;
};`,
    },
  },
  {
    title: 'Delete Node in a Linked List',
    slug: 'delete-node-in-linked-list',
    description:
      'There is a singly-linked list head and we want to delete a node node in it. You are given the node to be deleted node.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [4,5,1,9], node = 5',
        output: '[4,1,9]',
        explanation: 'You are given the second node with value 5.',
      },
    ],
    constraints: [
      'The number of the nodes in the given list is in the range [2, 1000]',
      '-1000 <= Node.val <= 1000',
    ],
    sampleInput: 'head = [4,5,1,9], node = 5',
    sampleOutput: '[4,1,9]',
    testCases: [
      { input: 'head = [4,5,1,9], node = 5', expectedOutput: '[4,1,9]' },
      { input: 'head = [1,2,3,4], node = 3', expectedOutput: '[1,2,4]', isHidden: true },
      { input: 'head = [0,1], node = 0', expectedOutput: '[1]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    void deleteNode(ListNode* node) {
        // TODO: Delete the given node from the linked list
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public void deleteNode(ListNode node) {
        // TODO: Delete the given node from the linked list
    }
}`,
      python: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def deleteNode(self, node):
        # TODO: Delete the given node from the linked list
        pass`,
      javascript: `function ListNode(val) {
    this.val = val;
    this.next = null;
}

var deleteNode = function(node) {
    // TODO: Delete the given node from the linked list
};`,
    },
  },
  {
    title: 'Intersection of Two Linked Lists',
    slug: 'intersection-of-two-linked-lists',
    description:
      'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]',
        output: '8',
        explanation: 'The two lists intersect at node with value 8.',
      },
    ],
    constraints: ['1 <= m, n <= 3 * 10^4', '1 <= Node.val <= 10^5'],
    sampleInput: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]',
    sampleOutput: '8',
    testCases: [
      {
        input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]',
        expectedOutput: '8',
      },
      {
        input: 'intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]',
        expectedOutput: '2',
        isHidden: true,
      },
      {
        input: 'intersectVal = 0, listA = [1,2,3], listB = [4,5,6]',
        expectedOutput: 'null',
        isHidden: true,
      },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // TODO: Find intersection of two linked lists
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // TODO: Find intersection of two linked lists
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        # TODO: Find intersection of two linked lists
        return None`,
      javascript: `function ListNode(val) {
    this.val = val;
    this.next = null;
}

var getIntersectionNode = function(headA, headB) {
    // TODO: Find intersection of two linked lists
    return null;
};`,
    },
  },
  {
    title: 'Odd Even Linked List',
    slug: 'odd-even-linked-list',
    description:
      'Given the head of a singly linked list, group all nodes with odd indices together followed by the nodes with even indices.',
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[1,3,5,2,4]',
        explanation: 'Nodes at odd indices are first, then nodes at even indices.',
      },
    ],
    constraints: [
      'The number of nodes in the linked list is in the range [0, 10^4]',
      '-10^6 <= Node.val <= 10^6',
    ],
    sampleInput: 'head = [1,2,3,4,5]',
    sampleOutput: '[1,3,5,2,4]',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[1,3,5,2,4]' },
      { input: 'head = [2,1,3,5,6,4,7]', expectedOutput: '[2,3,6,7,1,5,4]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        // TODO: Reorder list with odd indices first, then even indices
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode oddEvenList(ListNode head) {
        // TODO: Reorder list with odd indices first, then even indices
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def oddEvenList(self, head: ListNode) -> ListNode:
        # TODO: Reorder list with odd indices first, then even indices
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var oddEvenList = function(head) {
    // TODO: Reorder list with odd indices first, then even indices
    return null;
};`,
    },
  },
  {
    title: 'Swap Nodes in Pairs',
    slug: 'swap-nodes-in-pairs',
    description:
      "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes.",
    difficulty: 'EASY',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4]',
        output: '[2,1,4,3]',
        explanation: 'Every two adjacent nodes are swapped.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 100]',
      '0 <= Node.val <= 100',
    ],
    sampleInput: 'head = [1,2,3,4]',
    sampleOutput: '[2,1,4,3]',
    testCases: [
      { input: 'head = [1,2,3,4]', expectedOutput: '[2,1,4,3]' },
      { input: 'head = [1,2,3]', expectedOutput: '[2,1,3]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        // TODO: Swap every two adjacent nodes in the linked list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode swapPairs(ListNode head) {
        // TODO: Swap every two adjacent nodes in the linked list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        # TODO: Swap every two adjacent nodes in the linked list
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var swapPairs = function(head) {
    // TODO: Swap every two adjacent nodes in the linked list
    return null;
};`,
    },
  },

  // Medium - 10 problems
  {
    title: 'Linked List Cycle II',
    slug: 'linked-list-cycle-ii',
    description:
      'Given a linked list, return the node where the cycle begins. If there is no cycle, return null.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'tail connects to node index 1',
        explanation: 'There is a cycle in the linked list, where tail connects to the second node.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 10^4]',
      '-10^5 <= Node.val <= 10^5',
    ],
    sampleInput: 'head = [3,2,0,-4], pos = 1',
    sampleOutput: 'node with value 2',
    testCases: [
      { input: 'head = [3,2,0,-4], pos = 1', expectedOutput: 'node with value 2' },
      { input: 'head = [1,2], pos = 0', expectedOutput: 'node with value 1', isHidden: true },
      { input: 'head = [1], pos = -1', expectedOutput: 'null', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        // TODO: Detect the start of the cycle in linked list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int x) { this.val = x; }
}

class Solution {
    public ListNode detectCycle(ListNode head) {
        // TODO: Detect the start of the cycle in linked list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        # TODO: Detect the start of the cycle in linked list
        return None`,
      javascript: `function ListNode(val) {
    this.val = val;
    this.next = null;
}

var detectCycle = function(head) {
    // TODO: Detect the start of the cycle in linked list
    return null;
};`,
    },
  },
  {
    title: 'Remove Duplicates from Sorted List',
    slug: 'remove-duplicates-from-sorted-list',
    description:
      'Given the head of a sorted linked list, delete all duplicates such that each element appears only once.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,1,2]',
        output: '[1,2]',
        explanation: "Duplicate 1's are removed, keeping only one.",
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 300]',
      '-100 <= Node.val <= 100',
    ],
    sampleInput: 'head = [1,1,2]',
    sampleOutput: '[1,2]',
    testCases: [
      { input: 'head = [1,1,2]', expectedOutput: '[1,2]' },
      { input: 'head = [1,1,2,3,3]', expectedOutput: '[1,2,3]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        // TODO: Remove duplicates from sorted linked list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        // TODO: Remove duplicates from sorted linked list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        # TODO: Remove duplicates from sorted linked list
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var deleteDuplicates = function(head) {
    // TODO: Remove duplicates from sorted linked list
    return null;
};`,
    },
  },
  {
    title: 'Rotate List',
    slug: 'rotate-list',
    description: 'Given the head of a linked list, rotate the list to the right by k places.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[4,5,1,2,3]',
        explanation: 'Rotate the list to the right by 2 places.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 500]',
      '-100 <= Node.val <= 100',
      '0 <= k <= 2 * 10^9',
    ],
    sampleInput: 'head = [1,2,3,4,5], k = 2',
    sampleOutput: '[4,5,1,2,3]',
    testCases: [
      { input: 'head = [1,2,3,4,5], k = 2', expectedOutput: '[4,5,1,2,3]' },
      { input: 'head = [0,1,2], k = 4', expectedOutput: '[2,0,1]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        // TODO: Rotate linked list to the right by k places
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        // TODO: Rotate linked list to the right by k places
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        // TODO: Rotate linked list to the right by k places
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var rotateRight = function(head, k) {
    // TODO: Rotate linked list to the right by k places
    return null;
};`,
    },
  },
  {
    title: 'Partition List',
    slug: 'partition-list',
    description:
      'Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,4,3,2,5,2], x = 3',
        output: '[1,2,2,4,3,5]',
        explanation: 'Nodes < 3 come first, then nodes >= 3.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 200]',
      '-100 <= Node.val <= 100',
    ],
    sampleInput: 'head = [1,4,3,2,5,2], x = 3',
    sampleOutput: '[1,2,2,4,3,5]',
    testCases: [
      { input: 'head = [1,4,3,2,5,2], x = 3', expectedOutput: '[1,2,2,4,3,5]' },
      { input: 'head = [2,1], x = 2', expectedOutput: '[1,2]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        // TODO: Partition linked list around value x
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode partition(ListNode head, int x) {
        // TODO: Partition linked list around value x
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        // TODO: Partition linked list around value x
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var partition = function(head, x) {
    // TODO: Partition linked list around value x
    return null;
};`,
    },
  },
  {
    title: 'Sort List',
    slug: 'sort-list',
    description:
      'Given the head of a linked list, sort the list in ascending order and return the sorted list.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [4,2,1,3]',
        output: '[1,2,3,4]',
        explanation: 'The list is sorted in ascending order.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5 * 10^4]',
      '-10^5 <= Node.val <= 10^5',
    ],
    sampleInput: 'head = [4,2,1,3]',
    sampleOutput: '[1,2,3,4]',
    testCases: [
      { input: 'head = [4,2,1,3]', expectedOutput: '[1,2,3,4]' },
      { input: 'head = [-1,5,3,4,0]', expectedOutput: '[-1,0,3,4,5]', isHidden: true },
      { input: 'head = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* sortList(ListNode* head) {
        // TODO: Sort linked list in ascending order
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode sortList(ListNode head) {
        // TODO: Sort linked list in ascending order
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        // TODO: Sort linked list in ascending order
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var sortList = function(head) {
    // TODO: Sort linked list in ascending order
    return null;
};`,
    },
  },
  {
    title: 'Reorder List',
    slug: 'reorder-list',
    description:
      'Given a singly linked list L: L0→L1→…→Ln-1→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4]',
        output: '[1,4,2,3]',
        explanation: 'The list is reordered alternating from ends.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 5 * 10^4]',
      '1 <= Node.val <= 1000',
    ],
    sampleInput: 'head = [1,2,3,4]',
    sampleOutput: '[1,4,2,3]',
    testCases: [
      { input: 'head = [1,2,3,4]', expectedOutput: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[1,5,2,4,3]', isHidden: true },
      { input: 'head = [1]', expectedOutput: '[1]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    void reorderList(ListNode* head) {
        // TODO: Reorder linked list alternating from ends
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public void reorderList(ListNode head) {
        // TODO: Reorder linked list alternating from ends
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        // TODO: Reorder linked list alternating from ends
        pass`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var reorderList = function(head) {
    // TODO: Reorder linked list alternating from ends
};`,
    },
  },
  {
    title: 'Copy List with Random Pointer',
    slug: 'copy-list-with-random-pointer',
    description:
      'A linked list of length n is given such that each node contains an additional random pointer which could point to any node in the list, or null. Construct a deep copy of the list.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        explanation: 'A deep copy is created with all pointers copied correctly.',
      },
    ],
    constraints: ['0 <= n <= 1000', '-10000 <= Node.val <= 10000'],
    sampleInput: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
    sampleOutput: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
    testCases: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        expectedOutput: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
      },
      {
        input: 'head = [[1,1],[2,1]]',
        expectedOutput: '[[1,1],[2,1]]',
        isHidden: true,
      },
      { input: 'head = [[3,null]]', expectedOutput: '[[3,null]]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int v) : val(v), next(nullptr), random(nullptr) {}
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // TODO: Create deep copy of linked list with random pointers
        return nullptr;
    }
};`,
      java: `class Node {
    int val;
    Node next;
    Node random;
    Node(int val) { this.val = val; }
}

class Solution {
    public Node copyRandomList(Node head) {
        // TODO: Create deep copy of linked list with random pointers
        return null;
    }
}`,
      python: `class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        // TODO: Create deep copy of linked list with random pointers
        pass`,
      javascript: `function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

var copyRandomList = function(head) {
    // TODO: Create deep copy of linked list with random pointers
    return null;
};`,
    },
  },
  {
    title: 'Flatten a Multilevel Doubly Linked List',
    slug: 'flatten-multilevel-linked-list',
    description:
      'You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]',
        output: '[1,2,3,7,8,11,12,9,10,4,5,6]',
        explanation: 'The multilevel list is flattened into a single list.',
      },
    ],
    constraints: ['0 <= Node.val <= 10^5'],
    sampleInput: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]',
    sampleOutput: '[1,2,3,7,8,11,12,9,10,4,5,6]',
    testCases: [
      {
        input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]',
        expectedOutput: '[1,2,3,7,8,11,12,9,10,4,5,6]',
      },
      {
        input: 'head = [1,2,null,3]',
        expectedOutput: '[1,3,2]',
        isHidden: true,
      },
      { input: 'head = [1]', expectedOutput: '[1]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;
    Node(int v) : val(v), prev(nullptr), next(nullptr), child(nullptr) {}
};

class Solution {
public:
    Node* flatten(Node* head) {
        // TODO: Flatten multilevel doubly linked list
        return nullptr;
    }
};`,
      java: `class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
    public Node(int val) { this.val = val; }
}

class Solution {
    public Node flatten(Node head) {
        // TODO: Flatten multilevel doubly linked list
        return null;
    }
}`,
      python: `class Node:
    def __init__(self, val, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child

class Solution:
    def flatten(self, head: 'Node') -> 'Node':
        // TODO: Flatten multilevel doubly linked list
        return head`,
      javascript: `function Node(val, prev, next, child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
}

var flatten = function(head) {
    // TODO: Flatten multilevel doubly linked list
    return null;
};`,
    },
  },
  {
    title: 'Remove All Adjacent Duplicates in Linked List',
    slug: 'remove-duplicates-linked-list',
    description:
      'You are given the head of a linked list. Delete all duplicate-consecutive nodes and return the head of the modified linked list.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,2]',
        output: '[1,3]',
        explanation: 'Adjacent duplicate 2s are removed.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 100000]',
      '1 <= Node.val <= 100',
    ],
    sampleInput: 'head = [1,2,3,2]',
    sampleOutput: '[1,3]',
    testCases: [
      { input: 'head = [1,2,3,2]', expectedOutput: '[1,3]' },
      { input: 'head = [1,2,2,1]', expectedOutput: '[1,1]', isHidden: true },
      { input: 'head = [1]', expectedOutput: '[1]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* removeDuplicates(ListNode* head) {
        // TODO: Remove all adjacent duplicates in linked list
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode removeDuplicates(ListNode head) {
        // TODO: Remove all adjacent duplicates in linked list
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeDuplicates(self, head: ListNode) -> ListNode:
        // TODO: Remove all adjacent duplicates in linked list
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var removeDuplicates = function(head) {
    // TODO: Remove all adjacent duplicates in linked list
    return null;
};`,
    },
  },
  {
    title: 'Merge Two Sorted Lists II',
    slug: 'merge-two-sorted-lists-ii',
    description: 'Merge two sorted linked lists recursively and return the merged list.',
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'The two lists are merged using a recursive approach.',
      },
    ],
    constraints: [
      'The number of nodes in each list is in the range [0, 50]',
      '-100 <= Node.val <= 100',
    ],
    sampleInput: 'list1 = [1,2,4], list2 = [1,3,4]',
    sampleOutput: '[1,1,2,3,4,4]',
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = [0]', expectedOutput: '[0]', isHidden: true },
      { input: 'list1 = [], list2 = []', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // TODO: Merge two sorted linked lists recursively
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // TODO: Merge two sorted linked lists recursively
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:
        // TODO: Merge two sorted linked lists recursively
        pass`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var mergeTwoLists = function(list1, list2) {
    // TODO: Merge two sorted linked lists recursively
    return null;
};`,
    },
  },

  // Hard - 5 problems
  {
    title: 'Reverse Nodes in k-Group',
    slug: 'reverse-nodes-in-k-group',
    description:
      'Given a linked list, reverse the nodes of a list k at a time and return the modified list.',
    difficulty: 'HARD',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[2,1,4,3,5]',
        explanation: 'Nodes are reversed in groups of 2.',
      },
    ],
    constraints: [
      'The number of nodes in the list is n',
      '1 <= k <= n <= 5000',
      '0 <= Node.val <= 1000',
    ],
    sampleInput: 'head = [1,2,3,4,5], k = 2',
    sampleOutput: '[2,1,4,3,5]',
    testCases: [
      { input: 'head = [1,2,3,4,5], k = 2', expectedOutput: '[2,1,4,3,5]' },
      { input: 'head = [1,2,3,4,5], k = 3', expectedOutput: '[3,2,1,4,5]', isHidden: true },
      { input: 'head = [1,2,3], k = 1', expectedOutput: '[1,2,3]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        // TODO: Reverse nodes of list k at a time
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // TODO: Reverse nodes of list k at a time
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        // TODO: Reverse nodes of list k at a time
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var reverseKGroup = function(head, k) {
    // TODO: Reverse nodes of list k at a time
    return null;
};`,
    },
  },
  {
    title: 'Merge k Sorted Lists',
    slug: 'merge-k-sorted-lists',
    description:
      'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'HARD',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'All k lists are merged into one sorted list.',
      },
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'],
    sampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
    sampleOutput: '[1,1,2,3,4,4,5,6]',
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', expectedOutput: '[]', isHidden: true },
      { input: 'lists = [[]]', expectedOutput: '[]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // TODO: Merge k sorted linked lists
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // TODO: Merge k sorted linked lists
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        // TODO: Merge k sorted linked lists
        return None`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var mergeKLists = function(lists) {
    // TODO: Merge k sorted linked lists
    return null;
};`,
    },
  },
  {
    title: 'LRU Cache',
    slug: 'lru-cache',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods.',
    difficulty: 'HARD',
    topic: 'Linked Lists',
    examples: [
      {
        input:
          'LRUCache(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2), put(4, 4), get(1), get(3), get(4)',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRU cache operations showing eviction and access patterns.',
      },
    ],
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5'],
    sampleInput: 'LRUCache(2), put(1, 1), put(2, 2), get(1)',
    sampleOutput: '[null, null, null, 1]',
    testCases: [
      {
        input: 'LRUCache(2), put(1, 1), put(2, 2), get(1)',
        expectedOutput: '[null, null, null, 1]',
      },
      {
        input: 'LRUCache(1), put(2, 1), get(2)',
        expectedOutput: '[null, null, 1]',
        isHidden: true,
      },
      {
        input: 'LRUCache(2), put(1, 0), put(2, 2), get(1), get(2)',
        expectedOutput: '[null, null, null, 0, 2]',
        isHidden: true,
      },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

class LRUCache {
private:
    // TODO: Implement LRU cache data structure
public:
    LRUCache(int capacity) {
        // Constructor
    }
    
    int get(int key) {
        // TODO: Get value for key
        return -1;
    }
    
    void put(int key, int value) {
        // TODO: Put key-value pair into cache
    }
};`,
      java: `class LRUCache {
    // TODO: Implement LRU cache data structure
    
    public LRUCache(int capacity) {
        // Constructor
    }
    
    public int get(int key) {
        // TODO: Get value for key
        return -1;
    }
    
    public void put(int key, int value) {
        // TODO: Put key-value pair into cache
    }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        # TODO: Initialize LRU cache with given capacity
        pass
    
    def get(self, key: int) -> int:
        # TODO: Get value for key
        return -1
    
    def put(self, key: int, value: int) -> None:
        # TODO: Put key-value pair into cache
        pass`,
      javascript: `var LRUCache = function(capacity) {
    // TODO: Initialize LRU cache with given capacity
};

LRUCache.prototype.get = function(key) {
    // TODO: Get value for key
    return -1;
};

LRUCache.prototype.put = function(key, value) {
    // TODO: Put key-value pair into cache
};`,
    },
  },
  {
    title: 'Split Linked List in Parts',
    slug: 'split-linked-list-in-parts',
    description:
      'Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.',
    difficulty: 'HARD',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5,6,7], k = 3',
        output: '[[1,2,3],[4,5],[6,7]]',
        explanation: 'List is split into 3 consecutive parts.',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 1000]',
      '0 <= Node.val <= 1000',
      '1 <= k <= 50',
    ],
    sampleInput: 'head = [1,2,3,4,5,6,7], k = 3',
    sampleOutput: '[[1,2,3],[4,5],[6,7]]',
    testCases: [
      {
        input: 'head = [1,2,3,4,5,6,7], k = 3',
        expectedOutput: '[[1,2,3],[4,5],[6,7]]',
      },
      {
        input: 'head = [1,2,3], k = 5',
        expectedOutput: '[[1],[2],[3],[],[]]',
        isHidden: true,
      },
      { input: 'head = []', expectedOutput: '[[],[],[]]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        // TODO: Split linked list into k consecutive parts
        return vector<ListNode*>(k, nullptr);
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode[] splitListToParts(ListNode head, int k) {
        // TODO: Split linked list into k consecutive parts
        return new ListNode[k];
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def splitListToParts(self, head: ListNode, k: int) -> List[ListNode]:
        // TODO: Split linked list into k consecutive parts
        return [None] * k`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var splitListToParts = function(head, k) {
    // TODO: Split linked list into k consecutive parts
    return new Array(k).fill(null);
};`,
    },
  },
  {
    title: 'Reverse Linked List II',
    slug: 'reverse-linked-list-ii',
    description:
      'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.',
    difficulty: 'HARD',
    topic: 'Linked Lists',
    examples: [
      {
        input: 'head = [1,2,3,4,5], left = 2, right = 4',
        output: '[1,4,3,2,5]',
        explanation: 'Nodes from position 2 to 4 are reversed.',
      },
    ],
    constraints: [
      'The number of nodes in the list is n',
      '1 <= n <= 500',
      '-500 <= Node.val <= 500',
      '1 <= left <= right <= n',
    ],
    sampleInput: 'head = [1,2,3,4,5], left = 2, right = 4',
    sampleOutput: '[1,4,3,2,5]',
    testCases: [
      { input: 'head = [1,2,3,4,5], left = 2, right = 4', expectedOutput: '[1,4,3,2,5]' },
      { input: 'head = [5], left = 1, right = 1', expectedOutput: '[5]', isHidden: true },
      { input: 'head = [3,5], left = 1, right = 2', expectedOutput: '[5,3]', isHidden: true },
    ],
    boilerplate: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        // TODO: Reverse nodes between left and right positions
        return nullptr;
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        // TODO: Reverse nodes between left and right positions
        return null;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
        // TODO: Reverse nodes between left and right positions
        return head`,
      javascript: `function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

var reverseBetween = function(head, left, right) {
    // TODO: Reverse nodes between left and right positions
    return null;
};`,
    },
  },
];
