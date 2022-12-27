import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage
} from '../../redux/news/actions';

import ArticlesList from '../../components/ArticlesList';
import Pagination from '../../components/Pagination';

import RefreshButton from './RefreshButton';

const SubscriptionArticles = ({
                                articles,
                                loadSubscriptionArticles,
                                currentPage,
                                pagesMeta,
                                setSubscriptionArticlesPage
                              }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/subscriptions?page=${currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadSubscriptionArticles(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadSubscriptionArticles, currentPage]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Your subscriptions</label>
      <RefreshButton
        url={`${process.env.REACT_APP_API}/api/articles/subscriptions?page=${currentPage}`}
        updateStateFunction={loadSubscriptionArticles}
      />
    </div>
    <ArticlesList articles={articles} loading={loading}></ArticlesList>
    <Pagination pagesMeta={pagesMeta} setPageFunction={setSubscriptionArticlesPage}></Pagination>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.subscriptionArticles.articles,
    pagesMeta: state.news.subscriptionArticles.meta,
    currentPage: state.news.subscriptionArticles.meta.currentPage,
  };
};

const mapDispatchToProps = {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionArticles);