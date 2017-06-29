import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import {tileColors, tileFontSizes} from '../../constants';
import './board.css';

const Board = ({grid, mergedTiles}) => {
  let gridView = grid.map((row, y) => {
    return row.map((el, x) => {
      if (el) {
        const isMerged = mergedTiles.some((el) => (el.i === y && el.j === x));

        const style = {
          fontSize: el
            .toString()
            .length <= 3
            ? tileFontSizes[3]
            : tileFontSizes[2],
          backgroundColor: tileColors[el] || 'white',
          top: (y * 100) + 'px',
          left: (x * 100) + 'px'
        };
        return <Tile coordX={x} coordY={y} value={el} style={style} isMerged={isMerged}/>;
      }
      return '';
    });
  });

  return <div id="board">
    {gridView}
  </div>;
};

Board.PropTypes = {
  grid: PropTypes.array,
  mergedTiles: PropTypes.array
};

export default Board;
