import { connect } from 'react-redux';

import { loadLastArticles, setLastArticlesPage } from '../../redux/news/actions';

import ArticleListing from './ArticleListing';
import * as React from 'react';

const LastArticles = ({ loadLastArticles, articles, pagesMeta, setLastArticlesPage }) => {
  return (
    <ArticleListing
      url={`${process.env.REACT_APP_API}/api/articles/last`}
      loadArticles={loadLastArticles}
      articles={articles}
      pagesMeta={pagesMeta}
      setPage={setLastArticlesPage}
    />
  );
};

const mapStateToProps = state => {
  return {
    articles: state.news.lastArticles.articles,
    pagesMeta: state.news.lastArticles.meta,
  };
};

const mapDispatchToProps = {
  loadLastArticles,
  setLastArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastArticles);
