import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../components/root';
// will also need to import configure store
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
