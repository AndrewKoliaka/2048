import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import './popup.css';

const Popup = ({text, tryAgain, isVisible}) => (isVisible
  ? <CSSTransitionGroup
      transitionName="popup"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      <div key={text} id="result-popup">
        <h2>Game finished</h2>
        <p>{text}</p>
        <button onClick={tryAgain}>Try again</button>
      </div>
    </CSSTransitionGroup>
  : null);

Popup.PropTypes = {
  text: PropTypes.string.isRequired,
  tryAgain: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default Popup;
