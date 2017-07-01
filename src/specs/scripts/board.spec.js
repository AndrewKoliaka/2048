import board from '../../scripts/board';
import Tile from '../../scripts/tile';
import Coord from '../../scripts/coord';
import {ROWS, COLS} from '../../constants';

beforeEach(() => {
  board.tiles = [];
  board.mergedTiles = [];
  board.setTile(new Tile(new Coord(0, 0), 2));
  board.setTile(new Tile(new Coord(0, 1), 4));
});

it('should init', () => {
  jest.spyOn(board, 'addNewTile');
  board.init();
  expect(board.tiles.length).toBe(2);
  expect(board.mergedTiles.length).toBe(0);
  expect(board.addNewTile).toHaveBeenCalledTimes(2);
});

it('should set tile', () => {
  let coord1 = new Coord(0, 0);
  let tile1 = new Tile(coord1, 8);
  board.setTile(tile1);

  expect(board.getTile(coord1)).toEqual(tile1);
  expect(board.tiles.length).toBe(2);

  let coord2 = new Coord(3, 3);
  let tile2 = new Tile(coord2, 2);
  board.setTile(tile2);

  expect(board.getTile(coord2)).toEqual(tile2);
  expect(board.tiles.length).toBe(3);
});

it('should get tile', () => {
  const tile = new Tile(new Coord(0, 0), 2);
  expect(board.getTile(new Coord(0, 0))).toEqual(tile);
  expect(board.getTile(0, 0)).toEqual(tile);
  expect(board.getTile(3, 3)).toBeFalsy();
});

it('should remove tile', () => {
  board.removeTile(new Coord(0, 0));

  expect(board.getTile(new Coord(0, 0))).toBeFalsy();
  expect(board.tiles.length).toBe(1);

  board.removeTile(new Coord(3, 3));
  expect(board.tiles.length).toBe(1);
});

it('should merge tiles', () => {
  // 2 4 => 6
  let coordToRemove = new Coord(0, 1);
  let coord = new Coord(0, 0);
  let mergedTile = new Tile(coord, 6);

  board.mergeTiles(mergedTile, coordToRemove);

  expect(board.tiles.length).toBe(1);
  expect(board.getTile(coord)).toEqual(mergedTile);
});

it('should set isMerged label to false for all tiles', () => {
  board.tiles.forEach(tile => tile.isMerged = true);
  board.disableIsMerged();
  expect(board.tiles.every(tile => !tile.isMerged)).toBeTruthy();
});

it('should add new tile', () => {
  let addedTile = board.addNewTile();

  expect(board.getTile(addedTile.coord)).toBe(addedTile);
  expect(board.tiles.length).toBe(3);

  board.tiles = new Array(ROWS * COLS).fill(new Tile());
  addedTile = board.addNewTile();

  expect(addedTile).toBeFalsy();
  expect(board.tiles.length).toBe(ROWS * COLS);
});

it('should check for free cells', () => {
  expect(board.isFreeCell()).toBeTruthy();

  board.tiles = new Array(ROWS * COLS).fill(new Tile());
  expect(board.isFreeCell()).toBeFalsy();
});

it('it should check is move available', () => {
  expect(board.isAvailableMove()).toBeTruthy();

  board.tiles = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      board.setTile(new Tile(new Coord(i, j), 2));
    }
  }
  expect(board.isAvailableMove()).toBeTruthy();

  let tileValue = 1;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      board.setTile(new Tile(new Coord(i, j), tileValue++));
    }
  }
  expect(board.isAvailableMove()).toBeFalsy();
});
