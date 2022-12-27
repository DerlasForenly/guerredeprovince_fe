import { LOAD_COMMENTS, UPDATE_COMMENT_RATING } from './types';

export function loadComments (data) {
  return {
    type: LOAD_COMMENTS,
    payload: data,
  };
}

export function updateCommentRating (data) {
  return {
    type: UPDATE_COMMENT_RATING,
    payload: data,
  };
}
