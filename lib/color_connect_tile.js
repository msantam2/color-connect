class ColorConnectTile {
  constructor(pos, dotColor = null) {
    this.pos = pos;
    this.dotColor = dotColor;
    this.pathSegmentColor = null;
  }

  isNeighbor(otherTile) {
    return (
      ((otherTile.pos[0] - this.pos[0] === 0) && Math.abs(otherTile.pos[1] - this.pos[1]) === 1) ||
      ((otherTile.pos[1] - this.pos[1] === 0) && Math.abs(otherTile.pos[0] - this.pos[0]) === 1)
    );
  }
}

export default ColorConnectTile;
