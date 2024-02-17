import { LOAD_STAFF, LOAD_PARTIES, UPDATE_PARTIES, LOAD_REQUESTS } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

export function loadParties (data) {
  return {
    type: LOAD_PARTIES,
    payload: data,
  }
}

export function updateParties (data) {
  return {
    type: UPDATE_PARTIES,
    payload: data,
  }
}

export function loadStaff(party_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/parties/${party_id}/staff`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_STAFF,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
}

export function loadRequests(party_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/parties/${party_id}/requests`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_REQUESTS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
}
