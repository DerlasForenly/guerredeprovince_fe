import { CLEAR_MOVING_TO_REGION, SET_MOVING_TO_REGION, SET_SELECTED_REGION } from './types';

export function setSelectedRegion (data) {
  return {
    type: SET_SELECTED_REGION,
    payload: data
  };
}

export function setMovingToRegion (data) {
  return {
    type: SET_MOVING_TO_REGION,
    payload: data
  };
}

export function clearMovingToRegion () {
  return {
    type: CLEAR_MOVING_TO_REGION,
  };
}