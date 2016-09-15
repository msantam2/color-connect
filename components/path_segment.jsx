import React from 'react';

class PathSegment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pathSegmentStyle = {background: `${this.props.color}`};

    return (
      <div className='path-segment' style={pathSegmentStyle}></div>
    );
  }
}

export default PathSegment;
