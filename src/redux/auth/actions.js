import {
  ME,
  SIGN_IN,
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
