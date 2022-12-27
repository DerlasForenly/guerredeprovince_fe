import { LOAD_COMMENTS, UPDATE_COMMENT_RATING } from './types';

const initialState = {
  comments: [],
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case UPDATE_COMMENT_RATING:
      const updated = state.comments.map((item, index) => {
          if (item.id === action.payload.comment_id) {
            let updated = {...item};

            updated.voted = action.payload.voted;
            updated.rating = action.payload.actual_rating;

            return updated;
          }

          return item;
        });

      return {
        ...state,
        comments: updated,
      };
    default:
      return state;
  }
};