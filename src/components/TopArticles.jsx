import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadTopArticles } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';

import loadingGif from '../assets/loading.gif';
import flagImg from '../assets/flag-of-ukraine.jpg';

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
      <label className="articles-list__header">Top Article in</label>
      <img src={flagImg} alt="flag" className="articles-list__flag"></img>
      <button>Change language</button>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <ArticlesList articles={articles}></ArticlesList>}
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