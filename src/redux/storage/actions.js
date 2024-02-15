import {
  LOAD_USER_STORAGE,
  UPDATE_USER_STORAGE
} from './types';

export function loadUserStorage (data) {
  return {
    type: LOAD_USER_STORAGE,
    payload: data,
  }
}

export function updateUserStorage (data) {
  return {
    type: UPDATE_USER_STORAGE,
    payload: data,
  }
}
