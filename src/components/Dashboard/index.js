import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.css';

const Dashboard = ({newGame}) => (
  <div id="dashboard">
    <button id="new-game-btn" onClick={newGame}>New game</button>
  </div>
);

Dashboard.PropTypes = {
  onClick: PropTypes.func.isRequired
};

export default Dashboard;