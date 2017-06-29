import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import {tileColors, tileFontSizes} from '../../constants';
import isEqual from '../../utils/objectEquality';
import './board.css';

const Board = ({tiles, mergedTiles}) => {

  let tileElements = tiles.map((tile, index) => {

    const isMerged = mergedTiles.some((el) => (isEqual(el, tile)));
    const style = {
      fontSize: tile
        .value
        .toString()
        .length <= 3
        ? tileFontSizes[3]
        : tileFontSizes[2],
      backgroundColor: tileColors[tile.value],
      top: (tile.coord.i * 100) + 'px',
      left: (tile.coord.j * 100) + 'px'
    };

    return <Tile value={tile.value} key={index} style={style} isMerged={isMerged}/>;
  });

  return <div id="board">
    {tileElements}
  </div>;
};

Board.PropTypes = {
  tiles: PropTypes.array,
  mergedTiles: PropTypes.array
};

export default Board;
