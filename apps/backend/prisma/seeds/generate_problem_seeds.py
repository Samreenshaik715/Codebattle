from pathlib import Path
import json

TOPICS = [
    'Linked Lists',
    'Stacks',
    'Queues',
    'Trees',
    'Graphs',
    'Sorting',
    'Searching',
    'Dynamic Programming',
    'Math',
    'Bit Manipulation',
    'Hash Tables',
    'Greedy',
]

DIFFICULTY_COUNTS = [
    ('EASY', 8),
    ('MEDIUM', 10),
    ('HARD', 7),
]

BASE_INPUTS = {
    'Linked Lists': 'head = [1,2,3,4,5]',
    'Stacks': 'operations = ["push(1)","push(2)","pop()"]',
    'Queues': 'operations = ["enqueue(1)","enqueue(2)","dequeue()"]',
    'Trees': 'root = [3,9,20,null,null,15,7]',
    'Graphs': 'edges = [[0,1],[1,2],[2,3]]',
    'Sorting': 'nums = [3,2,1,5,6,4]',
    'Searching': 'nums = [1,2,3,4,5], target = 4',
    'Dynamic Programming': 'nums = [1,2,3,4]',
    'Math': 'n = 10',
    'Bit Manipulation': 'n = 29',
    'Hash Tables': 'nums = [1,2,2,3], k = 2',
    'Greedy': 'points = [[10,16],[2,8],[1,6],[7,12]]',
}

OUTPUTS = {
    'Linked Lists': '[5,4,3,2,1]',
    'Stacks': '[null,null,2]',
    'Queues': '[null,null,1]',
    'Trees': '3',
    'Graphs': 'true',
    'Sorting': '[1,2,3,4,5,6]',
    'Searching': '3',
    'Dynamic Programming': '7',
    'Math': '55',
    'Bit Manipulation': '4',
    'Hash Tables': '[2,2]',
    'Greedy': '2',
}

PROBLEMS = []

for topic in TOPICS:
    topic_key = topic.lower()
    base_input = BASE_INPUTS[topic]
    base_output = OUTPUTS[topic]

    for difficulty, count in DIFFICULTY_COUNTS:
        for index in range(1, count + 1):
            title = f"{topic} {difficulty} Problem {index}"
            description = (
                f"Implement a {difficulty.lower()} {topic_key} solution for '{title}'. "
                f"The implementation should handle the basic constraints for {topic_key} problems."
            )
            examples = [
                {
                    'input': base_input,
                    'output': base_output,
                }
            ]
            sample_input = base_input
            sample_output = base_output
            constraints = [
                '1 <= n <= 10^5',
                f'Use efficient {topic_key} techniques where applicable.',
            ]
            test_cases = [
                {
                    'input': sample_input,
                    'expectedOutput': sample_output,
                },
                {
                    'input': base_input.replace('1', str(index+1)).replace('2', str(index+2)),
                    'expectedOutput': base_output,
                    'isHidden': difficulty != 'EASY',
                },
            ]

            PROBLEMS.append({
                'title': title,
                'description': description,
                'difficulty': difficulty,
                'topic': topic,
                'examples': examples,
                'constraints': constraints,
                'sampleInput': sample_input,
                'sampleOutput': sample_output,
                'testCases': test_cases,
            })

output_path = Path('apps/backend/prisma/seeds/problemSeeds.ts')
problem_text = json.dumps(PROBLEMS, indent=2)
output_path.write_text(
    'import type { ProblemSeed } from "../seed.ts";\n\n'
    'export const expandedProblemSeeds: ProblemSeed[] = '
    + problem_text
    + ';\n',
    encoding='utf-8',
)
print('wrote', output_path, 'with', len(PROBLEMS), 'problems')
