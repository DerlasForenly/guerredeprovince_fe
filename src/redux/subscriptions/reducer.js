import { LOAD_SUBSCRIPTIONS, SET_SUBSCRIPTIONS_PAGE, UPDATE_SUBSCRIPTION } from './types';

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
      const newspaper = action.payload;

      let updatedSubscriptions = [...state.subscriptions.subscriptions];

      updatedSubscriptions.forEach(element => {
        if (element.id === newspaper.newspaper_id) {
          element.subscribed = newspaper.subscribed;
        }

        return element;
      });

      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          subscriptions: updatedSubscriptions,
        },
      };
    case SET_SUBSCRIPTIONS_PAGE:
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          meta: {
            ...state.subscriptions.meta,
            currentPage: action.payload,
          }
        }
      }
    case LOAD_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: {
          subscriptions: action.payload.data,
          meta: {
            currentPage: action.payload.meta.current_page,
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