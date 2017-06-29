import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import './tile.css';

const Tile = ({style, value, isMerged}) => (value
  ? <CSSTransitionGroup
      transitionName={isMerged
      ? "merge"
      : "tile"}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={50}>
      <div className="tile" key={value} style={style}>{value}</div>
    </CSSTransitionGroup>
  : null);

Tile.PropTypes = {
  style: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  isMerged: PropTypes.bool.isRequired
};

export default Tile;
