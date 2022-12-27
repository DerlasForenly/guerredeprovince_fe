import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadTopArticles } from '../../redux/news/actions';

import ArticlesList from '../ArticlesList';
import Pagination from '../Pagination';

import flagImg from '../assets/flag-of-ukraine.jpg';
import refreshIcon from '../assets/refresh.png';

const TopArticles = ({ loadTopArticles, articles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/top`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadTopArticles(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadTopArticles]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">Top Article in</label>
        <img src={flagImg} alt="flag" className="articles-list__flag"></img>
      </div>
      <div className="articles-list__title-container row">
        <button>Change language</button>
        <img className="refresh-icon" src={refreshIcon} alt="refresh-icon" />
      </div>
    </div>
    <ArticlesList articles={articles} loading={loading}></ArticlesList>
    <Pagination></Pagination>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.topArticles,
  };
};

const mapDispatchToProps = {
  loadTopArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopArticles);