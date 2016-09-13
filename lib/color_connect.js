let Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const stage = new createjs.Stage(canvas);

  const game = new Game(stage);
  game.start();
});
