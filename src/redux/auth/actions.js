import {
  ME,
  SIGN_IN,
  CLEAR_USER,
  CLEAR_ACTION,
  SET_ACTION,
  CLEAR_JOB,
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

export function clearUserAction () {
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

export function clearUserJob () {
  return {
    type: CLEAR_JOB,
  }
}
