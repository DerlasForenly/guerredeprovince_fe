import { LOAD_USER_STORAGE, UPDATE_USER_STORAGE } from './types';

const initialState = {
  loading: false,
  storage: [],
  tradeOffers: {}
}

export const storageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_STORAGE:
      return {
        ...state,
        storage: action.payload
      };
    case LOAD_USER_STORAGE:
      return {
        ...state,
        storage: action.payload
      }
    default:
      return state;
  }
};