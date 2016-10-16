import React from 'react';
import GameContainer from '../containers/game_container';
import TileContainer from '../containers/tile_container';

const App = () => {
  return (
    <div>
      <GameContainer />
      <TileContainer /> 
    </div>
  );
};

export default App;
