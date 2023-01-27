import {
  LOAD_RECOMMENDED_ARTICLES,
  LOAD_TOP_ARTICLES,
  LOAD_PROMOTED_ARTICLE,
  LOAD_SUBSCRIPTION_ARTICLES,
  LOAD_LAST_ARTICLES,
  GET_LAST_ARTICLES_PAGE,
  GET_SUBSCRIPTION_ARTICLES_PAGE,
} from './types';

const initialState = {
  loading: false,
  recommendedArticles: [],
  topArticles: {
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
  },
  lastArticles: {
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
  },
  promotedArticle: null,
  subscriptionArticles: {
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
  },
};

export const newsReducer = (state = initialState, action) => {
  const data = action.payload?.data;
  const meta = action.payload?.meta;
  const links = action.payload?.links;

  switch (action.type) {
    case LOAD_RECOMMENDED_ARTICLES:
      return {
        ...state,
      };
    case LOAD_TOP_ARTICLES:
      return {
        ...state,
        topArticles: {
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
    case GET_LAST_ARTICLES_PAGE:
      return {
        ...state,
        lastArticles: {
          ...state.lastArticles,
          meta: {
            ...state.lastArticles.meta,
            currentPage: action.payload,
          }
        }
      };
    case GET_SUBSCRIPTION_ARTICLES_PAGE:
      return {
        ...state,
        subscriptionArticles: {
          ...state.lastArticles,
          meta: {
            ...state.lastArticles.meta,
            currentPage: action.payload,
          }
        }
      };
    case LOAD_LAST_ARTICLES:
      return {
        ...state,
        lastArticles: {
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
    case LOAD_PROMOTED_ARTICLE:
      return {
        ...state,
        promotedArticle: action.payload,
      };
    case LOAD_SUBSCRIPTION_ARTICLES:
      return {
        ...state,
        subscriptionArticles: {
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
