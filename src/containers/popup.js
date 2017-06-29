import PopupView from '../components/Popup';
import {connect} from 'react-redux';
import {gameStatuses} from '../constants';
import actionTypes from '../actions/actionTypes';
import createAction from '../actions/actionCreator';

const mapStateToProps = (state) => ({
  text: state.score >= 5000
    ? "Not bad"
    : "Don't be upset, you have everything ahead",
  isVisible: state.status === gameStatuses.FINISHED
});

const mapDispatchToProps = (dispatch) => ({
  tryAgain() {
    dispatch(createAction(actionTypes.NEW_GAME));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupView);