import { connect } from 'react-redux';

import {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage
} from '../../redux/news/actions';

import ArticleListing from './ArticleListing';
import * as React from 'react';

const SubscriptionArticles = ({
                                articles,
                                loadSubscriptionArticles,
                                currentPage,
                                pagesMeta,
                                setSubscriptionArticlesPage,
                              }) => {
  return (
    <ArticleListing
      url={`${process.env.REACT_APP_API}/api/articles/subscriptions`}
      loadArticles={loadSubscriptionArticles}
      articles={articles}
      pagesMeta={pagesMeta}
      currentPage={currentPage}
      setPage={setSubscriptionArticlesPage}
    />
  );
};

const mapStateToProps = state => {
  return {
    articles: state.news.subscriptionArticles.articles,
    pagesMeta: state.news.subscriptionArticles.meta,
    currentPage: state.news.subscriptionArticles.meta.currentPage,
  };
};

const mapDispatchToProps = {
  loadSubscriptionArticles,
  setSubscriptionArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionArticles);