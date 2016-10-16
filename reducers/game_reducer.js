import { GameConstants } from '../actions/game_actions';
import merge from 'lodash/merge';

const initialState = Object.freeze({
  currentColor: null,
  previousTile: null,
  boardReset: false
});

const GameReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case (GameConstants.UPDATE_CURRENT_COLOR):
      nextState = merge({}, state);
      nextState['currentColor'] = action.color;
      return nextState;
    case (GameConstants.UPDATE_PREVIOUS_TILE):
      nextState = merge({}, state);
      nextState['previousTile'] = action.tile;
      return nextState;
    case (GameConstants.TOGGLE_BOARD_RESET):
      nextState = merge({}, state);
      nextState['boardReset'] = !state['boardReset'];
      return nextState;
    default:
      return state;
  }
};

export default GameReducer;
