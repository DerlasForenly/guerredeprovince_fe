import {
  UPDATE_SUBSCRIPTION,
  LOAD_NEWSPAPER, LOAD_STAFF
} from './types';

const initialState = {
  loading: true,
  newspaper: {
    id: null,
    name: null,
    description: null,
    avatar: null,
    subscribed: null,
    owner: {
      id: null,
      nickname: null,
    },
  },
  staff: [],
}

export const newspaperReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTION:
      return {
        ...state,
        newspaper: {
          ...state.newspaper,
          subscribed: action.payload.subscribed,
        }
      };
    case LOAD_NEWSPAPER:
      return {
        ...state,
        newspaper: action.payload,
      }
    case LOAD_STAFF:
      return {
        ...state,
        staff: action.payload,
      }
    default:
      return state;
  }
};