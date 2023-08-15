import {
  CLEAR_USER,
  HIDE_ERROR_MESSAGE,
  ME,
  SHOW_ERROR_MESSAGE,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CLEAR_JOB,
  SET_JOB, CLEAR_WORK_ACTION, CLEAR_WAR_ACTION, CLEAR_MOVE_ACTION, SET_WORK_ACTION, SET_WAR_ACTION, SET_MOVE_ACTION
} from './types';

const initialState = {
  user: false, tokenType: false, expiresIn: false, errorMessage: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state, user: action.payload.user, tokenType: action.payload.token_type, expiresIn: action.payload.expires_in,
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
        ...state, user: action.payload
      };
    }
    case SHOW_ERROR_MESSAGE:
      return {
        ...state, errorMessage: action.payload
      };
    case HIDE_ERROR_MESSAGE:
      return {
        ...state, errorMessage: null
      };
    case CLEAR_USER:
      return {
        user: false, tokenType: false, expiresIn: false, errorMessage: null,
      };
    case CLEAR_WAR_ACTION:
      return {
        ...state, user: {
          ...state.user, war_action: null,
        },
      };
    case CLEAR_MOVE_ACTION:
      return {
        ...state, user: {
          ...state.user, move_action: null,
        },
      };
    case CLEAR_WORK_ACTION:
      return {
        ...state, user: {
          ...state.user, work_action: null,
        },
      };
    case SET_WORK_ACTION:
      return {
        ...state, user: {
          ...state.user, work_action: action.payload,
        },
      };
    case SET_WAR_ACTION:
      return {
        ...state, user: {
          ...state.user, war_action: action.payload,
        },
      };
    case SET_MOVE_ACTION:
      return {
        ...state, user: {
          ...state.user, move_action: action.payload,
        },
      };
    case CLEAR_JOB:
      return {
        ...state, user: {
          ...state.user, job_business_id: null,
        }
      };
    case SET_JOB:
      return {
        ...state, user: {
          ...state.user, job_business_id: action.payload
        }
      };
    default:
      return state;
  }
};