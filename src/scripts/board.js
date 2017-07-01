import moveEngine from './moveEngine';
import {directions, COLS, ROWS} from '../constants';
import Coord from './coord';
import isEqual from '../utils/objectEquality';
import getRandomInt from '../utils/randomNumber';
import Tile from './tile';

const board = {
  tiles: [],
  mergedTiles: [],
  init() {
    this.mergedTiles = [];
    this.tiles = [];
    this.addNewTile();
    this.addNewTile();
    return this.tiles;
  },
  setTile(tile) {
    let existingTile = this.getTile(tile.coord);
    existingTile
      ? existingTile.value = tile.value
      : this
        .tiles
        .push(tile);
  },
  getTile(coord1, coord2) {
    let coord = coord1 instanceof Coord
      ? coord1
      : new Coord(coord1, coord2);
    return this
      .tiles
      .find(el => (isEqual(el.coord, coord)));
  },
  removeTile(coord) {
    let index = this
      .tiles
      .findIndex(el => (isEqual(el.coord, coord)));
    return index > -1
      ? this
        .tiles
        .splice(index, 1)
      : false;
  },
  disableIsMerged() {
    this
      .tiles
      .forEach(tile => {
        tile.isMerged = false;
      });
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
      let randCoord = new Coord(getRandomInt(0, ROWS), getRandomInt(0, COLS));

      if (!this.getTile(randCoord)) {
        let value = [2, 2, 4][getRandomInt(0, 3)];
        let tile = new Tile(randCoord, value);
        this.setTile(tile);
        return tile;
      }
    } while (true);
  },
  isFreeCell() {
    return this.tiles.length < (ROWS * COLS);
  },
  isAvailableMove() {
    let prev;

    if (this.isFreeCell()) {
      return true;
    }

    for (let i = 0; i < ROWS; i++) {
      prev = null;
      for (let j = 0; j < COLS; j++) {
        if (this.getTile(j, i).value === (prev
          ? this.getTile(prev.j, prev.i).value
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
        if (this.getTile(i, j).value === (prev
          ? this.getTile(prev.i, prev.j).value
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
    this.mergedTiles.length = 0;
    return directions.hasOwnProperty(direction)
      ? moveEngine[direction.toLowerCase()]()
      : false;
  }
};

export default board;
