import { createStore } from 'redux';
import GameReducer from '../reducers/game_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(GameReducer, preloadedState)
);

export default configureStore;
