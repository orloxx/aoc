import assert from 'assert'
import read from '../../utils/read.js'
import Tetris from './tetris.js'

function playTetris(list, maxRocks) {
  const tetris = new Tetris(list, maxRocks)

  while (!tetris.isDone) {
    const current = tetris.nextShape

    while (current.falling) {
      const direction = tetris.nextWindDirection

      if (tetris.canMoveSide(current, direction)) {
        current.moveSides(direction)
      }

      if (tetris.canMoveDown(current)) {
        current.moveDown()
      } else {
        tetris.put(current)
      }
    }
  }

  return tetris.height
}

function solution01(list) {
  return playTetris(list, 2022)
}

function solution02(list) {
  return playTetris(list, 1000000000000)
}

read('test.txt').then((list) => {
  assert.deepEqual(solution01(list), 3068)
  assert.deepEqual(solution02(list), 1514285714288)
})

read('input.txt').then((list) => {
  assert.deepEqual(solution01(list), 3211)
  assert.deepEqual(solution02(list), 1589142857183)
})
