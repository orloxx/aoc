import assert from "node:assert";
import read from "@/utils/read";

// Parse a rotation string into direction and distance
function parseRotation(rotation) {
  return {
    direction: rotation[0],
    distance: parseInt(rotation.slice(1), 10),
  };
}

// Move position in circular range [0, 99]
function movePosition(position, direction, distance) {
  if (direction === "R") {
    return (position + distance) % 100;
  }
  return (((position - distance) % 100) + 100) % 100;
}

// General solution that can handle both step-by-step and jump modes
function solve(list, stepByStep = false) {
  let position = 50;
  let count = 0;

  for (const rotation of list) {
    const { direction, distance } = parseRotation(rotation);

    if (stepByStep) {
      // Move one click at a time
      for (let i = 0; i < distance; i++) {
        position = movePosition(position, direction, 1);
        if (position === 0) count++;
      }
    } else {
      // Jump full distance
      position = movePosition(position, direction, distance);
      if (position === 0) count++;
    }
  }

  return count;
}

function solution01(list) {
  return solve(list, false);
}

function solution02(list) {
  return solve(list, true);
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 3);
  assert.deepEqual(solution02(list), 6);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 1086);
  assert.deepEqual(solution02(list), 6268);
});
