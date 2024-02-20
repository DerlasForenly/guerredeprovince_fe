import { LOAD_COUNTRY, LOAD_ELECTIONS, LOAD_LAW_TYPES, LOAD_PARLIAMENTARIANS, SET_LOADING } from './types';

const initialState = {
  country: {
    loading: true,
    data: false,
  },
  lawTypes: {
    loading: true,
    data: [],
  },
  parliamentarians: {
    loading: true,
    data: [],
  },
  elections: {
    loading: false,
    data: [],
  }
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
    case LOAD_PARLIAMENTARIANS:
      return {
        ...state,
        parliamentarians: {
          ...state.parliamentarians,
          data: action.payload
        }
      };
    case LOAD_ELECTIONS:
      return {
        ...state,
        elections: {
          ...state.elections,
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
