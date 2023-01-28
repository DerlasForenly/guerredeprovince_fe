import { connect } from 'react-redux';

import ArticleListing from '../NewsPage/ArticleListing';
import * as React from 'react';

import { loadArticles, setArticlesPage } from '../../redux/newspaper/actions';

const NewspaperArticles = ({
                             articles,
                             loadArticles,
                             pagesMeta,
                             setArticlesPage,
                             newspaperId,
                           }) => {
  return (
    <ArticleListing
      url={newspaperId ? `${process.env.REACT_APP_API}/api/newspapers/${newspaperId}/articles` : ''}
      loadArticles={loadArticles}
      articles={articles}
      pagesMeta={pagesMeta}
      setPage={setArticlesPage}
    />
  );
};

const mapStateToProps = state => {
  return {
    articles: state.newspaper.articles.articles,
    pagesMeta: state.newspaper.articles.meta,
  };
};

const mapDispatchToProps = {
  loadArticles,
  setArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperArticles);