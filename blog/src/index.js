import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css'
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducers';

// Almacenamiento de toda la aplicacióm
const store = createStore(
  reducer, // Todos lo reducer
  {}, // Estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
