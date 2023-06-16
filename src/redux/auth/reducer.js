import {
  CLEAR_USER,
  HIDE_ERROR_MESSAGE,
  ME,
  SHOW_ERROR_MESSAGE,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CLEAR_ACTION,
  SET_ACTION
} from './types';

const initialState = {
  user: false,
  tokenType: false,
  expiresIn: false,
  errorMessage: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        tokenType: action.payload.token_type,
        expiresIn: action.payload.expires_in,
      };
    case SIGN_UP:
      return {
        ...state,
      };
    case SIGN_OUT:
      return {
        ...state,
      };
    case ME: {
      return {
        ...state,
        user: action.payload
      };
    }
    case SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case HIDE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null
      };
    case CLEAR_USER:
      return {
        user: false,
        tokenType: false,
        expiresIn: false,
        errorMessage: null,
      };
    case CLEAR_ACTION:
      return {
        ...state,
        user: {
          ...state.user,
          action: null,
        },
      }
    case SET_ACTION:
      return {
        ...state,
        user: {
          ...state.user,
          action: action.payload,
        },
      }
    default:
      return state;
  }
};