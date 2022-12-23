import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { updateSubscription } from '../../redux/newspaper/actions';

function UnsubscriptionButton ({ newspaperId, updateSubscription }) {
  const [loading, setLoading] = useState(false);

  const onClickHandler = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/newspapers/${newspaperId}/unsubscribe`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      updateSubscription(false);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }

  return <button onClick={onClickHandler} disabled={loading}>Unsubscribe</button>
}

const manDispatchToProps = {
  updateSubscription,
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, manDispatchToProps)(UnsubscriptionButton);