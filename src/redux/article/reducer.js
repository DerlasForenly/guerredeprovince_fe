import { LOAD_ARTICLE, LOAD_CATEGORIES, UPDATE_ARTICLE_RATING } from './types';

const initialState = {
  article: {
    id: null,
    title: null,
    content: null,
    comments_count: null,
    author: null,
    newspaper: null,
    create_at: null,
    voted: null,
    rating: null,
  },
  loading: true,
  categories: [],
}

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case UPDATE_ARTICLE_RATING:
      return {
        ...state,
        article: {
          ...state.article,
          rating: action.payload.actual_rating,
          voted: action.payload.voted,
        },
      };
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state;
  }
};