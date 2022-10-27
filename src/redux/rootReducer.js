import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { authReducer } from './authReducer';
import { newsReducer } from './newsReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  news: newsReducer,
  routing: routerReducer,
});