import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

function SubscribeButton ({ newspaperId, isSubscribed, updateStateFunction, className = '' }) {
  const [loading, setLoading] = useState(false);

  const onClickHandler = event => {
    setLoading(true);

    let url = `${process.env.REACT_APP_API}/api/newspapers/${newspaperId}`;
    url = isSubscribed ?
      url + '/unsubscribe' :
      url + '/subscribe';

    axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      updateStateFunction(response.data);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });

  };

  return <button
    onClick={onClickHandler}
    disabled={loading}
    className={className}
  >
    {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
  </button>;
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);