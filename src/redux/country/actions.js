import {
  LOAD_COUNTRY, LOAD_LAW_TYPES, SET_LOADING
} from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

export function setLoading (key, value) {
  return {
    type: SET_LOADING,
    payload: {
      loading: value,
      key: key,
    }
  }
}

export function loadCountry (id) {
  return async (dispatch) => {
    try {
      setLoading('country', true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/country/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_COUNTRY,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading('country', false);
    }
  };
}

export function loadLawTypes () {
  return async (dispatch) => {
    try {
      setLoading('lawTypes', true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/law-types`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_LAW_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading('lawTypes', false);
    }
  };
}


