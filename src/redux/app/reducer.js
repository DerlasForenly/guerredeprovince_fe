import {
  HIDE_DRAWER,
  HIDE_LOADER,
  LOAD_RESOURCES,
  SET_LOADER,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SHOW_DRAWER,
  SHOW_LOADER
} from './types';

const initialState = {
  resourcesList: [],
  loading: false,
  drawer: true,
  primaryColor: '#710404',
  secondaryColor: '#710404',

  imageInput: {

  }
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false
      };
    case SET_LOADER:
      return {
        ...state,
        loading: action.payload
      };
    case SHOW_DRAWER:
      return {
        ...state,
        drawer: true
      };
    case HIDE_DRAWER:
      return {
        ...state,
        drawer: false
      };
    case SET_PRIMARY_COLOR:
      return {
        ...state,
        primaryColor: action.payload,
      };
    case SET_SECONDARY_COLOR:
      return {
        ...state,
        primaryColor: action.payload,
      };
    case LOAD_RESOURCES:
      return {
        ...state,
        resourcesList: action.payload,
      }
    default:
      return state;
  }
};