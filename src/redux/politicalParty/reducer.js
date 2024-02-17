import { LOAD_PARTIES, LOAD_REQUESTS, LOAD_STAFF, SET_LOADING } from './types';

const initialState = {
  party: {
    loading: false,
    data: false,
  },
  parties: {
    data: [],
    loading: false,
  },
  staff: {
    data: [],
    loading: false,
  },
  requests: {
    data: [],
    loading: false,
  },
}

export const politicalPartyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STAFF:
      return {
        ...state,
        staff: {
          ...state.staff,
          data: action.payload
        },
      };
    case LOAD_PARTIES:
      return {
        ...state,
        parties: {
          ...state.parties,
          data: action.payload
        },
      };
    case LOAD_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          data: action.payload
        },
      };
    case SET_LOADING:
      let obj = {...state};
      obj[action.payload.key].loading = action.payload.loading;

      return obj;
    default:
      return state;
  }
};