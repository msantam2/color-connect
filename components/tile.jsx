import React from 'react';
import PathSegment from './path_segment';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathSegmentColor: null};
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handlePathClick = this.handlePathClick.bind(this);
    this.pathSegment = this.pathSegment.bind(this);
  }

  handleDotClick(event) {
    let currentColor = event.target.id;
    this.props.updateCurrentColor(currentColor);
  }

  handlePathClick() {
    this.setState({
      pathSegmentColor: this.props.currentColor
    });
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

  render() {
    let tileContent;
    if (this.props.tile.dotColor) {
      let dotColor = `${this.props.tile.dotColor}`;
      let coloredDotStyle = {background: dotColor};
      tileContent =  <div id={dotColor}
                          className='colored-dot'
                          style={coloredDotStyle}
                          onClick={this.handleDotClick}>
                     </div>;
    } else if (this.props.reset) {
      this.clearState();
      this.props.updateReset();
    } else {
      tileContent = <div className='path-tile' onClick={this.handlePathClick}>{this.pathSegment()}</div>;
    }

    return (
      <div className='tile'>
        {tileContent}
      </div>
    );
  }
}

export default Tile;
