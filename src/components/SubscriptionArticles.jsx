import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadSubscriptionArticles } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';

import loadingGif from '../assets/loading.gif'

const SubscriptionArticles = ({ articles, loadSubscriptionArticles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/subscriptions`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadSubscriptionArticles(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadSubscriptionArticles]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Your subscriptions</label>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <ArticlesList articles={articles}></ArticlesList>}
    <Pagination></Pagination>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.subscriptionArticles,
  };
};

const mapDispatchToProps = {
  loadSubscriptionArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionArticles);