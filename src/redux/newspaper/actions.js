import {
  LOAD_ARTICLES,
  LOAD_NEWSPAPER,
  LOAD_STAFF,
  GET_ARTICLES_PAGE,
  UPDATE_STAFF,
  UPDATE_SUBSCRIPTION
} from './types';

export function loadNewspaper (data) {
  return {
    type: LOAD_NEWSPAPER,
    payload: data,
  }
}

export function updateSubscription (data) {
  return {
    type: UPDATE_SUBSCRIPTION,
    payload: data,
  };
}

export function updateStaff (data) {
  return {
    type: UPDATE_STAFF,
    payload: data,
  };
}

export function loadArticles (data) {
  return {
    type: LOAD_ARTICLES,
    payload: data
  };
}

export function loadStaff (data) {
  return {
    type: LOAD_STAFF,
    payload: data,
  };
}

export function setArticlesPage (data) {
  return {
    type: GET_ARTICLES_PAGE,
    payload: data,
  };
}