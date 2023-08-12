import { CLEAR_MOVING_TO_REGION, SET_MOVING_TO_REGION, SET_SELECTED_REGION } from './types';

const initialState = {
  selectedRegion: false,
  movingToRegion: false,
};

export const worldMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_REGION:
      return {
        ...state,
        selectedRegion: action.payload,
      };
    case SET_MOVING_TO_REGION:
      return {
        ...state,
        movingToRegion: action.payload,
      };
    case CLEAR_MOVING_TO_REGION:
      return {
        ...state,
        movingToRegion: false,
      };
    default:
      return state;
  }
};