import { LOAD_ARTICLE, LOAD_CATEGORIES, UPDATE_ARTICLE_RATING } from './types';

export function loadArticle (data) {
  return {
    type: LOAD_ARTICLE,
    payload: data,
  };
}

export function updateArticleRating (data) {
  return {
    type: UPDATE_ARTICLE_RATING,
    payload: data,
  };
}

export function loadCategories (data) {
  return {
    type: LOAD_CATEGORIES,
    payload: data,
  };
}