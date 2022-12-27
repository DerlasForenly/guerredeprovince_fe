import {
  LOAD_USER,
  SET_CROPPED_AVATAR_FILE,
  SET_PREVIEW_AVATAR_FILE,
  SET_SELECTED_AVATAR_FILE,
} from './types';

const initialState = {
  loading: false,
  user: {
    id: null,
    nickname: null,
    avatar: null,
  },
  avatarForm: {
    selectedFile: null,
    previewFile: null,
    croppedFile: null,
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_SELECTED_AVATAR_FILE:
      return {
        ...state,
        avatarForm: {
          ...state.avatarForm,
          selectedFile: action.payload,
        }
      };
    case SET_PREVIEW_AVATAR_FILE:
      return {
      ...state,
      avatarForm: {
        ...state.avatarForm,
        previewFile: action.payload,
      }
    };
    case SET_CROPPED_AVATAR_FILE:
      return {
        ...state,
        avatarForm: {
          ...state.avatarForm,
          croppedFile: action.payload,
        }
      };
    default:
      return state;
  }
};