import {
  ME,
  SIGN_IN,
  CLEAR_USER,
  CLEAR_ACTION, SET_ACTION,
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

export function clearPlayerAction () {
  return {
    type: CLEAR_ACTION,
  }
}

export function setUserAction (data) {
  return {
    type: SET_ACTION,
    payload: data,
  }
}
