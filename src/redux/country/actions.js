import {
  LOAD_COUNTRY, LOAD_ELECTIONS, LOAD_LAW_TYPES, LOAD_PARLIAMENTARIANS, SET_LOADING
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

function loadItem(url, key, type) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(key, true));
      const response = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: type,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      dispatch(setLoading(key, false));
    }
  };
}

export function loadCountry (id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading('country', true));
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/countries/${id}`,
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
      dispatch(setLoading('country', false));
    }
  };
}

export function loadActiveElections (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/countries/${id}/elections`,
    'elections',
    LOAD_ELECTIONS
  )
}

export function loadParliamentarians (id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading('parliamentarians', true));
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/countries/${id}/parliamentarians`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_PARLIAMENTARIANS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      dispatch(setLoading('parliamentarians', false));
    }
  };
}

export function loadLawTypes () {
  return async (dispatch) => {
    try {
      dispatch(setLoading('lawTypes', true));
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
      dispatch(setLoading('lawTypes', false));
    }
  };
}


