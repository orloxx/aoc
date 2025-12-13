import assert from "node:assert";
import read from "@/utils/read";

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function countAdjacentRolls(grid, row, col) {
  let count = 0;

  for (const [dr, dc] of DIRECTIONS) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[newRow].length &&
      grid[newRow][newCol] === "@"
    ) {
      count++;
    }
  }

  return count;
}

function findAccessibleRolls(grid) {
  const accessible = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "@" && countAdjacentRolls(grid, row, col) < 4) {
        accessible.push([row, col]);
      }
    }
  }

  return accessible;
}

function solution01(list) {
  return findAccessibleRolls(list).length;
}

function solution02(list) {
  const grid = list.map((row) => row.split(""));
  let totalRemoved = 0;

  while (true) {
    const toRemove = findAccessibleRolls(grid);

    if (toRemove.length === 0) {
      break;
    }

    for (const [row, col] of toRemove) {
      grid[row][col] = ".";
    }

    totalRemoved += toRemove.length;
  }

  return totalRemoved;
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 13);
  assert.deepEqual(solution02(list), 43);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 1433);
  assert.deepEqual(solution02(list), 8616);
});
