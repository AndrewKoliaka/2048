import actionTypes from '../actions/actionTypes';
import {gameStatuses} from '../constants';
import board from '../scripts/board';

const initialState = {
  status: gameStatuses.ACTIVE,
  tiles: board.init(),
  mergedTiles: [],
  score: 0
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_GAME:
      board.init();
      return Object.assign({}, state, {
        status: gameStatuses.ACTIVE,
        score: 0,
        tiles: [...board.tiles]
      });
    case actionTypes.MOVE_TILES:
      let moveObj = board.move(action.direction);

      if (moveObj.isMoved) {
        board.addNewTile();
        if (board.isAvailableMove()) {
          return Object.assign({}, state, {
            tiles: [...board.tiles],
            score: state.score + (moveObj.points || 0),
            mergedTiles: board.mergedTiles
          });
        } else {
          return Object.assign({}, state, {
            tiles: [...board.tiles],
            status: gameStatuses.FINISHED
          });
        }
      }
      return state;
    default:
      return state;
  }
}