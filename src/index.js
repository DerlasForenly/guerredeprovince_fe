import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk,
  )
));

const app = (
  <Provider store={store}>
    <App></App>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
