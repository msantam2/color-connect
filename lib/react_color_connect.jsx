import Game from '../components/game';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
  const root = document.getElementById('root');
  ReactDOM.render(<Game />, root);
});
