import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
  }

  render() {
    return (
      <div id='board'>
        {this.renderRows()}
      </div>
    );
  }

  renderRows() {
    const board = this.props.board;
    return board.grid.map((row, i) => {
      return (
        <div className='row' key={`row-${i}`}>
          {this.renderTiles(row, i)}
        </div>
      );
    });
  }

  renderTiles(row, i) {
    return row.map((tile, j) => {
      return (
        <Tile tile={tile} key={i + j} updateCurrentColor={this.props.updateCurrentColor} />
      );
    });
  }
}

export default Board;
