import {
  ME,
  SIGN_IN,
  HIDE_ERROR_MESSAGE,
  SHOW_ERROR_MESSAGE,
  CLEAR_USER,
} from './types';

export function signIn (data) {
  return {
    type: SIGN_IN,
    payload: data
  };
}

export function me (data) {
  return {
    type: ME,
    payload: data
  };
}

export function clearUser () {
  return {
    type: CLEAR_USER,
  };
}

export const hideErrorMessage = () => {
  return {
    type: HIDE_ERROR_MESSAGE
  };
};

export const showErrorMessage = (message) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload: message,
  };
};
