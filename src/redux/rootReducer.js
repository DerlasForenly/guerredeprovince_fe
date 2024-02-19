import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { newsReducer } from './news/reducer';
import { subsReducer } from './subscriptions/reducer';
import { newspaperReducer } from './newspaper/reducer';
import { appReducer } from './app/reducer';
import { articleReducer } from './article/reducer';
import { commentsReducer } from './comments/reducer';
import { userReducer } from './user/reducer';
import { worldMapReducer } from './worldMap/reducer';
import { storageReducer } from './storage/reducer';
import { businessReducer } from './business/reducer';
import { politicalPartyReducer } from './politicalParty/reducer';
import { countryReducer } from './country/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  news: newsReducer,
  article: articleReducer,
  subscriptions: subsReducer,
  newspaper: newspaperReducer,
  user: userReducer,
  comments: commentsReducer,
  routing: routerReducer,
  worldMap: worldMapReducer,
  storage: storageReducer,
  business: businessReducer,
  party: politicalPartyReducer,
  country: countryReducer,
});