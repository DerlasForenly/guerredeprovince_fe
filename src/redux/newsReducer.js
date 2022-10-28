import {
  LOAD_RECOMMENDED_ARTICLES,
  LOAD_TOP_ARTICLES,
  LOAD_PROMOTED_ARTICLE,
  LOAD_SUBSCRIPTION_ARTICLES,
  LOAD_MY_NEWSPAPER,
} from './types';

const initialState = {
  loading: false,
  recommendedArticles: [],
  topArticles: [],
  promotedArticle: [],
  subscriptionArticles: [],
  newspaper: {},
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECOMMENDED_ARTICLES:
      return {
        ...state,
      };
    case LOAD_TOP_ARTICLES:
      return {
        ...state,
        topArticles: action.payload,
      };
    case LOAD_PROMOTED_ARTICLE:
      return {
        ...state,
        promotedArticle: action.payload,
      };
    case LOAD_SUBSCRIPTION_ARTICLES:
      return {
        ...state,
        subscriptionArticles: action.payload,
      };
    case LOAD_MY_NEWSPAPER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
