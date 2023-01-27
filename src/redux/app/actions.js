import {
  HIDE_DRAWER,
  HIDE_LOADER, SET_PRIMARY_COLOR, SHOW_DRAWER,
  SHOW_LOADER,
} from './types';

export function showLoader () {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader () {
  return {
    type: HIDE_LOADER,
  };
}

export function showDrawer () {
  return {
    type: SHOW_DRAWER,
  };
}

export function hideDrawer () {
  return {
    type: HIDE_DRAWER,
  };
}

export function setPrimaryColor (data) {
  return {
    type: SET_PRIMARY_COLOR,
    payload: data,
  };
}