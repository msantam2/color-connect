const Cell = require ('./cell');

class Board {
  constructor(stage) {
    this.stage = stage;
    this.cells = [];
    this.drawBoard();
  }

  drawBoard() {
    var square = new createjs.Shape();
    square.graphics.beginFill("red").drawRect(0, 0, 50, 50);
    square.x = 200;
    square.y = 200;
    this.stage.addChild(square);
    this.stage.update();
  }
}

module.exports = Board;
