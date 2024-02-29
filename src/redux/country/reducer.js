import {
  LOAD_ACTIVE_LAWS,
  LOAD_COUNTRY,
  LOAD_LAW_TYPES, LOAD_PARLIAMENT_ELECTION,
  LOAD_PARLIAMENTARIANS, LOAD_PARTY_ELECTION, LOAD_PRESIDENT_ELECTION,
  SET_LOADING
} from './types';

const initialState = {
  country: {
    loading: true,
    data: false,
  },
  lawTypes: {
    loading: true,
    data: [],
  },
  activeLaws: {
    loading: true,
    data: [],
  },
  parliamentarians: {
    loading: true,
    data: [],
  },
  presidentElection: {
    loading: true,
    data: false,
  },
  parliamentElection: {
    loading: true,
    data: false,
  },
  partyElection: {
    loading: true,
    data: false,
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
    case LOAD_ACTIVE_LAWS:
      return {
        ...state,
        activeLaws: {
          ...state.activeLaws,
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
    case LOAD_PARTY_ELECTION:
      return {
        ...state,
        partyElection: {
          ...state.partyElection,
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
    case LOAD_PRESIDENT_ELECTION:
      return {
        ...state,
        presidentElection: {
          ...state.presidentElection,
          data: action.payload
        }
      };
    case LOAD_PARLIAMENT_ELECTION:
      return {
        ...state,
        parliamentElection: {
          ...state.parliamentElection,
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
