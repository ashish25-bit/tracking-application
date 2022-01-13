import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './fonts.css';
import { TodoProvider } from './contexts/TodoContext';

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
