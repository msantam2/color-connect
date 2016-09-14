import React from 'react';
import * as ColorConnect from '../lib/color_connect';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new ColorConnect.Board(1);
    this.state = {board: board,
                  currentColor: null};
    this.resetLevel = this.resetLevel.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
  }

  resetLevel() {
    const board = new ColorConnect.Board(1);
    this.setState({
      board: board
    });
  }

  updateCurrentColor(color) {
    this.setState({
      currentColor: color
    });
  }

  render() {
    debugger
    let modal;
    if (this.state.board.won()) {
      const text = "You won!";
      modal =
        <div className='modal-screen'>
          <div className='modal-content'>
            <p className='you-won'>{text}</p>
            <button onClick={this.resetLevel}>Play Again</button>
          </div>
        </div>;
    }

    return (
      <div>
        {modal}
        <button className='reset-btn' onClick={this.resetLevel}>Reset</button>
        <Board board={this.state.board} updateCurrentColor={this.updateCurrentColor} />
      </div>
    );
  }
}

export default Game;
