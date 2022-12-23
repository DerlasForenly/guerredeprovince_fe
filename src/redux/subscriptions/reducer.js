import { LOAD_SUBSCRIPTIONS, UPDATE_SUBSCRIPTION } from './types';

const initialState = {
  loading: false,
  subscriptions: {
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
    subscriptions: [],
  },
}

export const subsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          subscriptions: action.payload,
        },
      };
    case LOAD_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: {
          subscriptions: action.payload.data,
          meta: {
            currentPage: action.payload.meta,
            from: action.payload.meta.from,
            total: action.payload.meta.total,
            path: action.payload.meta.path,
            lastPage: action.payload.meta.last_page,
            perPage: action.payload.meta.per_page,
          },
          links: action.payload.links,
        },
      };
    default:
      return state;
  }
};