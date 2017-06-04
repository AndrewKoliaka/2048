import React, {
    Component
} from 'react';
import Tile from '../Tile/Tile';
import './board.css';

class Board extends Component {
    render() {
        return <div id="board">
                <Tile / >
            </div>
    }
}

export default Board;