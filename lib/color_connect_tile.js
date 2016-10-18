class ColorConnectTile {
  constructor(pos, dotColor = null) {
    this.pos = pos;
    this.dotColor = dotColor;
    this.pathSegmentColor = null;
  }

  isNeighbor(otherTile) {
    // this null check takes places because of tile.jsx (handlePathClick). The previousTile
    // may not be set yet (i.e. null). This check prevents a verbose
    // check for null on tile.jsx (handlePathClick).
    if (otherTile === null) {
      return false;
    }

    return (
      ((otherTile.pos[0] - this.pos[0] === 0) && Math.abs(otherTile.pos[1] - this.pos[1]) === 1) ||
      ((otherTile.pos[1] - this.pos[1] === 0) && Math.abs(otherTile.pos[0] - this.pos[0]) === 1)
    );
  }
}

export default ColorConnectTile;
