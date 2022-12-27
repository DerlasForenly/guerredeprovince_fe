import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import Article from '../../components/Article';

import { loadPromotedArticle } from '../../redux/news/actions';

import loadingGif from '../../assets/loading.gif';

function PromotedArticle ({ loadPromotedArticle, article }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/promoted`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadPromotedArticle(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [loadPromotedArticle]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Promoted article</label>
      <button>Promote my article</button>
    </div>
    {loading ? <img className="loading-gif" src={loadingGif} alt="loading-gif"/> : <Article article={article}></Article>}
  </div>;
}

const mapDispatchToProps = {
  loadPromotedArticle,
};

const mapStateToProps = state => {
  return {
    article: state.news.promotedArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotedArticle);

