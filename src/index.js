import { compose, createStore, applyMiddleware } from 'redux'
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk,
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const app = (
  <Provider store={store}>
    <App></App>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
