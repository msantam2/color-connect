import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props); // this.props.validPaths
    this.state = {pathSegmentColor: null};
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.renderPathSegment = this.renderPathSegment.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleDotClick(dotColor) {
    this.props.updateCurrentColor(dotColor);
    this.props.updatePreviousPos(this.props.tile.pos);
  }

  handlePathClick() {
    if (this.state.pathSegmentColor === this.props.currentColor) {
      this.clearState();
    } else if (this.props.previousPos && this.props.tile.isNeighbor(this.props.previousPos)) {
      this.setState({
        pathSegmentColor: this.props.currentColor
      });
      this.props.updatePreviousPos(this.props.tile.pos);
      this.props.tile.filledPathColor = this.props.currentColor;
    }
  }

  renderPathSegment() {
    if (this.state.pathSegmentColor) {
      return <PathSegment color={this.state.pathSegmentColor} />;
    }
  }

  clearState() {
    this.setState({
      pathSegmentColor: null
    });
  }

  componentDidUpdate() {
    if (this.props.reset) {
      this.props.updateReset();
      this.clearState();
    }
  }

  render() {
    let tileContent;
    let cursorReset;

    if (this.props.tile.dotColor) {
      let dotColor = `${this.props.tile.dotColor}`;
      let coloredDotStyle;
      if (this.props.validPaths.includes(dotColor)) {
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
