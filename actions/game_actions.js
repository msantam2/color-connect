export const GameConstants = {
  UPDATE_CURRENT_COLOR: 'UPDATE_CURRENT_COLOR',
  UPDATE_PREVIOUS_TILE: 'UPDATE_PREVIOUS_TILE',
  TOGGLE_BOARD_RESET: 'TOGGLE_BOARD_RESET'
};

export const GameActions = {
  updateCurrentColor: color => ({
    type: GameConstants.UPDATE_CURRENT_COLOR,
    color
  }),

  updatePreviousTile: tile => ({
    type: GameConstants.UPDATE_PREVIOUS_TILE,
    tile
  }),

  toggleBoardReset: () => ({
    type: GameConstants.TOGGLE_BOARD_RESET
  })
};
