import {
  UPDATE_SUBSCRIPTION,
  LOAD_NEWSPAPER
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
    default:
      return state;
  }
};