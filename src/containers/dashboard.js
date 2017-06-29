import DashboardView from '../components/Dashboard';
import {connect} from 'react-redux';
import actionTypes from '../actions/actionTypes';
import createAction from '../actions/actionCreator';

const mapDispatchToProps = (dispatch) => ({
  newGame() {
    dispatch(createAction(actionTypes.NEW_GAME));
  }
});

export default connect(() => ({}), mapDispatchToProps)(DashboardView);