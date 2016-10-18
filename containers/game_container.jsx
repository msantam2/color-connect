import Game from '../components/game';
import { GameConstants, GameActions } from '../actions/game_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  board: state.board,
  currentColor: state.currentColor,
  previousTile: state.previousTile,
  pathStartPositions: state.pathStartPositions
});

const mapDispatchToProps = dispatch => ({
  updateCurrentColor: color => dispatch(GameActions.updateCurrentColor(color)),
  updatePreviousTile: tile => dispatch(GameActions.updatePreviousTile(tile)),
  updatePathSegmentColor: (color, pos) => dispatch(GameActions.updatePathSegmentColor(color, pos)),
  createBoard: level => dispatch(GameActions.createBoard(level)),
  clearPath: color => dispatch(GameActions.clearPath(color)),
  updatePathStartPosition: (color, pos) => dispatch(GameActions.updatePathStartPosition(color, pos))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
