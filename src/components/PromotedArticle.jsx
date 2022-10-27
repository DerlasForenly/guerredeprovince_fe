import { connect } from 'react-redux';
import Article from './Article';
import { useEffect } from 'react';
import { loadPromotedArticleAsync } from '../redux/actions';

function PromotedArticle ({ loadPromotedArticleAsync, article }) {
  useEffect(() => {
    loadPromotedArticleAsync();
  }, []);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Promoted article</label>
    </div>
    <Article article={article}></Article>
  </div>;
}

const mapDispatchToProps = {
  loadPromotedArticleAsync,
};

const mapStateToProps = state => {
  return {
    article: state.news.promotedArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotedArticle);

