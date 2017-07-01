import reducer from '../../reducers';
import actionTypes from '../../actions/actionTypes';
import createAction from '../../actions/actionCreator';
import board from '../../scripts/board';
import {gameStatuses, COLS, ROWS} from '../../constants';
import Tile from '../../scripts/tile';
import Coord from '../../scripts/coord';

it('should return the initial state', () => {
  let state = reducer(undefined, {});
  let tiles = board.tiles;
  expect(state).toEqual({status: gameStatuses.ACTIVE, tiles, mergedTiles: [], score: 0});
});

it('should handle NEW_GAME', () => {
  spyOn(board, 'init');

  let state = reducer(undefined, createAction(actionTypes.NEW_GAME));
  let tiles = board.tiles;
  expect(board.init).toHaveBeenCalled();
  expect(state).toEqual({status: gameStatuses.ACTIVE, score: 0, tiles, mergedTiles: []});
});

it('should handle MOVE_TILES', () => {
  spyOn(board, 'move');
  let state = reducer(undefined, createAction(actionTypes.MOVE_TILES, 'DOWN'));
  expect(board.move).toHaveBeenCalledWith("DOWN");
  expect(state).toEqual({status: gameStatuses.ACTIVE, tiles: board.tiles, mergedTiles: board.mergedTiles, score: 0});
});