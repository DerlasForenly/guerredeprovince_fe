import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { updateSubscription } from '../../redux/subscriptions/actions';

function UnsubscriptionButton ({ newspaperId, updateSubscription, newspapers }) {
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
      let updatedNewspapers = [...newspapers];

      updatedNewspapers.forEach(element => {
        element.subscribed = element.id === newspaperId ? false : element.subscribed;
        return element;
      });

      updateSubscription(updatedNewspapers);
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
    newspapers: state.subscriptions.subscriptions.subscriptions,
  };
};

export default connect(mapStateToProps, manDispatchToProps)(UnsubscriptionButton);