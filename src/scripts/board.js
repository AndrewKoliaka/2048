import moveEngine from './moveEngine';
import {directions, COLS, ROWS} from '../constants';
import Coord from './coord';
import isEqual from '../utils/objectEquality';
import getRandomInt from '../utils/randomNumber';
import Tile from './tile';

const board = {
  // array of tiles in game
  tiles: [],

  // merged tiles, empty after each move (necessary to apply the correct animation)
  mergedTiles: [],

  /**
   * initialize a new grid with 2 tiles in random position
   *
   * @returns {Array}
   */
  init() {
    this.mergedTiles = [];
    this.tiles = [];
    this.addNewTile();
    this.addNewTile();
    return this.tiles;
  },

  /**
   * add tile to tiles array
   * or change value of tile if one with the same coordinates already exists
   *
   * @param {Object} Tile
   */
  setTile(tile) {
    let existingTile = this.getTile(tile.coord);
    existingTile
      ? existingTile.value = tile.value
      : this
        .tiles
        .push(tile);
  },

  /**
   * get tile by specified coordinates
   *
   * @param {(Object | Number)} coord1
   * @param {Number} [coord2]
   * @returns {Boolean}
   */
  getTile(coord1, coord2) {
    let coord = coord1 instanceof Coord
      ? coord1
      : new Coord(coord1, coord2);
    return this
      .tiles
      .find(el => (isEqual(el.coord, coord)));
  },

  /**
   * remove tile
   * 
   * @param {Object} coord 
   * @returns {(Object | Boolean)} deleted tile or false
   */
  removeTile(coord) {
    let index = this
      .tiles
      .findIndex(el => (isEqual(el.coord, coord)));
    return index > -1
      ? this
        .tiles
        .splice(index, 1)[0]
      : false;
  },

  /**
   * set isMerged property to false for all tiles
   * 
   */
  disableIsMerged() {
    this
      .tiles
      .forEach(tile => {
        tile.isMerged = false;
      });
  },

  /**
   * set a new (merged tile) to tiles array 
   * and remove tile with specified coordinates
   * 
   * @param {Object} tile 
   * @param {Object} coordToRemove 
   */
  mergeTiles(tile, coordToRemove) {
    this.setTile(tile);
    this.removeTile(coordToRemove);
  },

  /**
   * add a new tile to grid
   * 
   * @returns {Boolean}
   */
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

  /**
   * check if free cell in tiles array
   * tiles array maximum capacity: ROWS * COLS
   * 
   * @returns {Boolean}
   */
  isFreeCell() {
    return this.tiles.length < (ROWS * COLS);
  },

  /**
   * check if move is available
   * move is available in 2 cases:
   * 1. if free cell exists
   * 2. if two tiles with the same values are next to each other
   * 
   * @returns {Boolean}
   */
  isAvailableMove() {
    let prev;

    if (this.isFreeCell()) {
      return true;
    }

    // check for move horizontally
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

    // check for move vertically
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

  /**
   * try to perform move
   * 
   * @param {String} direction 
   * @returns {(Object | Boolean)}
   */
  move(direction) {
    this.mergedTiles.length = 0;
    return directions.hasOwnProperty(direction)
      ? moveEngine[direction.toLowerCase()]()
      : false;
  }
};

export default board;
