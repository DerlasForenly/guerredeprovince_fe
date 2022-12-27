import { connect } from 'react-redux';

import refreshIcon from '../../assets/refresh.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

function RefreshButton ({ url, updateStateFunction }) {
  const [refreshing, setRefreshing] = useState(false);

  const refreshOnClick = e => {
    if (url === null || updateStateFunction === null) {
      return;
    }

    setRefreshing(true);

    setTimeout(() => {
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        updateStateFunction(response.data);
        setRefreshing(false);
      }).catch((error) => {
        setRefreshing(false);
      });
    }, 4000)
  }

  return <img
    className={refreshing ? 'refresh-icon-rotating' : 'refresh-icon'}
    src={refreshIcon}
    alt="refresh-icon"
    onClick={refreshOnClick}
  />
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);