import { calculateTotalBattleDuration } from '../modules/battles/battle.service.js';

function assertEqual(actual: number, expected: number, msg: string) {
  if (actual !== expected) {
    console.error(`FAIL: ${msg} — expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  console.log(`OK: ${msg}`);
}

// Tests
const t1 = calculateTotalBattleDuration(2, 5 * 60); // inputs in seconds? Our helper expects seconds — use minutes*60
assertEqual(t1, 10 * 60, '2 questions × 5 min = 10 min');

const t2 = calculateTotalBattleDuration(5, 3 * 60);
assertEqual(t2, 15 * 60, '5 questions × 3 min = 15 min');

const t3 = calculateTotalBattleDuration(10, 2 * 60);
assertEqual(t3, 20 * 60, '10 questions × 2 min = 20 min');

console.log('All battle duration tests passed.');
