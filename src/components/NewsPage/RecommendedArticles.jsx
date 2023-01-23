import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import ArticlesList from '../../components/NewsPage/ArticlesList';
import RefreshButton from '../../components/NewsPage/RefreshButton';

const RecommendedArticles = ({ articles, loadSubscriptionArticles }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [loadSubscriptionArticles]);

  return <div className="articles-list">
    <div className="container-header">
      <label className="container-header-title">Recommended for you</label>
      <RefreshButton />
    </div>
    <ArticlesList articles={articles}/>
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