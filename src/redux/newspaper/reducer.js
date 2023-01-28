import {
  UPDATE_SUBSCRIPTION,
  LOAD_NEWSPAPER, LOAD_STAFF, LOAD_ARTICLES, GET_ARTICLES_PAGE
} from './types';

const initialState = {
  loading: true,
  newspaper: {
    id: null,
    name: null,
    description: null,
    avatar: null,
    subscribed: null,
    owner: {
      id: null,
      nickname: null,
    },
  },
  staff: [],
  articles: {
    meta: {
      currentPage: 1,
      from: 1,
      total: 0,
      path: null,
      lastPage: 0,
      perPage: 0,
    },
    links: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    articles: [],
  }
}

export const newspaperReducer = (state = initialState, action) => {
  const data = action.payload?.data;
  const meta = action.payload?.meta;
  const links = action.payload?.links;

  switch (action.type) {
    case UPDATE_SUBSCRIPTION:
      return {
        ...state,
        newspaper: {
          ...state.newspaper,
          subscribed: action.payload.subscribed,
        }
      };
    case LOAD_NEWSPAPER:
      return {
        ...state,
        newspaper: action.payload,
      }
    case LOAD_STAFF:
      return {
        ...state,
        staff: action.payload,
      }
    case GET_ARTICLES_PAGE:
      return {
        ...state,
        articles: {
          ...state.articles,
          meta: {
            ...state.articles.meta,
            currentPage: action.payload,
          }
        }
      };
    case LOAD_ARTICLES:
      console.log();
      return {
        ...state,
        articles: {
          articles: data,
          meta: {
            currentPage: meta.current_page,
            from: meta.from,
            total: meta.total,
            path: meta.path,
            lastPage: meta.last_page,
            perPage: meta.per_page,
          },
          links: links,
        },
      };
    default:
      return state;
  }
};