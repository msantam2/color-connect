import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleDotClick = this.handleDotClick.bind(this);
  }

  handleDotClick(event) {
    let currentColor = event.target.id;
    this.props.updateCurrentColor(currentColor);
  }

  render() {
    let coloredDot;
    if (this.props.tile.dotColor) {
      let color = `${this.props.tile.dotColor}`;
      let colorStyle = {background: color};
      coloredDot =  <div id={color}
                         className='color'
                         style={colorStyle}
                         onClick={this.handleDotClick}>
                    </div>;
    }

    return (
      <div className='tile'>
        {coloredDot}
      </div>
    );
  }
}

export default Tile;
