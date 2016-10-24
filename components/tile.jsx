import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleColoredTile = this.handleColoredTile.bind(this);
    this.handleEmptyTile = this.handleEmptyTile.bind(this);
    this.renderPathSegment = this.renderPathSegment.bind(this);
  }

  handleColoredTile(tileColor, isDot) {
    this.props.updateCurrentColor(tileColor);
    this.props.updatePreviousTile(this.props.tile);

    if (isDot) {
      this.props.clearPath(tileColor);
    }
  }

  handleEmptyTile(e) {
    // e.buttons === 1 simply checks that the mouse is pressed down
    // i.e. creating the feeling of clicking and dragging a path
    if (e.buttons === 1) {
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
  }

  renderPathSegment() {
    if (this.props.tile.pathSegmentColor) {
      return <PathSegment color={this.props.tile.pathSegmentColor} />;
    }
  }

  render() {
    let tileContent;
    let cursorReset;

    if (this.props.tile.dotColor) {
      let dotColor = `${this.props.tile.dotColor}`;
      let coloredDotStyle;
      if (this.props.validPathColors.includes(dotColor)) {
        coloredDotStyle = {background: dotColor, border: '3px solid #3ff858'};
      } else {
        coloredDotStyle = {background: dotColor};
      }
      cursorReset = 'cursor-reset';

      tileContent =  <div className='colored-dot'
                          style={coloredDotStyle}
                          onMouseDown={this.handleColoredTile.bind(null, dotColor, true)}>
                     </div>;
    } else {
      tileContent = <div className='path-tile'
                         onMouseDown={this.handleColoredTile.bind(null, this.props.tile.pathSegmentColor, false)}
                         onMouseOver={this.handleEmptyTile}>
                         {this.renderPathSegment()}
                    </div>;
    }

    return (
      <div className={`tile ${cursorReset}`}>
        {tileContent}
      </div>
    );
  }
}

export default Tile;
