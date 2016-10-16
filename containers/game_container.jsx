import Game from '../components/tile';
import { GameConstants, GameActions } from '../actions/game_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  currentColor: state.currentColor,
  previousTile: state.previousTile,
  boardReset: state.boardReset
});

export default connect(mapStateToProps)(Game); 
