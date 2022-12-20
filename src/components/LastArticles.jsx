import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadLastArticles, setLastArticlesPage } from '../redux/actions';

import ArticlesList from './ArticlesList';
import Pagination from './Pagination';

import loadingGif from '../assets/loading.gif';
import flagImg from '../assets/flag-of-ukraine.jpg';
import refreshIcon from '../assets/refresh.png';
import { useParams } from 'react-router';

const LastArticles = ({ loadLastArticles, articles, currentPage, pagesMeta, setLastArticlesPage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/last?page=${currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadLastArticles(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadLastArticles, currentPage]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">New Articles in</label>
        <img src={flagImg} alt="flag" className="articles-list__flag"></img>
      </div>
      <div className="articles-list__title-container row">
        <button>Change language</button>
        <img className="refresh-icon" src={refreshIcon} alt="refresh-icon" />
      </div>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <ArticlesList articles={articles}></ArticlesList>}
    <Pagination currentPage={currentPage} pagesMeta={pagesMeta} setPageFunction={setLastArticlesPage}></Pagination>
  </div>;
};

const mapStateToProps = state => {
  return {
    articles: state.news.lastArticles.articles,
    pagesMeta: state.news.lastArticles.meta,
    currentPage: state.news.lastArticles.meta.currentPage,
  };
};

const mapDispatchToProps = {
  loadLastArticles,
  setLastArticlesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastArticles);