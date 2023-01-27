import {
  HIDE_DRAWER,
  HIDE_LOADER, SHOW_DRAWER,
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