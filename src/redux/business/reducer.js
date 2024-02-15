import { LOAD_BUSINESS, UPDATE_BUSINESS } from './types';

const initialState = {
  loading: false,
  business: false,
}

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUSINESS:
      return {
        ...state,
        business: action.payload
      };
    case UPDATE_BUSINESS:
      return {
        ...state,
        business: action.payload
      }
    default:
      return state;
  }
};