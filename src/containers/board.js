import {connect} from 'react-redux';
import BoardView from '../components/Board';

const mapStateToProps = (state) => ({tiles: state.tiles, mergedTiles: state.mergedTiles});

export default connect(mapStateToProps)(BoardView);