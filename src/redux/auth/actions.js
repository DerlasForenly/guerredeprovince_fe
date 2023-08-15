import {
  ME,
  SIGN_IN,
  CLEAR_USER,
  CLEAR_JOB,
  SET_JOB,
  CLEAR_WAR_ACTION,
  CLEAR_WORK_ACTION,
  CLEAR_MOVE_ACTION,
  SET_MOVE_ACTION,
  SET_WORK_ACTION,
  SET_WAR_ACTION,
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

export function clearUserWarAction () {
  return {
    type: CLEAR_WAR_ACTION,
  }
}

export function clearUserWorkAction () {
  return {
    type: CLEAR_WORK_ACTION,
  }
}

export function clearUserMoveAction () {
  return {
    type: CLEAR_MOVE_ACTION,
  }
}

export function setUserMoveAction (data) {
  return {
    type: SET_MOVE_ACTION,
    payload: data,
  }
}

export function setUserWorkAction (data) {
  return {
    type: SET_WORK_ACTION,
    payload: data,
  }
}


export function setUserWarAction (data) {
  return {
    type: SET_WAR_ACTION,
    payload: data,
  }
}


export function clearUserJob () {
  return {
    type: CLEAR_JOB,
  }
}

export function setUserJob (data) {
  return {
    payload: data,
    type: SET_JOB
  }
}
