import {connect} from 'react-redux';
import {keyCodes} from '../constants';
import AppView from '../components/App';
import actionTypes from '../actions/actionTypes';
import createAction from '../actions/actionCreator';

const mapDispatchToProps = (dispatch) => ({
  move(event) {
    dispatch(createAction(actionTypes.MOVE_TILES, keyCodes[event.keyCode]));
  }
});

export default connect(() => ({}), mapDispatchToProps)(AppView);
