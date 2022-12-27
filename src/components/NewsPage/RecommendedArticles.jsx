import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import ArticlesList from '../../components/ArticlesList';
import RefreshButton from '../../components/NewsPage/RefreshButton';

const RecommendedArticles = ({ articles, loadSubscriptionArticles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [loadSubscriptionArticles]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Recommended for you</label>
      <RefreshButton />
    </div>
    <ArticlesList articles={articles} loading={loading}></ArticlesList>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.recommendedArticles,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedArticles);