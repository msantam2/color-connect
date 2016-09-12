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

![wireframes]()

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.  It's okay if you don't have all the details of implementation fleshed out, but you should have a solid roadmap by Monday morning.

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`automata.js`: this script will handle the logic behind the scenes.  An Automata object will hold a `type` (hexagon, triangle, or square) and a 2D array of `Cell`s.  It will be responsible for doing neighbor checks for each `Cell` upon iteration and updating the `Cell` array appropriately.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click
- Do the same for triangular and hexagonal grids

**Day 3**: Create the automata logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add options for different rule sets
- [ ] Add multiple choices for starting states that are interesting
- [ ] Explore multi-state versions of the game, such as the ones outlined [here](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html)
