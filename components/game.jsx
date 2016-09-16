import React from 'react';
import * as ColorConnect from '../lib/color_connect';
import Board from './board';
import Modal from 'react-modal';
import ModalStyle from '../stylesheets/modal_style';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new ColorConnect.Board(1);
    this.state = {board: board,
                  currentColor: null,
                  currentPos: null,
                  previousPos: null,
                  reset: false,
                  modalOpen: false};
    this.resetLevel = this.resetLevel.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.updateCurrentPos = this.updateCurrentPos.bind(this);
    this.updatePreviousPos = this.updatePreviousPos.bind(this);
    this.updateReset = this.updateReset.bind(this);
    this._handleAboutClick = this._handleAboutClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
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

  _handleAboutClick() {
    this.setState({
      modalOpen: true
    });
  }

  onModalClose() {
    this.setState({
      modalOpen: false
    });
    ModalStyle.content.opacity = 0;
  }

  onModalOpen() {
    ModalStyle.content.opacity = 100;
  }

  render() {
    let modal;
    if (this.state.board.won()) {
      const text = "You won!";
      modal =
        <div className='modal-screen'>
          <div className='modal-content'>
            <p className='you-won-text'>{text}</p>
            <button className='play-again-btn' onClick={this.resetLevel}>Play Again</button>
            <button className='next-level-btn'>Next Level</button>
          </div>
        </div>;
    }

    return (
      <div className='game-container'>
        {modal}
        <div className='game-header'>
          <button className='about-btn' onClick={this._handleAboutClick}>About</button>
          <h1 className='level-header'>{`Level ${this.state.board.level}`}</h1>
          <button className='reset-btn' onClick={this.resetLevel}>Reset</button>
        </div>
        <Board board={this.state.board}
               currentColor={this.state.currentColor}
               updateCurrentColor={this.updateCurrentColor}
               updateCurrentPos={this.updateCurrentPos}
               updatePreviousPos={this.updatePreviousPos}
               previousPos={this.state.previousPos}
               reset={this.state.reset}
               updateReset={this.updateReset} />

        <a href='https://github.com/msantam2/color-connect'><img  className='github' src='http://www.iconsdb.com/icons/preview/white/github-10-xxl.png ' /></a>
        <a href='https://www.linkedin.com/in/mattsantamaria123'><img  className='linkedin'  src='http://www.iconsdb.com/icons/preview/white/linkedin-xxl.png'  /></a>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          style={ModalStyle}
          onAfterOpen={this.onModalOpen}>

          <button onClick={this.onModalClose} className='about-close-btn'>&#10006;</button>
          <p className='about-info'>
            Color Connect is a game that is all about connecting the dots! Colored dots, that is. You are provided a grid that contains several different colors scattered within it (2 dots of each color). The goal is to draw a line connecting dots of the same color. Sound easy? Make sure to stick to the following rules:
            <br></br>
            <br></br>
            1. No lines may overlap
            <br></br>
            <br></br>
            2. Every space in the grid must be filled (either by a colored dot or a segment of a line)
            <br></br>
            <br></br>
            Good luck!
          </p>
        </Modal>
      </div>
    );
  }
}

export default Game;
