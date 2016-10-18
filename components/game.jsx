import React from 'react';
import ColorConnectBoard from '../lib/color_connect_board';
import Board from './board';
import Modal from 'react-modal';
import ModalStyle from '../stylesheets/modal_style';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false};
    this.resetLevel = this.resetLevel.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.startGameOver = this.startGameOver.bind(this);
    this._handleAboutClick = this._handleAboutClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
  }

  resetLevel() {
    this.props.createBoard(this.props.board.level);
  }

  nextLevel() {
    this.props.createBoard(this.props.board.level + 1);
  }

  startGameOver() {
    this.props.createBoard(1);
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
    let text;
    let buttons;

    let pathStartPositions = this.props.pathStartPositions;
    if (this.props.board.won(pathStartPositions)) {
      if (this.props.board.level === 3) {
        text = "Wow! You Beat All Levels!";
        buttons = <div>
                    <button className='start-game-over-btn' onClick={this.startGameOver}>Start Over</button>
                    <button className='github-link'><a href='https://github.com/msantam2/color-connect'>Check Out Code on GitHub!</a></button>
                  </div>;
      } else {
        text = "You Beat This Level!";
        buttons = <div>
                    <button className='play-again-btn' onClick={this.resetLevel}>Play Again</button>
                    <button className='next-level-btn' onClick={this.nextLevel}>Next Level</button>
                  </div>;
      }
      modal =
        <div className='modal-screen'>
          <div className='modal-content'>
            <p className='you-won-text'>{text}</p>
            {buttons}
          </div>
        </div>;
    }

    let dimensions = `${this.props.board.gridSize()}x${this.props.board.gridSize()}`;

    return (
      <div className='game-container'>
        {modal}
        <div className='game-header'>
          <button className='about-btn' onClick={this._handleAboutClick}>About</button>
          <h1 className='level-header'>{`Level ${this.props.board.level} (${dimensions})`}</h1>
          <button className='reset-btn' onClick={this.resetLevel}>Reset</button>
        </div>
        <Board board={this.props.board}
               validPathColors={this.props.board.validPathColors(this.props.pathStartPositions)}
               currentColor={this.props.currentColor}
               updateCurrentColor={this.props.updateCurrentColor}
               previousTile={this.props.previousTile}
               updatePreviousTile={this.props.updatePreviousTile}
               updatePathSegmentColor={this.props.updatePathSegmentColor}
               clearPath={this.props.clearPath}
               pathStartPositions={this.props.pathStartPositions}
               updatePathStartPosition={this.props.updatePathStartPosition} />

        <a href='https://github.com/msantam2/color-connect'><img  className='github' src='http://www.iconsdb.com/icons/preview/white/github-10-xxl.png ' /></a>
        <a href='https://www.linkedin.com/in/mattsantamaria123'><img  className='linkedin'  src='http://www.iconsdb.com/icons/preview/white/linkedin-xxl.png'  /></a>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          style={ModalStyle}
          onAfterOpen={this.onModalOpen}>

          <button onClick={this.onModalClose} className='about-close-btn'>&#10006;</button>
          <p className='about-info'>
            Welcome! You are provided a board that contains several different colors scattered within it (2 dots of each color). The goal is to draw a path connecting dots of the same color. Sound easy? Make sure to stick to the following rules:
            <br></br>
            <br></br>
            1. No paths may overlap
            <br></br>
            <br></br>
            2. Every space on the board must be filled (either by a colored dot or a segment of a path)
            <br></br>
            <br></br>
            To undo moves, you can click on a colored dot, which clears the current path for that color from the board.
            <br></br>
            Also, you can click the 'Reset' button to the top-right of the board, which clears the whole board
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
