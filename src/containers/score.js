import ScoreView from '../components/Score';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({score: state.score});

export default connect(mapStateToProps)(ScoreView);