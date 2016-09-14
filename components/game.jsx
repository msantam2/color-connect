import React from 'react';
import * as ColorConnect from '../lib/color_connect';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new ColorConnect.Board(1);
    this.state = {board: board};
  }

  render() {
    return (
      <div>
        <Board board={this.state.board} />
      </div>
    );
  }
}

export default Game; 
