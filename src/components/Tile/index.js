import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import './tile.css';

const Tile = ({coordX, coordY, style, value, isMerged}) => (
  <CSSTransitionGroup
    transitionName={isMerged
    ? "merge"
    : "tile"}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={50}>
    <div className="tile" key={value} id={coordX + ' ' + coordY} style={style}>{value || ""}</div>
  </CSSTransitionGroup>
);

Tile.PropTypes = {
  coordX: PropTypes.number.isRequired,
  coordY: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  isMerged: PropTypes.bool.isRequired
};

export default Tile;
