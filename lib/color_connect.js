Board.COLOR_POSITIONS = {
  1: {
    red: [[0, 1], [3, 0]],
    orange: [[0, 6], [6, 4]],
    yellow: [[1, 4], [4, 4]],
    green: [[3, 4], [5, 4]],
    blue: [[2, 4], [3, 1]],
    '#9000f1': [[5, 1], [6, 3]],
    '#ca3089': [[2, 2], [6, 2]]
  },

  2: {

  },

  3: {

  }
};

Board.DELTAS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];


export class Board {
  constructor(level) {
    this.level = level;
    this.grid = [];
    this.validPathColors = [];
    this.generateBoard();
  }

  gridSize() {
    switch (this.level) {
      case (1):
        return 7;
      case (2):
        return 8;
      case (3):
        return 9;
      default:
        return 6;
    }
  }

  generateBoard() {
    let gridSize = this.gridSize();

    for (let i = 0; i < gridSize; i++) {
      this.grid.push([]);
    }

    this.populateBoard(gridSize);
  }

  populateBoard(gridSize) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let dotColor = this.dotColor([i, j]);
        if (dotColor) {
          this.grid[i][j] = new Tile([i, j], dotColor);
        } else {
          this.grid[i][j] = new Tile([i, j]);
        }
      }
    }
  }

  dotColor(pos) {
    let levelString = `${this.level}`;
    let colors = Object.keys(Board.COLOR_POSITIONS[levelString]);

    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
      let colorPositions = Board.COLOR_POSITIONS[levelString][color];
      for (let j = 0; j < colorPositions.length; j++) {
        if (this.areEqual(colorPositions[j], pos)) {
          return color;
        }
      }
    }

    return null;
  }

  areEqual(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }

  // validPathCreated(color, startTile, endTile) {
  //   if (this.sameColoredNeighbors(color, startTile).length === 0) {
  //     return false;
  //   } else if (startTile.isNeighbor(endTile)) {
  //     return true;
  //   }
  //
  //   let sameColoredNeighbors = this.sameColoredNeighbors(color, startTile);
  //
  //   let visitedTileIndex = sameColoredNeighbors.indexOf(this.visitedTiles[this.visitedTiles.length - 1]);
  //
  //   if (visitedTileIndex !== -1) {
  //     sameColoredNeighbors.splice(visitedTileIndex, 1);
  //   }
  //
  //   this.visitedTiles.push(startTile);
  //
  //   for (let i = 0; i < sameColoredNeighbors.length; i++) {
  //     let newStartTile = sameColoredNeighbors[i];
  //     if (this.validPathCreated(color, newStartTile, endTile)) {
  //       return true;
  //     }
  //   }
  //
  //   return false;
  // }
  validPathCreated(color, startTile, endTile, visitedTiles = []) {
    if (this.sameColoredNeighbors(color, startTile).length === 0) {
      return false;
    } else if (startTile.isNeighbor(endTile)) {
      return true;
    }

    let sameColoredNeighbors = this.sameColoredNeighbors(color, startTile);

    let visitedTileIndex = sameColoredNeighbors.indexOf(visitedTiles[visitedTiles.length - 1]);

    if (visitedTileIndex !== -1) {
      sameColoredNeighbors.splice(visitedTileIndex, 1);
    }

    visitedTiles.push(startTile);

    for (let i = 0; i < sameColoredNeighbors.length; i++) {
      let newStartTile = sameColoredNeighbors[i];
      if (this.validPathCreated(color, newStartTile, endTile, visitedTiles)) {
        return true;
      }
    }

    return false;
  }

  sameColoredNeighbors(color, startTile) {
    let sameColoredNeighbors = [];

    for (let i = 0; i < Board.DELTAS.length; i++) {
      let delta = Board.DELTAS[i];
      let newPos = [startTile.pos[0] + delta[0],
                    startTile.pos[1] + delta[1]];

      if (this.onBoard(newPos)) {
        let newTile = this.grid[newPos[0]][newPos[1]];

        let startTileColor = startTile.dotColor ? startTile.dotColor : startTile.filledPathColor;
        let newTileColor = newTile.dotColor ? newTile.dotColor : newTile.filledPathColor;

        if (startTileColor === newTileColor) {
          sameColoredNeighbors.push(newTile);
        }
      }
    }

    return sameColoredNeighbors;
  }

  onBoard(pos) {
    let x = pos[0];
    let y = pos[1];

    if ((x >= 0 && y >= 0) && (x < this.gridSize() && y < this.gridSize())) {
      return true;
    } else {
      return false;
    }
  }

  // won() {
  //   this.visitedTiles = [];
  //   this.validPathColors = [];
  //
  //   let gameWon = true;
  //   let colors = Object.keys(Board.COLOR_POSITIONS[this.level]);
  //
  //   for (let i = 0; i < colors.length; i++) {
  //     let color = colors[i];
  //     let startPos = Board.COLOR_POSITIONS[this.level][color][0];
  //     let endPos = Board.COLOR_POSITIONS[this.level][color][1];
  //     let startTile = this.grid[startPos[0]][startPos[1]];
  //     let endTile = this.grid[endPos[0]][endPos[1]];
  //
  //     if (!this.validPathCreated(color, startTile, endTile)) {
  //       gameWon = false;
  //     } else {
  //       this.validPathColors.push(color);
  //     }
  //   }
  //
  //   return gameWon;
  // }

  won() {
    let colors = Object.keys(Board.COLOR_POSITIONS[this.level]);
    return this.validPathColorz().length === colors.length;
  }

  validPathColorz() {
    let validPathColors = [];
    let colors = Object.keys(Board.COLOR_POSITIONS[this.level]);

    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
      let startPos = Board.COLOR_POSITIONS[this.level][color][0];
      let endPos = Board.COLOR_POSITIONS[this.level][color][1];
      let startTile = this.grid[startPos[0]][startPos[1]];
      let endTile = this.grid[endPos[0]][endPos[1]];

      if (this.validPathCreated(color, startTile, endTile)) {
        validPathColors.push(color);
      }
    }

    return validPathColors;
  }
}


export class Tile {
  constructor(pos, dotColor = null) {
    this.pos = pos;
    this.dotColor = dotColor;
    this.filledPathColor = null;
  }

  isNeighbor(otherTile) {
    return (
      ((otherTile.pos[0] - this.pos[0] === 0) && Math.abs(otherTile.pos[1] - this.pos[1]) === 1) ||
      ((otherTile.pos[1] - this.pos[1] === 0) && Math.abs(otherTile.pos[0] - this.pos[0]) === 1)
    );
  }
}
