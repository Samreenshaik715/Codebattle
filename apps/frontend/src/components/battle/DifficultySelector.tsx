import type { Difficulty } from '@/types';
import { Button } from '@/components/ui/Button';

const DIFFICULTIES: { value: Difficulty; label: string; color: string; description: string }[] = [
  {
    value: 'EASY',
    label: 'Easy',
    color: 'bg-green-900 text-green-100 border-green-700 hover:bg-green-800',
    description: 'Basic algorithms and data structures',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    color: 'bg-yellow-900 text-yellow-100 border-yellow-700 hover:bg-yellow-800',
    description: 'Intermediate problem solving',
  },
  {
    value: 'HARD',
    label: 'Hard',
    color: 'bg-red-900 text-red-100 border-red-700 hover:bg-red-800',
    description: 'Advanced algorithms and optimization',
  },
];

export function DifficultySelector({
  selectedDifficulty,
  onSelectDifficulty,
  isLoading,
}: {
  selectedDifficulty?: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Choose Difficulty</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => onSelectDifficulty(difficulty.value)}
            disabled={isLoading}
            className={`rounded-lg border-2 p-4 transition-all ${
              selectedDifficulty === difficulty.value
                ? `${difficulty.color} border-current shadow-lg`
                : `${difficulty.color} border-transparent opacity-70 hover:opacity-100`
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <p className="text-lg font-bold">{difficulty.label}</p>
            <p className="text-xs mt-2 opacity-90">{difficulty.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
