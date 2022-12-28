import { connect } from 'react-redux';
import Pagination from '../components/baseComponents/Pagination';

import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadSubscriptions, setSubscriptionsPage } from '../redux/subscriptions/actions';
import NewspapersList from '../components/SubscriptionsPage/NewspapersList';

const SubscriptionsPage = ({ userId, loadSubscriptions, meta, setSubscriptionsPage, currentPage }) => {

  useEffect(() => {
    if (userId === false || userId === undefined || currentPage === undefined) {
      return;
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/users/${userId}/subscriptions?page=${currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
    }).then((response) => {
      loadSubscriptions(response.data);
    }).catch((error) => {

    });
  }, [userId, loadSubscriptions, currentPage]);

  return <div className="subscriptions-page col">
    <div className="subscriptions-container col">
      <label className="title">Subscriptions</label>
      <NewspapersList />
      <Pagination pagesMeta={meta} setPageFunction={setSubscriptionsPage} />
    </div>
  </div>;
};

const mapDispatchToProps = {
  loadSubscriptions,
  setSubscriptionsPage
};

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id,
    subscriptions: state.subscriptions.subscriptions.subscriptions,
    meta: state.subscriptions.subscriptions.meta,
    currentPage: state.subscriptions.subscriptions.meta.currentPage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);