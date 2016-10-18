# Color Connect

[Color Connect live!][colorConnect]
[colorConnect]: https://msantam2.github.io/color-connect/

Color Connect is a game built with JS/React/Redux that is all about connecting the dots! Colored dots, that is. Inspired by Flow Free, the player is provided with a board that contains several different colors scattered within it (2 dots of each color). The goal is to draw a path connecting dots of the same color. The player must make sure to adhere to the following rules:

- No paths may overlap
- Every space on the board must be filled (either by a colored dot or a segment of a path)

<img src="https://github.com/msantam2/color-connect/blob/master/images/blank_board.png" width="400" height="400" />
<img src="https://github.com/msantam2/color-connect/blob/master/images/gameplay.gif" width="400" height="400" />

-----------

## Architecture & Technologies (React/Redux)

Color Connect is a single-page, frontend game written in JavaScript in conjunction with React and Redux. This structure leads to a clean separation of concerns:

| vanilla JavaScript | React Components | Redux Store |
| --------------     | --------------   | -------------- |
| Game (Business) logic | Presentation logic | Global application state |

The React component hierarchy is as follows:<br></br>
Game > Board > Tile > PathSegment<br></br>

This hierarchy, when working with Redux, allows for a simple-to-follow (and debug) uni-directional data flow that trickles down to the Tile component, where the majority of the user interaction is handled. This makes sense: when boiled down, the user is primarily interfacing with the tiles themselves.

The application's state is abstracted out and kept in the Redux store. This results in a 'single source of truth', minimizing local state within components and allowing the app to be maintainable and easy to understand. The global store contains the following key-value pairs:
```js
const preloadedState = {
  board: board,
  level: 1,
  currentColor: null,
  previousTile: null,
  pathStartPositions: {}
};
```
All information about the board (which contains the tiles and their corresponding colors) is nicely packaged in this store and is made available to the React components for presentational purposes.

---------

## Features

### Creating Paths

Each Tile component's event handlers dispatch actions to update the Redux store:
```js
handleDotClick(dotColor) {
  this.props.updateCurrentColor(dotColor);
  this.props.updatePreviousTile(this.props.tile);
  this.props.clearPath(dotColor);
}
```

```js
handlePathClick() {
  let pathSegmentColor = this.props.tile.pathSegmentColor;
  let pos = this.props.tile.pos;

  if (this.props.tile.isNeighbor(this.props.previousTile)) {
    if (this.props.previousTile.dotColor) {
      this.props.updatePathStartPosition(this.props.currentColor, this.props.tile.pos);
    }
    this.props.updatePathSegmentColor(this.props.currentColor, pos);
    this.props.updatePreviousTile(this.props.tile);
  }
}
```

### Winning Condition

Upon each re-render of the React hierarchy, the game must be responsible for checking if the player has won. In order to achieve this, a recursive function is utilized that iterates through each color and checks the path from the starting dot tile to the ending dot tile.

```js
validPathCreated(startTile, endTile, visitedTiles = []) {
  if (this.sameColoredNeighbors(startTile).length === 0) {
    return false;
  } else if (startTile.isNeighbor(endTile)) {
    return true;
  }

  let sameColoredNeighbors = this.sameColoredNeighbors(startTile);
  visitedTiles.push(startTile);
  let filteredNeighbors = sameColoredNeighbors.filter(el => {
    return !visitedTiles.includes(el);
  });

  for (let i = 0; i < filteredNeighbors.length; i++) {
    let newStartTile = filteredNeighbors[i];
    if (this.validPathCreated(newStartTile, endTile, visitedTiles)) {
      return true;
    }
  }

  return false;
}
```
validPathCreated calls a helper ```sameColoredNeighbors``` to gather the adjacent path tiles, and effectively subtracts the already ```visitedTiles``` to produce ```filteredNeighbors```. This way, when checking the validity of a path, an infinite loop is avoided that would be caused by a path checking adjacent tiles back and forth.

If every colored pair is connected by a valid path, the player can give themselves a pat on the back because they have beat the level!

---------

## Future Directions for Color Connect

### Dragging Paths

In the near future I plan to enhance the UX by allowing the user to simply click-and-drag paths on the board.

### Path Segments

I plan to dynamically render React tile sub-components that display the direction of a path more clearly (e.g. vertical lines, horizontal lines, and bent-lines)
