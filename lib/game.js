const Board = require('./board');

class Game {
  constructor(stage) {
    this.board = new Board(stage);
  }

  start() {
    // call stage.tick() to update & render the display list to canvas
  }

  isOver() {

  }
}

module.exports = Game;
