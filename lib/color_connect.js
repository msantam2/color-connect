document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  // canvasElem.width = Game.DIM_X;
  // canvasElem.height = Game.DIM_Y;

  // ensure browser supports canvas
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(22, 88, 83, 1)';
    ctx.fillRect(30, 30, 200, 200);
  }
  // const game = new Game();
  // new GameView(game, ctx).start();
});
