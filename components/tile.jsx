import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let color;
    if (this.props.tile.dotColor) {
      color = <div className={`color ${this.props.tile.dotColor}`}></div>;
    }

    return (
      <div className='tile'>
        {color}
      </div>
    );
  }
}

export default Tile;
