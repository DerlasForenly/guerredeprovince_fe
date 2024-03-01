import {
  LOAD_TRADE_OFFERS,
  LOAD_USER_STORAGE,
  SET_LOADING,
} from './types';

import axios from 'axios';
import Cookies from 'js-cookie';

const mapKeyAndType = {
  storage: LOAD_USER_STORAGE,
  tradeOffers: LOAD_TRADE_OFFERS,
};

export function loadUserStorage (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/users/${id}/treasury`,
    'storage'
  )
}

export function loadTradeOffers () {
  return loadItem(
    `${process.env.REACT_APP_API}/api/trade-offers`,
    'tradeOffers'
  )
}

function setLoading (key, value) {
  return {
    type: SET_LOADING,
    payload: {
      loading: value,
      key: key,
    }
  }
}

function loadItem(url, key) {
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
        type: mapKeyAndType[key],
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      dispatch(setLoading(key, false));
    }
  };
}
