import axios from 'axios';
import Cookies from 'js-cookie';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  SIGN_IN,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  ME,
  CLEAR_USER
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

export function signIn (credentials) {
  return dispatch => {
    dispatch(hideErrorMessage());
    dispatch(showLoader());

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/login`,
      data: credentials
    }).then((response) => {
      console.log(response.data);
      Cookies.set('access_token', response.data.access_token);
      dispatch({
        type: SIGN_IN,
        payload: response.data
      });
      dispatch(hideLoader());
    }).catch((error) => {
      dispatch(showErrorMessage(error.message));
    });
  };
}

export function signInSync (data) {
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

export function loadTopArticles () {
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/api/articles/me`,
    headers: {
      Authorization: `Bearer` + Cookies.get('access_token')
    }
  }).then((response) => {
    console.log(response.data);
  }).catch((error) => {
  });
}