import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../components/root';
import configureStore from '../store/store';
import ColorConnectBoard from '../lib/color_connect_board';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
  const board = new ColorConnectBoard(1);
  const preloadedState = {
    board: board,
    level: 1,
    currentColor: null,
    previousTile: null
  };
  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
