import { connect } from 'react-redux';

import {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage
} from '../../redux/news/actions';

import ArticleListing from '../NewsPage/ArticleListing';
import * as React from 'react';

const NewspaperArticles = ({
                                articles,
                                loadSubscriptionArticles,
                                pagesMeta,
                                setSubscriptionArticlesPage,
                                newspaperId,
                              }) => {
  return (
    <ArticleListing
      url={`${process.env.REACT_APP_API}/api/newspapers/${newspaperId}/articles`}
      loadArticles={loadSubscriptionArticles}
      articles={articles}
      pagesMeta={pagesMeta}
      setPage={setSubscriptionArticlesPage}
    />
  );
};

const mapStateToProps = state => {
  return {
    articles: state.news.subscriptionArticles.articles,
    pagesMeta: state.news.subscriptionArticles.meta,
  };
};

const mapDispatchToProps = {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperArticles);