import {
  LOAD_USER,
  SET_CROPPED_AVATAR_FILE,
  SET_PREVIEW_AVATAR_FILE,
  SET_SELECTED_AVATAR_FILE,
} from './types';

export function loadUser (data) {
  return {
    type: LOAD_USER,
    payload: data,
  }
}

export function setSelectedAvatarFile (data) {
  return {
    type: SET_SELECTED_AVATAR_FILE,
    payload: data,
  }
}

export function setPreviewAvatarFile (data) {
  return {
    type: SET_PREVIEW_AVATAR_FILE,
    payload: data,
  }
}

export function setCroppedAvatarFile (data) {
  return {
    type: SET_CROPPED_AVATAR_FILE,
    payload: data,
  }
}