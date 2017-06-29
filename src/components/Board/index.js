import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import {tileColors, tileFontSizes} from '../../constants';
import './board.css';

const Board = ({tiles, mergedTiles}) => {

  let tileElements = tiles.map((tile, index) => {
    const isMerged = mergedTiles.some((el) => (el.coord.i === tile.coord.i && el.coord.j === tile.coord.j));
    const style = {
      fontSize: tile
        .value
        .toString()
        .length <= 3
        ? tileFontSizes[3]
        : tileFontSizes[2],
      backgroundColor: tileColors[tile.value] || 'white',
      top: (tile.coord.i * 100) + 'px',
      left: (tile.coord.j * 100) + 'px'
    };

    return <Tile value={tile.value} key={index} style={style} isMerged={isMerged}/>;
  });

  // let gridView = tiles.map((row, y) => {   return row.map((el, x) => {     if
  // (el) {       const isMerged = mergedTiles.some((el) => (el.i === y && el.j
  // === x));       const style = {         fontSize: el           .toString()
  // .length <= 3           ? tileFontSizes[3]           : tileFontSizes[2],
  // backgroundColor: tileColors[el] || 'white',         top: (y * 100) + 'px',
  // left: (x * 100) + 'px'       };       return <Tile coordX={x} coordY={y}
  // value={el} style={style} isMerged={isMerged}/>;     }     return ''; }); });

  return <div id="board">
    {tileElements}
  </div>;
};

Board.PropTypes = {
  tiles: PropTypes.array,
  mergedTiles: PropTypes.array
};

export default Board;
