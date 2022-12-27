import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadSubscriptionArticles, setSubscriptionArticlesPage, } from '../../redux/news/actions';

import ArticlesList from '../../components/ArticlesList';
import Pagination from '../../components/Pagination';

import refreshIcon from '../../assets/refresh.png';

const SubscriptionArticles = ({ articles, loadSubscriptionArticles, currentPage, pagesMeta, setSubscriptionArticlesPage }) => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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

  const refreshOnClick = e => {
    setLoading(true);
    setRefresh(true);

    setTimeout(() => {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/articles/subscriptions?page=${currentPage}`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        loadSubscriptionArticles(response.data);
        setLoading(false);
        setRefresh(false);
      }).catch((error) => {
        setLoading(false);
        setRefresh(false);
      });
    }, 4000)
  }

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Your subscriptions</label>
      <img
        className={refresh ? 'refresh-icon-rotating' : 'refresh-icon'}
        src={refreshIcon}
        alt="refresh-icon"
        onClick={refreshOnClick}
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