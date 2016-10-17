import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../components/root';
import configureStore from '../store/store';
import * as ColorConnect from '../lib/color_connect';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
  const board = new ColorConnect.Board(1);
  const preloadedState = {
    board: board,
    level: 1,
    currentColor: null,
    previousTile: null,
    boardReset: false
  };
  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
