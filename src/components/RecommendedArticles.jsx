import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import { loadRecommendedArticles } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';

import loadingGif from '../assets/loading.gif'

const RecommendedArticles = ({ articles, loadSubscriptionArticles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [loadSubscriptionArticles])

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Recommended for you</label>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <ArticlesList articles={articles}></ArticlesList>}
    <Pagination></Pagination>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.recommendedArticles,
  };
};

const mapDispatchToProps = {
  loadRecommendedArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedArticles);