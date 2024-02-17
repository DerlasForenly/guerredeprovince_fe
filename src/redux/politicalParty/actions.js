import { LOAD_STAFF, LOAD_PARTIES, LOAD_REQUESTS, SET_LOADING } from './types';
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

export function loadParties() {
  return async (dispatch) => {
    try {
      setLoading('parties', true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/parties`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch({
        type: LOAD_PARTIES,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading('parties', false);
    }
  };
}

export function loadStaff(party_id) {
  return async (dispatch) => {
    try {
      setLoading('staff', true);
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
    } finally {
      setLoading('staff', false);
    }
  };
}

export function loadRequests(party_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading('requests', true));
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
    } finally {
      dispatch(setLoading('requests', false));
    }
  };
}

/**
 * @TODO Update to work with state itself instead of just refreshing data
 *
 * @param party_id
 * @param request_id
 * @returns {(function(*): Promise<void>)|*}
 */
export function acceptJoinRequest(party_id, request_id) {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/requests/${request_id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch(loadRequests(party_id))
      dispatch(loadStaff(party_id))
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
    }
  };
}

/**
 * @TODO Update to work with state itself instead of just refreshing data
 *
 * @param party_id
 * @param request_id
 * @returns {(function(*): Promise<void>)|*}
 */
export function declineJoinRequest(party_id, request_id) {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/requests/${request_id}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      dispatch(loadRequests(party_id))
      dispatch(loadStaff(party_id))
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
    }
  };
}
