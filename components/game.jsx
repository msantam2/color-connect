import React from 'react';
import * as ColorConnect from '../lib/color_connect';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new ColorConnect.Board(1);
    this.state = {board: board,
                  currentColor: null,
                  currentPos: null,
                  previousPos: null,
                  reset: false};
    this.resetLevel = this.resetLevel.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.updateCurrentPos = this.updateCurrentPos.bind(this);
    this.updatePreviousPos = this.updatePreviousPos.bind(this);
    this.updateReset = this.updateReset.bind(this);
  }

  resetLevel() {
    const newBoard = new ColorConnect.Board(1);
    this.setState({
      board: newBoard,
      reset: true
    });
  }

  updateReset() {
    this.setState({
      reset: false,
      currentColor: null
    });
  }

  updateCurrentColor(color) {
    this.setState({
      currentColor: color
    });
  }

  updateCurrentPos(pos) {
    this.setState({
      currentPos: pos
    });
  }

  updatePreviousPos(pos) {
    this.setState({
      previousPos: pos
    });
  }

  render() {
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
        <Board board={this.state.board}
               currentColor={this.state.currentColor}
               updateCurrentColor={this.updateCurrentColor}
               updateCurrentPos={this.updateCurrentPos}
               updatePreviousPos={this.updatePreviousPos}
               previousPos={this.state.previousPos}
               reset={this.state.reset}
               updateReset={this.updateReset} />
      </div>
    );
  }
}

export default Game;
