import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';

ReactDOM.render(
  <UserProvider>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
  </UserProvider>,
  document.getElementById('root')
);