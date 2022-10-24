import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  routing: routerReducer,
});