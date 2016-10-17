import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathSegmentColor: null};
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.renderPathSegment = this.renderPathSegment.bind(this);
    this.clearColor = this.clearColor.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  handleDotClick(dotColor) {
    this.props.updateCurrentColor(dotColor);
    this.props.updatePreviousTile(this.props.tile);
  }

  handlePathClick() {
    if (this.state.pathSegmentColor) {
      this.clearColor();
    } else if (this.props.previousTile && this.props.tile.isNeighbor(this.props.previousTile)) {
      this.setColor();
      this.props.updatePreviousTile(this.props.tile);
      this.props.tile.filledPathColor = this.props.currentColor;
    }
  }

  renderPathSegment() {
    if (this.state.pathSegmentColor) {
      return <PathSegment color={this.state.pathSegmentColor} />;
    }
  }

  clearColor() {
    this.setState({
      pathSegmentColor: null
    });
  }

  setColor() {
    this.setState({
      pathSegmentColor: this.props.currentColor
    });
  }

  componentDidUpdate() {
    if (this.props.boardReset) {
      this.props.toggleBoardReset(); // i.e. true to false
      this.clearColor();
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
