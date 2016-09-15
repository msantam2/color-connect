export class Board {
  constructor(level) {
    this.level = level;
    this.grid = [];
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
          this.grid[i][j] = new Tile(this, [i, j], dotColor);
        } else {
          this.grid[i][j] = new Tile(this, [i, j]);
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

  won() {
    let flattenedGrid = [].concat.apply([], this.grid);

    for (let i = 0; i < flattenedGrid.length; i++) {
      if (!(flattenedGrid[i].dotColor || flattenedGrid[i].filledPathColor)) {
        return false;
      }
    }

    return true;
  }
}

Board.COLOR_POSITIONS = {
  1: {
    red: [[0, 1], [3, 0]],
    orange: [[0, 6], [6, 4]],
    yellow: [[1, 4], [4, 4]],
    green: [[3, 4], [5, 4]],
    blue: [[2, 4], [3, 1]],
    purple: [[5, 1], [6, 3]],
    aqua: [[2, 2], [6, 2]]
  },

  2: {

  },

  3: {

  }
};

export class Tile {
  constructor(board, pos, dotColor = null) {
    this.board = board;
    this.pos = pos;
    this.dotColor = dotColor;
    this.filledPathColor = null;
    this.isNeighbor = this.isNeighbor.bind(this);
  }

  isNeighbor(otherTile) {
    return (
      ((otherTile.pos[0] - this.pos[0] === 0) && Math.abs(otherTile.pos[1] - this.pos[1]) === 1) ||
      ((otherTile.pos[1] - this.pos[1] === 0) && Math.abs(otherTile.pos[0] - this.pos[0] === 1))
    );
  }
}
