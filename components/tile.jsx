import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.tile.dotColor;

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Tile;
