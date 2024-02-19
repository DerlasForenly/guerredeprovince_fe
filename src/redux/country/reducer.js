import { LOAD_COUNTRY, LOAD_LAW_TYPES, SET_LOADING } from './types';

const initialState = {
  country: {
    loading: false,
    data: false,
  },
  lawTypes: {
    loading: false,
    data: [],
  },
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LAW_TYPES:
      return {
        ...state,
        lawTypes: {
          ...state.lawTypes,
          data: action.payload
        },
      };
    case LOAD_COUNTRY:
      return {
        ...state,
        country: {
          ...state.country,
          data: action.payload
        }
      };
    case SET_LOADING:
      let obj = {...state};
      obj[action.payload.key].loading = action.payload.loading;

      return obj;
    default:
      return state;
  }
};
