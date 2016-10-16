import React from 'react';
import { Provider } from 'react-redux';
import GameContainer from '../containers/game_container';
import TileContainer from '../containers/tile_container'; 

const Root = ({store}) => (
  <Provider store={store}>
    <GameContainer />
    <TileContainer />
  </Provider>
);

export default Root;
