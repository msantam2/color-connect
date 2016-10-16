import { GameConstants } from '../actions/game_actions';
import merge from 'lodash/merge';

const GameReducer = (state, action) => {
  let nextState;

  switch (action.type) {
    case (GameConstants.UPDATE_CURRENT_COLOR):
      const currentColor = action.color;
      return merge({}, state, {
        currentColor
      });
    case (GameConstants.UPDATE_PREVIOUS_TILE):
      const previousTile = action.tile;
      return merge({}, state, {
        previousTile
      });
    case (GameConstants.TOGGLE_BOARD_RESET):
      const boardReset = !state['boardReset'];
      return merge({}, state, {
        boardReset
      });
    default:
      return state;
  }
};

export default GameReducer;
