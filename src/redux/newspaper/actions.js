import {
  LOAD_NEWSPAPER,
  UPDATE_SUBSCRIPTION
} from './types';

export function loadNewspaper (data) {
  return {
    type: LOAD_NEWSPAPER,
    payload: data,
  }
}

export function updateSubscription (data) {
  return {
    type: UPDATE_SUBSCRIPTION,
    payload: data,
  };
}