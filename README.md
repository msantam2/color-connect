# Color Connect

[Color Connect live!][colorConnect]
[colorConnect]: https://msantam2.github.io/color-connect/

Color Connect is a game that is all about connecting the dots! Colored dots, that is. The player is provided a grid that contains several different colors scattered within it (2 dots of each color). The goal is to draw a line connecting dots of the same color. The player must make sure to adhere to the following rules:

- [ ] No lines may overlap
- [ ] Every space in the grid must be filled (either by a colored dot or a segment of a line)

![wireframes](https://github.com/msantam2/color-connect/blob/master/images/blank_grid.png)
![wireframes](https://github.com/msantam2/color-connect/blob/master/images/grid.png)

## Architecture & Technologies

### Single-Page Game

Color Connect is a single-page browser-based game written in vanilla JavaScript in conjunction with React.js. The Board itself is a React component which contains a series of Tile components. The Tile components can be divided into 2 categories: 1) fixed colored dots the user must connect or 2) an empty tile that will dynamically update its color based off user input.

This game-structure is fundamentally implemented through the following code:

```js
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
```
If the Tile position is equal to a preset dot position, it will be initialized with that dot's color and later become a 'fixed dot component'.
For each level, the colored dots must be preset in order to ensure there is a correct solution for each level. If the board were randomly generated as many other games are, it is possible a colored dot may be trapped in a corner of the board, not allowing a valid path to ever be connected to/from this dot.

## Features

Upon each re-render of the React Board component, the game must be responsible for checking if the player has been won (there is only one correct solution for each level). In order to achieve this, a recursive solution is utilized that iterates through each color and checks every connection from the starting color tile to the ending color tile. If each color pair is connected by a valid path, the user has won.

As seen in the following code, #validPathCreated is implementing the recursive call, stepping from tile to tile in order to check if the path leads to the 'endTile' (i.e. has a neighbor of 'endTile'). In order to avoid infinite looping, already visited positions are stored within an instance variable 'this.visitedTiles'. Since the path proceeds in a step-wise fashion, only the last visited Tile needs to be removed from the current Tile's list of neighbors (LIFO fashion).

```js
won() {
  this.visitedTiles = [];
  let colors = Object.keys(Board.COLOR_POSITIONS[this.level]);

  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    let startPos = Board.COLOR_POSITIONS[this.level][color][0];
    let endPos = Board.COLOR_POSITIONS[this.level][color][1];
    let startTile = this.grid[startPos[0]][startPos[1]];
    let endTile = this.grid[endPos[0]][endPos[1]];

    if (!this.validPathCreated(color, startTile, endTile)) {
      return false;
    }
  }

  return true;
}
```

```js
validPathCreated(color, startTile, endTile) {
  if (this.sameColoredNeighbors(color, startTile).length === 0) {
    return false;
  } else if (startTile.isNeighbor(endTile.pos)) {
    return true;
  }

  let sameColoredNeighbors = this.sameColoredNeighbors(color, startTile);
  let visitedTileIndex = sameColoredNeighbors.indexOf(this.visitedTiles[this.visitedTiles.length - 1]);
  if (visitedTileIndex !== -1) {
    sameColoredNeighbors.splice(visitedTileIndex, 1);
  }
  this.visitedTiles.push(startTile);

  for (let i = 0; i < sameColoredNeighbors.length; i++) {
    let newStartTile = sameColoredNeighbors[i];
    if (this.validPathCreated(color, newStartTile, endTile)) {
      return true;
    }
  }

  return false;
}
```

```js
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
```

## Future Directions for Color Connect

### Path Segments

In order to enhance the user experience of Color Connect, I plan in the near future to dynamically render React tile sub-components that display the direction of a path more clearly (e.g. vertical lines, horizontal lines, and bent-lines)

### Solutions

If the player becomes stuck to the point of not being able to proceed, a very useful feature I plan to implement is to allow the player to select an option to view the solution and proceed to the next level. The solution will be instantly populated on the player's view of the board.
