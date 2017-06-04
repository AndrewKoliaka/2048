import React, { Component } from 'react';
import './score.css';

class Score extends Component {
    render(){
        return <div id="stats-table">Score: <span id="stats-table__score">0</span></div>
    }
}

export default Score;