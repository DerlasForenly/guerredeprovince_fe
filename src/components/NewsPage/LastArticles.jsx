import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { loadLastArticles, setLastArticlesPage } from '../../redux/news/actions';

import ArticlesList from './ArticlesList';
import Pagination from '../../components/baseComponents/Pagination';

import flagImg from '../../assets/flag-of-ukraine.jpg';
import RefreshButton from './RefreshButton';

const LastArticles = ({ loadLastArticles, articles, pagesMeta, setLastArticlesPage }) => {
  // eslint-disable-next-line no-unused-vars
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

  return <div className="articles-list">
    <div className="container-header">
      <div>
        <label className="container-header-title">New Articles in</label>
        <img src={flagImg} alt="flag" className="small-flag"></img>
      </div>
      <div>
        <ChangeLanguageButton
          mr={5}
          ml={5}
        />
        <RefreshButton
          url={`${process.env.REACT_APP_API}/api/articles/last?page=${pagesMeta.currentPage}`}
          updateStateFunction={loadLastArticles}
        />
      </div>
    </div>
    <ArticlesList articles={articles} />
    <Pagination pagesMeta={pagesMeta} setPageFunction={setLastArticlesPage} />
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

function ChangeLanguageButton ({ className = '', mr = 0, ml = 0 }) {
  return <button
    style={{ marginLeft: ml, marginRight: mr }}
    className={`${className} small-no-style-button`}
  >
    Change language
  </button>;
}