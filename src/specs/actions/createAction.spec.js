import createAction from '../../actions/actionCreator';
import actionTypes from '../../actions/actionTypes';
import {directions} from '../../constants';

it('should create new_game action', () => {
    let action = createAction(actionTypes.NEW_GAME);
    expect(action.type).toBe(actionTypes.NEW_GAME);
    expect(action.direction).toBeUndefined();
});

it('should create move_tiles action', () => {
    let action = createAction(actionTypes.MOVE_TILES, directions.DOWN);
    expect(action.type).toBe(actionTypes.MOVE_TILES);
    expect(action.direction).toBe(directions.DOWN);
});