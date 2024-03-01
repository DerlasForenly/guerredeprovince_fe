import { LOAD_TRADE_OFFERS, LOAD_USER_STORAGE, SET_LOADING } from './types';

const initialState = {
  storage: {
    loading: true,
    data: [],
  },
  tradeOffers: {
    loading: true,
    data: [],
  }
};

export const storageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_STORAGE:
      return {
        ...state,
        storage: {
          ...state.storage,
          data: action.payload
        }
      };
    case LOAD_TRADE_OFFERS:
      return {
        ...state,
        tradeOffers: {
          ...state.tradeOffers,
          data: action.payload
        }
      };
    case SET_LOADING:
      let obj = { ...state };
      obj[action.payload.key].loading = action.payload.loading;

      return obj;
    default:
      return state;
  }
};