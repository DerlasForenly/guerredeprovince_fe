import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Button from '@mui/material/Button';

function SubscribeButton ({ newspaper, updateSubscription, key = '', variant = 'text' }) {
  const [loading, setLoading] = useState(false);

  const onClickHandler = event => {
    setLoading(true);

    let url = `${process.env.REACT_APP_API}/api/newspapers/${newspaper.id}`;
    url = newspaper.subscribed ?
      url + '/unsubscribe' :
      url + '/subscribe';

    axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      updateSubscription(response.data);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });

  };

  return (
    <Button
      variant={variant}
      key={key}
      onClick={onClickHandler}
      disabled={loading}
    >
      {newspaper.subscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  );
}

const mapDispatchToProps = {
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);