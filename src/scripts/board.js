import mergeEngine from './mergeEngine';
import {directions, COLS, ROWS} from '../constants';
import Coord from './coord';
import Tile from './tile';

let tiles = [],
  mergedTiles = [];

const board = {
  get tiles() {
    return [...tiles];
  },
  get mergedTiles() {
    return [...mergedTiles];
  },
  addMergedTile(tile) {
    mergedTiles.push(tile)
  },
  init() {
    mergedTiles = [];
    tiles = [];
    this.addNewTile();
    this.addNewTile();
    return tiles;
  },
  setTile(tile) {
    let existingTile = this.getTile(tile.coord);
    existingTile
      ? existingTile.value = tile.value
      : tiles.push(tile);
  },
  getTile(coord) {
    return tiles.find(el => (el.coord.i === coord.i && el.coord.j === coord.j));
  },
  removeTile(coord) {
    let index = tiles.findIndex(el => (JSON.stringify(el.coord) === JSON.stringify(coord)));
    return index > -1
      ? tiles.splice(index, 1)
      : false;
  },
  mergeTiles(tile, coordToRemove) {
    this.setTile(tile);
    this.removeTile(coordToRemove);
  },
  addNewTile() {
    if (!this.isFreeCell()) {
      return false;
    }
    do {
      let randI = Math.floor(Math.random() * ROWS);
      let randJ = Math.floor(Math.random() * COLS);
      let randCoord = new Coord(randI, randJ);

      if (!this.getTile(randCoord)) {
        let value = [2, 2, 4][Math.floor(Math.random() * 3)];
        let tile = new Tile(randCoord, value);
        this.setTile(tile);
        return tiles;
      }
    } while (true);
  },
  isFreeCell() {
    return tiles.length < (ROWS * COLS);
  },
  isAvailableMove() {
    let prev;

    if (this.isFreeCell()) {
      return true;
    }

    for (let i = 0; i < ROWS; i++) {
      prev = null;
      for (let j = 0; j < COLS; j++) {
        if (this.getTile(new Coord(j, i)) === (prev
          ? this.getTile(new Coord(prev.j, prev.i))
          : null)) {
          return true;
        } else {
          prev = new Coord(i, j);
        }
      }
    }

    for (let i = 0; i < ROWS; i++) {
      prev = null;
      for (let j = 0; j < COLS; j++) {
        if (this.getTile(new Coord(i, j)) === (prev
          ? this.getTile(new Coord(prev.i, prev.j))
          : null)) {
          return true;
        } else {
          prev = new Coord(i, j);
        }
      }
    }

    return false;
  },
  move(direction) {
    mergedTiles.length = 0;
    return directions.hasOwnProperty(direction)
      ? mergeEngine[direction.toLowerCase()]()
      : false;
  }
};

export default board;
