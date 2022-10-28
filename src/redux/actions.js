import axios from 'axios';
import Cookies from 'js-cookie';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  SIGN_IN,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  ME,
  CLEAR_USER,
  LOAD_TOP_ARTICLES,
  LOAD_PROMOTED_ARTICLE,
  LOAD_SUBSCRIPTION_ARTICLES
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

export const hideErrorMessage = () => {
  return {
    type: HIDE_ERROR_MESSAGE
  };
};

export const showErrorMessage = (message) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    payload: message,
  };
};

export function signIn (data) {
  return {
    type: SIGN_IN,
    payload: data
  };
}

export function me (data) {
  return {
    type: ME,
    payload: data
  };
}

export function meAsync (action) {
  return dispatch => {
    dispatch(hideErrorMessage());
    dispatch(showLoader());

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/auth/me`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);

      dispatch(me(response.data));
      dispatch(hideLoader());
    }).catch((error) => {
      dispatch(hideLoader());
    });
  };
}

export function clearUser () {
  return {
    type: CLEAR_USER,
  };
}

export function loadRecommendedArticles () {

}

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

/**
 * Using this creates warning in useEffect
 *
 * @returns {(function(*): void)|*}
 */
export function loadPromotedArticleAsync () {
  return dispatch => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/promoted`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);

      dispatch(loadPromotedArticle(response.data));
    }).catch((error) => {

    });
  }
}
