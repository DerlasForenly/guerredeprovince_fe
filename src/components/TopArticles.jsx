import { connect } from 'react-redux';
import { useEffect } from 'react';

import flagImg from '../assets/flag-of-ukraine.jpg';

import { loadTopArticlesAsync } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';

const TopArticles = ({ loadTopArticlesAsync, articles }) => {
  useEffect(() => {
    loadTopArticlesAsync();
  }, []);

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
  loadTopArticlesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopArticles);