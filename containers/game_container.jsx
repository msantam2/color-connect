import Game from '../components/game';
import { GameConstants, GameActions } from '../actions/game_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  currentColor: state.currentColor,
  previousTile: state.previousTile,
  boardReset: state.boardReset
});

const mapDispatchToProps = dispatch => ({
  updateCurrentColor: color => dispatch(GameActions.updateCurrentColor(color)),
  updatePreviousTile: tile => dispatch(GameActions.updatePreviousTile(tile)),
  toggleBoardReset: () => dispatch(GameActions.toggleBoardReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
