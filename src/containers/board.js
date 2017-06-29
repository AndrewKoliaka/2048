import {connect} from 'react-redux';
import BoardView from '../components/Board';

const mapStateToProps = (state) => ({grid: state.grid, mergedTiles: state.mergedTiles});

export default connect(mapStateToProps)(BoardView);