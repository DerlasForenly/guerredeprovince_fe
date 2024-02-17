import { LOAD_PARTIES, LOAD_REQUESTS, LOAD_STAFF } from './types';

const initialState = {
  loading: false,
  parties: [],
  staff: [],
  requests: [],
}

export const politicalPartyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STAFF:
      return {
        ...state,
        staff: action.payload,
      };
    case LOAD_PARTIES:
      return {
        ...state,
        parties: action.payload,
      };
    case LOAD_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};