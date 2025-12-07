import assert from "node:assert";
import read from "@/utils/read";

function hasLeadingZero(str) {
  return str.length > 1 && str[0] === "0";
}

function isRepeatedPattern(str, patternLen, exactRepetitions = null) {
  // Pattern length must divide the total length evenly
  if (str.length % patternLen !== 0) return false;

  const pattern = str.slice(0, patternLen);

  // Check for leading zero in pattern (unless it's just "0")
  if (hasLeadingZero(pattern)) return false;

  // Check if the entire string is this pattern repeated
  const repetitions = str.length / patternLen;
  const reconstructed = pattern.repeat(repetitions);

  if (reconstructed !== str) return false;

  // Check repetition count constraint
  if (exactRepetitions !== null) {
    return repetitions === exactRepetitions;
  }
  return repetitions >= 2;
}

function isInvalidId(id) {
  const str = String(id);

  // Must have even length to split into two equal parts (repeated exactly twice)
  if (str.length % 2 !== 0) return false;

  const patternLen = str.length / 2;
  return isRepeatedPattern(str, patternLen, 2);
}

function isInvalidId2(id) {
  const str = String(id);

  // Try all possible pattern lengths from 1 to half the string length
  for (let patternLen = 1; patternLen <= str.length / 2; patternLen++) {
    if (isRepeatedPattern(str, patternLen)) {
      return true;
    }
  }

  return false;
}

function sumInvalidIds(list, validatorFn) {
  const ranges = list[0].split(",");
  let sum = 0;

  for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    for (let id = start; id <= end; id++) {
      if (validatorFn(id)) {
        sum += id;
      }
    }
  }

  return sum;
}

function solution01(list) {
  return sumInvalidIds(list, isInvalidId);
}

function solution02(list) {
  return sumInvalidIds(list, isInvalidId2);
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 1227775554);
  assert.deepEqual(solution02(list), 4174379265);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 19386344315);
  assert.deepEqual(solution02(list), 34421651192);
});
