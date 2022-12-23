import {
  LOAD_TOP_ARTICLES,
  LOAD_LAST_ARTICLES,
  LOAD_PROMOTED_ARTICLE,
  LOAD_SUBSCRIPTION_ARTICLES,
  GET_LAST_ARTICLES_PAGE,
  GET_SUBSCRIPTION_ARTICLES_PAGE,
} from './types';

export function loadTopArticles (data) {
  return {
    type: LOAD_TOP_ARTICLES,
    payload: data
  };
}

export function loadSubscriptionArticles (data) {
  return {
    type: LOAD_SUBSCRIPTION_ARTICLES,
    payload: data
  };
}

export function loadPromotedArticle (data) {
  return {
    type: LOAD_PROMOTED_ARTICLE,
    payload: data
  };
}

export function loadLastArticles (data) {
  return {
    type: LOAD_LAST_ARTICLES,
    payload: data,
  };
}

export function setLastArticlesPage (data) {
  return {
    type: GET_LAST_ARTICLES_PAGE,
    payload: data,
  };
}

export function setSubscriptionArticlesPage (data) {
  return {
    type: GET_SUBSCRIPTION_ARTICLES_PAGE,
    payload: data,
  };
}

