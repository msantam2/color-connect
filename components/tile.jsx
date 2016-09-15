import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props); // has access to vanilla JS tile object
    this.state = {pathSegmentColor: null};
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.pathSegment = this.pathSegment.bind(this);
  }

  handleDotClick(event) {
    let currentColor = event.target.id;
    let previousPos = this.props.tile.pos;
    this.props.updateCurrentColor(currentColor);
    this.props.updatePreviousPos(previousPos);
  }

  handlePathClick(event) {
    if (this.props.previousPos && this.props.tile.isNeighbor(this.props.previousPos)) {
      this.setState({
        pathSegmentColor: this.props.currentColor
      });
    }
  }

  pathSegment() {
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
    if (this.props.tile.dotColor) {
      let dotColor = `${this.props.tile.dotColor}`;
      let coloredDotStyle = {background: dotColor};
      tileContent =  <div id={dotColor}
                          className='colored-dot'
                          data-pos={`${this.props.tile.pos}`}
                          style={coloredDotStyle}
                          onClick={this.handleDotClick}>
                     </div>;
    } else {
      tileContent = <div className='path-tile' data-pos={`${this.props.tile.pos}`} onClick={this.handlePathClick}>{this.pathSegment()}</div>;
    }

    return (
      <div className='tile'>
        {tileContent}
      </div>
    );
  }
}

export default Tile;
