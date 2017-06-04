import React, {
    Component
} from 'react';

import Board from '../Board/Board';
import Score from '../Score/Score';
import './app.css';

class App extends Component {
    render() {
        return <div id="content">
            <h1> 2048 </h1>
            <Score />
            <Board />
        </div>;
    }
}

export default App;