import board from './board';
import Coord from './coord';
import Tile from './tile';
import {ROWS, COLS} from '../constants';

// points which player scored for move
let points = 0;

// label which indicates if move was did
let isMoved = false;


/**
 * reset labels above
 * 
 */
function resetMoveResult() {
  points = 0;
  isMoved = false;
}


/**
 * Try to move tile to 1 cell next
 * 
 * @param {Object} prevCoord 
 * @param {Object} currCoord 
 * @returns {Boolean} if moved last tile in line return true else false
 */
function tryToMove(prevCoord, currCoord) {
  let previousTile = board.getTile(prevCoord),
    currentTile = board.getTile(currCoord);

  // if previous tile 0
  if (!previousTile) {
    board.mergeTiles(new Tile(prevCoord, currentTile.value), currCoord);
    isMoved = true;

  // if previous tile has value the same as current tile
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
  
  // if previous tile has different value with current tile
  } else {
    return true;
  }

  return false;
}

const moveEngine = {
  /**
   * move tiles down
   * 
   * @returns {Object} move result object 
   */
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

  /**
   * move tiles up
   * 
   * @returns {Object} move result object 
   */
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

  /**
   * move tiles left
   * 
   * @returns {Object} move result object 
   */
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

  /**
   * move tiles right
   * 
   * @returns {Object} move result object 
   */
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
