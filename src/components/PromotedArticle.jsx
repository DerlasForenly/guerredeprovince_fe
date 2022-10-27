import { connect } from 'react-redux';
import Article from './Article';
import { useEffect } from 'react';
import { loadPromotedArticle } from '../redux/actions';
import axios from 'axios';
import Cookies from 'js-cookie';

function PromotedArticle ({ loadPromotedArticle, article }) {
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/promoted`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadPromotedArticle(response.data);
    }).catch((error) => {

    });
  }, [loadPromotedArticle]);

  return <div className="articles-list col">
    <div className="articles-list__title-container row">
      <label className="articles-list__header">Promoted article</label>
    </div>
    <Article article={article}></Article>
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

