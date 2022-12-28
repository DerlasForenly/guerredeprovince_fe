import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

import refreshIcon from '../../assets/refresh.png';

function RefreshButton ({
                          url,
                          updateStateFunction,
                          alt = "refresh-icon",
                          mr = 0,
                          ml = 0,
                          mt = 0,
                          mb = 0,
                        }) {
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
    }, 4000);
  };

  return <img
    className={refreshing ? 'refresh-icon-rotating' : 'refresh-icon'}
    src={refreshIcon}
    alt={alt}
    style={{ marginBottom: mb, marginTop: mt, marginLeft: ml, marginRight: mr }}
    onClick={refreshOnClick}
  />;
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);