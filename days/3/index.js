import assert from "node:assert";
import read from "@/utils/read";

function solution01(list) {
  return list.reduce((total, bank) => {
    let maxJoltage = 0;

    // Try all pairs of positions (i, j) where i < j
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const joltage = parseInt(bank[i], 10) * 10 + parseInt(bank[j], 10);
        maxJoltage = Math.max(maxJoltage, joltage);
      }
    }

    return total + maxJoltage;
  }, 0);
}

function solution02(list) {
  return list.reduce((total, bank) => {
    const targetLength = 12;
    let result = "";
    let startPos = 0;

    // Build the 12-digit result greedily from left to right
    for (let resultPos = 0; resultPos < targetLength; resultPos++) {
      // Calculate the furthest position we can search up to
      // We need to ensure we have enough digits remaining after this choice
      const endPos = bank.length - (targetLength - resultPos);

      let maxDigit = -1;
      let maxPos = -1;

      // Find the maximum digit in the valid range
      for (let j = startPos; j <= endPos; j++) {
        const digit = parseInt(bank[j], 10);
        if (digit > maxDigit) {
          maxDigit = digit;
          maxPos = j;
        }
      }

      result += maxDigit;
      startPos = maxPos + 1;
    }

    return total + parseInt(result, 10);
  }, 0);
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 357);
  assert.deepEqual(solution02(list), 3121910778619);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 17031);
  assert.deepEqual(solution02(list), 168575096286051);
});
