import { connect } from 'react-redux';
import Pagination from '../components/Pagination';

import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadSubscriptions } from '../redux/subscriptions/actions';
import NewspapersList from '../components/SubscriptionsPage/NewspapersList';

const SubscriptionsPage = ({ userId, loadSubscriptions }) => {

  useEffect(() => {
    if (userId === false || userId === undefined) {
      return;
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/users/${userId}/subscriptions`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
    }).then((response) => {
      loadSubscriptions(response.data)
    }).catch((error) => {

    });
  }, [userId, loadSubscriptions]);

  return <div className="subscriptions-page col">
    <div className="subscriptions-container col">
      <label className="title">Subscriptions</label>
      <NewspapersList></NewspapersList>
      <Pagination></Pagination>
    </div>
  </div>;
};

const mapDispatchToProps = {
  loadSubscriptions,
};

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id,
    subscriptions: state.subscriptions.subscriptions.subscriptions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);