# Color Connect

[Color Connect live!][colorConnect]
[colorConnect]: https://msantam2.github.io/color-connect/

Color Connect is a game built with JS/React/Redux that is all about connecting the dots! Colored dots, that is. Inspired by Flow Free, the player is provided with a board that contains several different colors scattered within it (2 dots of each color). The goal is to draw a path connecting dots of the same color. The player must make sure to adhere to the following rules:

- No paths may overlap
- Every space on the board must be filled (either by a colored dot or a segment of a path)

<img src="https://github.com/msantam2/color-connect/blob/master/images/blank_board.png" width="440" height="440" />
<img src="https://github.com/msantam2/color-connect/blob/master/images/gameplay.gif" width="400" height="440" />

-----------

## Architecture & Technologies (React/Redux)

Color Connect is a single-page, frontend game built with vanilla JavaScript in conjunction with React/Redux. This structure leads to a clean separation of concerns:

| vanilla JavaScript | React Components | Redux Store |
| --------------     | --------------   | -------------- |
| Game (Business) logic | Presentation logic | Global application state |

The React component hierarchy is as follows:

Game > Board > Tile

This hierarchy, when working with Redux, allows for a simple-to-follow (and debug) uni-directional data flow that trickles down to the Tile component, where the majority of the user interaction is handled. This makes sense: when boiled down, the user is primarily interfacing with the tiles themselves.

The application state is abstracted out and kept in the Redux store. This results in a 'single source of truth', minimizing local state within components and allowing the app to be maintainable and easy to understand. The global store contains the following properties:
```js
const preloadedState = {
  board: board,
  currentColor: null,
  previousTile: null,
  pathStartPositions: {}
};
```
All information about the board (including the level and tile colors) is nicely packaged in this store and is made available to the React components for presentational purposes.

---------

## Features & Implementation Details

### Drawing Paths by Dragging (React Synthetic Events)

```onMouseDown``` and ```onMouseOver``` event listeners are bound to dot tiles and path segment tiles, as seen below in ```tileContent```. These event listeners are of type SyntheticEvent, React events that serve as wrappers for native web API event listeners. These listeners are added to the ```<div>``` element as attributes and create the functionality of clicking (```onMouseDown```) and dragging (```onMouseOver```) to create a new path.

dot tile:
```js
tileContent =  <div className='colored-dot'
                    style={coloredDotStyle}
                    onMouseDown={this.handleColoredTile.bind(null, dotColor, true)}>
               </div>;
```
<br></br>
path segment tile:
```js
tileContent = <div className='path-tile'
                   onMouseDown={this.handleColoredTile.bind(null, this.props.tile.pathSegmentColor, false)}
                   onMouseOver={this.handleEmptyTile}>
                   {this.renderPathSegment()}
              </div>;
```
<br></br>
In order to ensure the user is both clicking AND dragging to create a path, we add a simple check in ```handleEmptyTile```:

```js
handleEmptyTile(e) {
  if (e.buttons === 1) {
    // event handler code
  }
}
```

The statement ```e.buttons === 1``` (```e``` being the event object) is a simple and elegant way to check if the mouse is currently being pressed down while the path is being dragged on the board. If the mouse is being pressed, ```e.buttons``` has a value of 1; if not, ```e.buttons``` has a value of 0.

This implementation results in a faster and much more enjoyable experience for the player.

### Winning Condition (Recursion)

Upon each re-render of the React hierarchy, the game must be responsible for checking if the player has won. In order to achieve this, a recursive function is utilized in our game logic that iterates through each color and checks the path from the starting dot tile to the ending dot tile.

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
validPathCreated calls the helper function ```sameColoredNeighbors``` to gather all adjacent path tiles, and then removes the already ```visitedTiles``` to produce ```filteredNeighbors```. This way, when checking the validity of a path, an infinite loop is avoided that would be caused by checking adjacent tiles back and forth. We want to 'step through' the path from tile to tile, evaluating if we have reached the end at each step.

---------

## Future Directions for Color Connect

### Path Segments

I plan to dynamically render Tile components that display the direction of a path more clearly (e.g. vertical lines, horizontal lines, and bent-lines)
