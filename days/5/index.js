import assert from "node:assert";
import read from "@/utils/read";

function parseInput(list) {
  const blankLineIndex = list.indexOf("");

  const ranges = list.slice(0, blankLineIndex).map((line) => {
    const [min, max] = line.split("-").map(Number);
    return { min, max };
  });

  const ids = list
    .slice(blankLineIndex + 1)
    .filter((line) => line !== "")
    .map(Number);

  return { ranges, ids };
}

function solution01(list) {
  const { ranges, ids } = parseInput(list);

  return ids.filter((id) =>
    ranges.some((range) => id >= range.min && id <= range.max),
  ).length;
}

function solution02(list) {
  const { ranges } = parseInput(list);

  // Sort and merge overlapping/adjacent ranges
  ranges.sort((a, b) => a.min - b.min);

  const merged = ranges.reduce((acc, range) => {
    if (acc.length === 0) {
      acc.push(range);
    } else {
      const last = acc[acc.length - 1];
      if (range.min <= last.max + 1) {
        last.max = Math.max(last.max, range.max);
      } else {
        acc.push(range);
      }
    }
    return acc;
  }, []);

  // Count total IDs in merged ranges
  return merged.reduce((sum, range) => sum + (range.max - range.min + 1), 0);
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 3);
  assert.deepEqual(solution02(list), 14);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 828);
  assert.deepEqual(solution02(list), 352681648086146);
});
