import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadLastArticles, setLastArticlesPage } from '../../redux/news/actions';

import ArticlesList from '../../components/ArticlesList';
import Pagination from '../../components/Pagination';

import loadingGif from '../../assets/loading.gif';
import flagImg from '../../assets/flag-of-ukraine.jpg';
import RefreshButton from './RefreshButton';

const LastArticles = ({ loadLastArticles, articles, pagesMeta, setLastArticlesPage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/last?page=${pagesMeta.currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadLastArticles(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadLastArticles, pagesMeta.currentPage]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <div className="articles-list__title-container row">
        <label className="articles-list__header">New Articles in</label>
        <img src={flagImg} alt="flag" className="articles-list__flag"></img>
      </div>
      <div className="articles-list__title-container row">
        <button>Change language</button>
        <RefreshButton
          url={`${process.env.REACT_APP_API}/api/articles/last?page=${pagesMeta.currentPage}`}
          updateStateFunction={loadLastArticles}
        />
      </div>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <ArticlesList articles={articles}/>}
    <Pagination pagesMeta={pagesMeta} setPageFunction={setLastArticlesPage}/>
  </div>;
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