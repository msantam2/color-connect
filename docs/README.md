## Color Connect

### Background

Color Connect is a game that is all about connecting the dots! Colored dots, that is. Color Connect is a simple, intuitive (yet challenging) game that can be instantly played and enjoyed by anyone of any age. The player is provided a grid that contains several different colors scattered within it (2 dots of each color). The goal is to draw a line connecting dots of the same color. Sound easy? Make sure to adhere to the following rules:

- No lines may overlap
- Every space in the grid must be filled (either by a colored dot or a segment of a line)

Good luck!

### Functionality & MVP  

In a game of Color Connect, users will be able to:

- [ ] Click on the color they want to start connecting
- [ ] Click on empty grid spaces to begin drawing the line (if the line overlaps an existing line segment, it will replace this line segment)
- [ ] Reset the initial state of the grid
- [ ] Complete a round and move on to the next level (higher difficulty - i.e. 5x5 grid -> 6x6 grid -> 7x7 grid)

In addition, this project will include:

- [ ] An About Modal explaining the simple rules of the game
- [ ] A production README

### Wireframes

Color Connect will consist of a simple UI. The dominant component will be the board (grid) in the middle of the screen, which will be symmetric (i.e. NxN). This board will contain generated pairs of colors in scattered positions. There will be an About button near the board that, upon clicking, renders a modal that outlines the rules of the game. The Level will be clearly displayed on top of the board, with an adjacent button option to reset the board.
At the footer of the UI will be links to GitHub and LinkedIn.

![wireframes](https://github.com/msantam2/color-connect/blob/master/images/color_connect_wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be two scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM. Will keep track of overall gameplay.

`cell.js`: this script will handle the logic of tracking the canvas element contained within each cell of the board (dot, horizontal line segment, vertical line segment, empty).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of the 2 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Re-familiarize myself with Canvas
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid. Build in the ability to render the board with preset colored dots.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, tracking the state of the current color on each click of the dot

**Day 3**:  Write logic to draw lines within the grid. If the rules are followed and the game is won, `board.js` should check for this condition and be aware of when it is met.

- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one level of the game to the next

**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for both resetting the initial board state and also moving on to the next level. There will be 3 total levels of play (5x5, 6x6, 7x7).
- Have a styled `Canvas`, nice looking controls and title

### Bonus features

In order to create more diverse and interesting gameplay, anticipated bonus features include the following:

- [ ] Add several 'bridge' cells to the board. This means the user can utilize bridges when drawing lines to 'overlap' other lines, legally.
- [ ] Add more difficult levels, such as 9x9 or 10x10 grids.  
- [ ] Add an option to view the solution to the current board
- [ ] Include the time it took the user to complete each level successfully
