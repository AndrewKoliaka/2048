import React from 'react';
import PropTypes from 'prop-types';
import './score.css';

const Score = ({score}) => (
  <div id="stats-table">Score:
    <span id="stats-table__score"> {score}</span>
  </div>
);

Score.PropTypes = {
  score: PropTypes.number.isRequired
};

export default Score;