function init() {
  const stage = new createjs.Stage('canvas');
  const circle = new createjs.Shape(); // new Shape DisplayObject
  circle.graphics.beginFill('black').drawCircle(0, 0, 40);
  circle.x = circle.y = 50;
  stage.addChild(circle); // add circle shape to Stage display list
  stage.update();
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  init();
});
