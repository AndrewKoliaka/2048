import board from './board';
import Coord from './coord';
import Tile from './tile';
import {ROWS, COLS} from '../constants';

let points = 0;
let isMoved = false;

function resetMoveResult() {
  points = 0;
  isMoved = false;
}

function tryToMove(prevCoord, currCoord) {
  let previousTile = board.getTile(prevCoord),
    currentTile = board.getTile(currCoord);

  if (!previousTile) {
    board.mergeTiles(new Tile(prevCoord, currentTile.value), currCoord);
    isMoved = true;
  } else if (previousTile.value === currentTile.value && !previousTile.isMerged) {
    points += previousTile.value * 2;
    board
      .mergedTiles
      .push(previousTile);
    previousTile.isMerged = true;
    previousTile.value *= 2;
    board.mergeTiles(previousTile, currCoord);
    isMoved = true;
    return true;
  } else {
    return true;
  }

  return false;
}

const moveEngine = {
  down() {
    resetMoveResult();
    for (let j = 0; j < ROWS; j++) {
      board.disableIsMerged();
      for (let i = COLS - 2; i >= 0; i--) {
        if (board.getTile(i, j)) {
          let y = i;
          while (y + 1 < ROWS) {
            if (tryToMove(new Coord(y + 1, j), new Coord(y, j))) {
              break;
            } else {
              y++;
            }
          }
        }
      }
    }
    return {points, isMoved};
  },
  up() {
    resetMoveResult();
    for (let j = 0; j < ROWS; j++) {
      board.disableIsMerged();
      for (let i = 1; i < COLS; i++) {
        if (board.getTile(i, j)) {
          let y = i;
          while (y > 0) {
            if (tryToMove(new Coord(y - 1, j), new Coord(y, j))) {
              break;
            } else {
              y--;
            }
          }
        }
      }
    }
    return {points, isMoved};
  },
  left() {
    resetMoveResult();
    for (let i = 0; i < ROWS; i++) {
      board.disableIsMerged();
      for (let j = 1; j < COLS; j++) {
        if (board.getTile(i, j)) {
          let x = j;
          while (x - 1 >= 0) {
            if (tryToMove(new Coord(i, x - 1), new Coord(i, x))) {
              break;
            } else {
              x--;
            }

          }
        }
      }
    }
    return {points, isMoved};
  },
  right() {
    resetMoveResult();
    for (let i = 0; i < ROWS; i++) {
      board.disableIsMerged();
      for (let j = COLS - 2; j >= 0; j--) {
        if (board.getTile(i, j)) {
          let x = j;
          while (x + 1 < COLS) {
            if (tryToMove(new Coord(i, x + 1), new Coord(i, x))) {
              break;
            } else {
              x++;
            }
          }
        }
      }
    }
    return {points, isMoved};
  }
};

export default moveEngine;
