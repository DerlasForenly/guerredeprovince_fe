import {
  LOAD_BUSINESS,
  UPDATE_BUSINESS
} from './types';

export function loadBusiness (data) {
  return {
    type: LOAD_BUSINESS,
    payload: data,
  }
}

export function updateBusiness (data) {
  return {
    type: UPDATE_BUSINESS,
    payload: data,
  }
}
