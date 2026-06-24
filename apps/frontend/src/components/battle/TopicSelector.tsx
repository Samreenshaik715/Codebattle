import { Button } from '@/components/ui/Button';

const TOPICS = [
  'Arrays',
  'Vectors',
  'Strings',
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
];

export function TopicSelector({
  selectedTopic,
  onSelectTopic,
  isLoading,
}: {
  selectedTopic?: string;
  onSelectTopic: (topic: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Choose Topic</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            disabled={isLoading}
            className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
              selectedTopic === topic
                ? 'border-blue-400 bg-blue-900 text-blue-100 shadow-lg'
                : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
