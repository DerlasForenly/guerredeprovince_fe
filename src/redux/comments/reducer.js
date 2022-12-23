import { LOAD_SUBSCRIPTIONS } from './types';

const initialState = {
  subscriptions: [],
}

export const subsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
      };
    default:
      return state;
  }
};