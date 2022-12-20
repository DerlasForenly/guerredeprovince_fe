import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { updateArticleRating } from '../../redux/actions';
import loadingGif from '../../assets/reload-cat.gif';

function Rating ({ article, updateArticleRating }) {
  const [loading, setLoading] = useState(false);

  const up = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/vote`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        value: 1,
      },
    }).then((response) => {
      updateArticleRating(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  };

  const down = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/vote`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        value: -1,
      },
    }).then((response) => {
      updateArticleRating(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  };

  return <div className="rating">
    <button
      className={article.voted === -1 && !loading ? 'down-active' : 'down'}
      onClick={down}
      disabled={article.voted === -1}
    >
      -
    </button>
    {
      loading ?
        <img className="loading" src={loadingGif} alt="loading-gef" /> :
        <label>{article?.rating}</label>
    }
    <button
      className={article.voted === 1 && !loading ? 'up-active' : 'up'}
      onClick={up}
      disabled={article.voted === 1}
    >
      +
    </button>
  </div>;
}

const mapDispatchToProps = {
  updateArticleRating,
};

const mapStateToProps = state => {
  return {
    article: state.news.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);