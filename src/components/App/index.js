import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Score from '../../containers/score';
import Dashboard from '../../containers/dashboard';
import Board from '../../containers/board';
import Popup from '../../containers/popup';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.move = props.move;
  }

  componentDidMount() {
    document.addEventListener('keyup', this.move.bind(this), false);
  }

  render() {
    return <div id="content">
      <Score/>
      <Dashboard/>
      <Popup/>
      <Board/>
    </div>;
  }
}

App.PropTypes = {
  move: PropTypes.func.isRequired,
  calculateScore: PropTypes.func.isRequired,
  scoreForMove: PropTypes.number.isRequired
};
