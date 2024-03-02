import {
  LOAD_ACTIVE_LAWS,
  LOAD_COUNTRY,
  LOAD_LAW_TYPES,
  LOAD_PARLIAMENT_ELECTION,
  LOAD_PARLIAMENTARIANS,
  LOAD_PARTY_ELECTION,
  LOAD_PRESIDENT_ELECTION,
  SET_LOADING
} from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

const mapKeyAndType = {
  country: LOAD_COUNTRY,
  activeLaws: LOAD_ACTIVE_LAWS,
  presidentElection: LOAD_PRESIDENT_ELECTION,
  parliamentarians: LOAD_PARLIAMENTARIANS,
  lawTypes: LOAD_LAW_TYPES,
  partyElection: LOAD_PARTY_ELECTION,
  parliamentElection: LOAD_PARLIAMENT_ELECTION,
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

export function loadActivePresidentElection (id) {
  return loadItem(
    url,
    'presidentElection'
  )
}

export function loadActivePartyElection (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/elections?party=${id}&status=3&type=2`,
    'partyElection'
  )
}

export function loadActiveParliamentElection (id) {
  return loadItem(
    `${process.env.REACT_APP_API}/api/elections?country=${id}&status=3&type=3`,
    'parliamentElection'
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
