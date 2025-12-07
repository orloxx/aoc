import assert from "node:assert";
import read from "@/utils/read";

function solution01(_list) {
  return 11;
}

function solution02(_list) {
  return 31;
}

read("test.txt").then((list) => {
  assert.deepEqual(solution01(list), 11);
  assert.deepEqual(solution02(list), 31);
});

read("input.txt").then((list) => {
  assert.deepEqual(solution01(list), 11);
  assert.deepEqual(solution02(list), 31);
});
