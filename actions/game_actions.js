export const GameConstants = {
  UPDATE_CURRENT_COLOR: 'UPDATE_CURRENT_COLOR',
  UPDATE_PREVIOUS_TILE: 'UPDATE_PREVIOUS_TILE',
  CREATE_BOARD: 'CREATE_BOARD',
  UPDATE_PATH_SEGMENT_COLOR: 'UPDATE_PATH_SEGMENT_COLOR',
  CLEAR_PATH: 'CLEAR_PATH',
  UPDATE_PATH_START_POSITION: 'UPDATE_PATH_START_POSITION'
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

  createBoard: level => ({
    type: GameConstants.CREATE_BOARD,
    level
  }),

  updatePathSegmentColor: (color, pos) => ({
    type: GameConstants.UPDATE_PATH_SEGMENT_COLOR,
    color: color,
    pos: pos
  }),

  clearPath: color => ({
    type: GameConstants.CLEAR_PATH,
    color
  }),

  updatePathStartPosition: (color, pos) => ({
    type: GameConstants.UPDATE_PATH_START_POSITION,
    color: color,
    pos: pos
  })
};
