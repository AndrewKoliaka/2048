import board from '../../scripts/board';
import Tile from '../../scripts/tile';
import Coord from '../../scripts/coord';
import {ROWS, COLS, directions} from '../../constants';

beforeEach(() => {
  board.tiles = [];
  board.mergedTiles = [];
});

it('should move tiles right', () => {
  // 0 4 4 0 => 0 0 0 8
  board.setTile(new Tile(new Coord(0, 1), 4));
  board.setTile(new Tile(new Coord(0, 2), 4));
  let moveObj = board.move(directions.RIGHT);

  expect(moveObj.hasOwnProperty('isMoved')).toBeTruthy();
  expect(moveObj.hasOwnProperty('points')).toBeTruthy();
  expect(moveObj.isMoved).toBeTruthy();
  expect(moveObj.points).toBe(8);
  expect(board.mergedTiles[0]).toBe(board.getTile(0, 3));
  expect(board.getTile(0, 3).value).toBe(8);
});

it('should move tiles left', () => {
  // 0 0 2 2 => 4 0 0 0
  board.setTile(new Tile(new Coord(0, 2), 2));
  board.setTile(new Tile(new Coord(0, 3), 2));
  let moveObj = board.move(directions.LEFT);

  expect(moveObj.hasOwnProperty('isMoved')).toBeTruthy();
  expect(moveObj.hasOwnProperty('points')).toBeTruthy();
  expect(moveObj.isMoved).toBeTruthy();
  expect(moveObj.points).toBe(4);
  expect(board.mergedTiles[0]).toBe(board.getTile(0, 0));
  expect(board.getTile(0, 0).value).toBe(4);
});

it('should move tiles up', () => {
  /*
    2 => 4
    0 => 4
    2 => 0
    4 => 0
  */
  board.setTile(new Tile(new Coord(0, 0), 2));
  board.setTile(new Tile(new Coord(2, 0), 2));
  board.setTile(new Tile(new Coord(3, 0), 4));
  let moveObj = board.move(directions.UP);

  expect(moveObj.hasOwnProperty('isMoved')).toBeTruthy();
  expect(moveObj.hasOwnProperty('points')).toBeTruthy();
  expect(moveObj.isMoved).toBeTruthy();
  expect(moveObj.points).toBe(4);
  expect(board.mergedTiles[0]).toBe(board.getTile(0, 0));
  expect(board.getTile(0, 0).value).toBe(4);
});

it('should move tiles down', () => {
  /*
    4 => 0
    0 => 0
    0 => 0
    4 => 8
  */
  board.setTile(new Tile(new Coord(0, 0), 4));
  board.setTile(new Tile(new Coord(3, 0), 4));
  let moveObj = board.move(directions.DOWN);

  expect(moveObj.hasOwnProperty('isMoved')).toBeTruthy();
  expect(moveObj.hasOwnProperty('points')).toBeTruthy();
  expect(moveObj.isMoved).toBeTruthy();
  expect(moveObj.points).toBe(8);
  expect(board.mergedTiles[0]).toBe(board.getTile(3, 0));
  expect(board.getTile(3, 0).value).toBe(8);
});

it('should not move tiles right and left', () => {
  // 2 4 8 16 => 2 4 8 16

  let value = 2,
    moveObj;
  for (let j = 0; j < COLS; j++) {
    board.setTile(new Coord(0, j), value *= 2);
  }
  moveObj = board.move(directions.RIGHT);
  expect(moveObj.isMoved).toBeFalsy();
  expect(moveObj.points).toBe(0);
  expect(board.mergedTiles.length).toBe(0);

  moveObj = board.move(directions.LEFT);
  expect(moveObj.isMoved).toBeFalsy();
  expect(moveObj.points).toBe(0);
  expect(board.mergedTiles.length).toBe(0);
});

it('should not move tiles up and down', () => {
  /*
    2 => 2
    4 => 4
    8 => 8
    16 => 16
  */

  let value = 2,
    moveObj;
  for (let i = 0; i < ROWS; i++) {
    board.setTile(new Coord(i, 0), value *= 2);
  }
  moveObj = board.move(directions.UP);
  expect(moveObj.isMoved).toBeFalsy();
  expect(moveObj.points).toBe(0);
  expect(board.mergedTiles.length).toBe(0);

  moveObj = board.move(directions.DOWN);
  expect(moveObj.isMoved).toBeFalsy();
  expect(moveObj.points).toBe(0);
  expect(board.mergedTiles.length).toBe(0);
});

it('should not move tiles if not correct direction given', () => {

  // set tile to center of grid
  board.setTile(new Tile(new Coord(2, 2), 2));

  let moveObj = board.move('some strange direction');

  expect(moveObj).toBeFalsy();
});