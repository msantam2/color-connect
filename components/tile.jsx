import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.renderPathSegment = this.renderPathSegment.bind(this);
  }

  handleDotClick(dotColor) {
    this.props.updateCurrentColor(dotColor);
    this.props.updatePreviousTile(this.props.tile);
    this.props.clearPath(dotColor);
  }

  handlePathClick() {
    let pathSegmentColor = this.props.tile.pathSegmentColor;
    let pos = this.props.tile.pos;

    if (this.props.tile.isNeighbor(this.props.previousTile) && this.props.previousTile.dotColor) {
      this.props.updatePathStartPosition(this.props.currentColor, this.props.tile.pos)
      this.props.updatePathSegmentColor(this.props.currentColor, pos);
      this.props.updatePreviousTile(this.props.tile);
    } else if (this.props.tile.isNeighbor(this.props.previousTile)) {
      this.props.updatePathSegmentColor(this.props.currentColor, pos);
      this.props.updatePreviousTile(this.props.tile);
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
                          onClick={this.handleDotClick.bind(null, dotColor)}>
                     </div>;
    } else {
      tileContent = <div className='path-tile' onClick={this.handlePathClick}>{this.renderPathSegment()}</div>;
    }

    return (
      <div className={`tile ${cursorReset}`}>
        {tileContent}
      </div>
    );
  }
}

export default Tile;
