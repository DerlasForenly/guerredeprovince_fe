import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { newsReducer } from './news/reducer';
import { subsReducer } from './subscriptions/reducer';
import { newspaperReducer } from './newspaper/reducer';
import { appReducer } from './app/reducer';
import { articleReducer } from './article/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  news: newsReducer,
  article: articleReducer,
  subscriptions: subsReducer,
  newspaper: newspaperReducer,
  routing: routerReducer,
});