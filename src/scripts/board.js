import mergeEngine from './mergeEngine';
import {directions, COLS, ROWS} from '../constants';

let grid = [];

const board = {
  get grid() {
    return grid;
  },
  mergedTiles: [],
  init() {
    for (let i = 0; i < ROWS; i++) {
      grid[i] = new Array(COLS).fill(0);
    }
    return grid;
  },
  setTile(i, j, value) {
    grid[i][j] = value;
  },
  getTile(i, j) {
    return grid[i][j];
  },
  addNewTile() {
    if (!this.isFreeCell()) {
      return false;
    }
    do {
      let randI = Math.floor(Math.random() * ROWS);
      let randJ = Math.floor(Math.random() * COLS);
      if (!this.getTile(randI, randJ)) {
        let value = [2, 2, 4][Math.floor(Math.random() * 3)];
        this.setTile(randI, randJ, value);
        return grid;
      }
    } while (true);
  },
  isFreeCell() {
    return this
      .grid
      .some(row => (row.some(el => (el === 0))));
  },
  isAvailableMove() {
    if (this.isFreeCell()) {
      return true;
    }

    for (let i = 0; i < ROWS; i++) {
      let prev = null;
      for (let j = 0; j < COLS; j++) {
        if (this.getTile(j, i) === (prev
          ? this.getTile(prev.j, prev.i)
          : null)) {
          return true;
        } else {
          prev = {
            i,
            j
          };
        }
      }
    }

    return this
      .grid
      .some(row => {
        let prev = null;
        return row.some(el => {
          if (el === prev) {
            return true;
          } else {
            prev = el;
            return false;
          }
        });
      });
  },
  move(direction) {
    this.mergedTiles.length = 0;
    return directions.hasOwnProperty(direction)
      ? mergeEngine[direction.toLowerCase()]()
      : false;
  }
};

export default board;
