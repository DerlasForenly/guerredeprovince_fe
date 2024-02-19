import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import axios from 'axios';

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

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  container
);
