import {
  LOAD_ACTIVE_LAWS,
  LOAD_COUNTRY, LOAD_ELECTIONS, LOAD_LAW_TYPES, LOAD_PARLIAMENTARIANS, SET_LOADING
} from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

const mapKeyAndType = {
  country: LOAD_COUNTRY,
  activeLaws: LOAD_ACTIVE_LAWS,
  elections: LOAD_ELECTIONS,
  parliamentarians: LOAD_PARLIAMENTARIANS,
  lawTypes: LOAD_LAW_TYPES,
};

export function loadCountry (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/countries/${id}`,
    'country'
  )
}

export function loadActiveLaws (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/laws?country=${id}&status=3`,
    'activeLaws'
  )
}

export function loadActiveElections (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/elections?country=${id}&status=3`,
    'elections'
  )
}

export function loadParliamentarians (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/countries/${id}/parliamentarians`,
    'parliamentarians'
  )
}

export function loadLawTypes () {
  return loadItem(
    `${process.env.REACT_APP_API}/api/law-types`,
    'lawTypes'
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
