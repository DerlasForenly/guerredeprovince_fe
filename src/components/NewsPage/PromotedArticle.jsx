import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import Article from './Article';

import { loadPromotedArticle } from '../../redux/news/actions';

function PromotedArticle ({ loadPromotedArticle, article }) {
  // eslint-disable-next-line no-unused-vars
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

  return <div className="container articles-list">
    <div className="container-header">
      <label className="container-header-title">Promoted article</label>
      <button className={"small-no-style-button"}>Promote my article</button>
    </div>
    <Article article={article}/>
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

