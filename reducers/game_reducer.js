import { GameConstants } from '../actions/game_actions';
import merge from 'lodash/merge';
import ColorConnectBoard from '../lib/color_connect_board';

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
    case (GameConstants.CREATE_BOARD):
      const board = new ColorConnectBoard(action.level);
      return merge({}, state, {
        board
      });
    case (GameConstants.UPDATE_PATH_SEGMENT_COLOR):
      nextState = merge({}, state); // board has grid of tiles
      let [x, y] = action.pos;
      nextState.board.grid[x][y].pathSegmentColor = action.color;
      return nextState;
    case (GameConstants.CLEAR_PATH):
      nextState = merge({}, state);
      for (let i = 0; i < nextState.board.grid.length; i++) {
        let row = nextState.board.grid[i];
        for (let j = 0; j < row.length; j++) {
          let tile = nextState.board.grid[i][j];
          if (tile.pathSegmentColor === action.color) {
            tile.pathSegmentColor = null;
          }
        }
      }
      return nextState;
    case (GameConstants.UPDATE_PATH_START_POSITION):
      nextState = merge({}, state);
      nextState['pathStartPositions'][action.color] = action.pos;
      return nextState;
    default:
      return state;
  }
};

export default GameReducer;
