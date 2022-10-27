import { connect } from 'react-redux';
import { useEffect } from 'react';

import flagImg from '../assets/flag-of-ukraine.jpg';

import { loadTopArticles } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';
import axios from 'axios';
import Cookies from 'js-cookie';

const TopArticles = ({ loadTopArticles, articles }) => {
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/top`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadTopArticles(response.data);
    }).catch((error) => {

    });
  }, [loadTopArticles]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Top Article in</label>
      <img src={flagImg} alt="flag" className="articles-list__flag"></img>
      <button>Change language</button>
    </div>
    <ArticlesList articles={articles}></ArticlesList>
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