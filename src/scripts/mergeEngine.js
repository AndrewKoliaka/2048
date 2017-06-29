import board from './board';
import Coord from './coord';
import {ROWS, COLS} from '../constants';

let points = 0;
let isMoved = false;

function resetResult() {
  points = 0;
  isMoved = false;
}

const mergeEngine = {
  down() {
    resetResult();
    for (let j = 0; j < ROWS; j++) {
      for (let i = COLS - 2; i >= 0; i--) {
        if (board.getTile(i, j)) {
          let y = i;
          while (y + 1 < ROWS) {
            let previous = board.getTile(y + 1, j);
            let current = board.getTile(y, j);
            if (!previous) {
              board.setTile(y + 1, j, current);
              board.setTile(y, j, 0);
              isMoved = true;
              y++;
            } else if (previous === current) {
              points += previous * 2;
              board
                .mergedTiles
                .push(new Coord(y + 1, j));
              isMoved = true;
              board.setTile(y + 1, j, previous * 2);
              board.setTile(y, j, 0);
              break;
            } else 
              break;
            }
          }
      }
    }
    return {points, isMoved};
  },
  up() {
    resetResult();
    for (let j = 0; j < ROWS; j++) {
      for (let i = 1; i < COLS; i++) {
        if (board.getTile(i, j)) {
          let y = i;
          while (y > 0) {
            let previous = board.getTile(y - 1, j);
            let current = board.getTile(y, j);
            if (!previous) {
              board.setTile(y - 1, j, current);
              board.setTile(y, j, 0);
              isMoved = true;
              y--;
            } else if (previous === current) {
              points += previous * 2;
              board
                .mergedTiles
                .push(new Coord(y - 1, j));
              isMoved = true;
              board.setTile(y - 1, j, previous * 2);
              board.setTile(y, j, 0);
              break;
            } else 
              break;
            }
          }
      }
    }
    return {points, isMoved};
  },
  left() {
    resetResult();
    for (let i = 0; i < ROWS; i++) {
      for (let j = 1; j < COLS; j++) {
        if (board.getTile(i, j)) {
          let x = j;
          while (x - 1 >= 0) {
            let previous = board.getTile(i, x - 1);
            let current = board.getTile(i, x);
            if (!previous) {
              board.setTile(i, x - 1, current);
              board.setTile(i, x, 0);
              isMoved = true;
              x--;
            } else if (previous === current) {
              points += previous * 2;
              board
                .mergedTiles
                .push(new Coord(i, x - 1));
              isMoved = true;
              board.setTile(i, x - 1, previous * 2);
              board.setTile(i, x, 0);
              break;
            } else 
              break;
            }
          }
      }
    }
    return {points, isMoved};
  },
  right() {
    resetResult();
    for (let i = 0; i < ROWS; i++) {
      for (let j = COLS - 2; j >= 0; j--) {
        if (board.getTile(i, j)) {
          let x = j;
          while (x + 1 < COLS) {
            let previous = board.getTile(i, x + 1);
            let current = board.getTile(i, x);
            if (!previous) {
              board.setTile(i, x + 1, board.getTile(i, x));
              board.setTile(i, x, 0);
              isMoved = true;
              x++;
            } else if (previous === current) {
              points += previous * 2;
              board
                .mergedTiles
                .push(new Coord(i, x + 1));
              isMoved = true;
              board.setTile(i, x + 1, previous * 2);
              board.setTile(i, x, 0);
              break;
            } else 
              break;
            }
          }
      }
    }
    return {points, isMoved};
  }
};

export default mergeEngine;
