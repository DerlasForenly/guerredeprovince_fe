import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import loadingGif from '../../assets/loading.gif';
import { useEffect, useState } from 'react';
import { loadArticle, updateArticleRating } from '../../redux/article/actions';
import { Link } from 'react-router-dom';
import Rating from '../../components/baseComponents/Rating';
import Avatar from '../../components/baseComponents/Avatar';

function ArticleContent ({ article, loadArticle, updateArticleRating }) {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadArticle(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });

  }, [id, loadArticle]);

  if (loading) {
    return <div className="article-content-container">
      <img className="loading-gif" src={loadingGif} alt="loading-gif" />
    </div>;
  } else {
    return <div className="article-content-container col">
      <div className="title">{article?.title}</div>
      <div className="content">{article?.content}</div>
      <div className="meta row">
        <div className="row">
          <Avatar
            src={`${process.env.REACT_APP_API}/${article?.avatar}`}
            size={'small'}
            mr={10}
          />
          <div className="col">
            <Link to={`/newspaper/${article?.newspaper.id}`}>
              <div className="small-link-label">{article?.newspaper.name}</div>
            </Link>
            <Link to={`/user/${article?.author.id}`}>
              <div
                className="small-link-label">{article?.newspaper ? 'Moderator:' : ''} {article?.author.nickname}</div>
            </Link>
          </div>
        </div>
        <Rating
          item={article}
          voteUrl={`${process.env.REACT_APP_API}/api/articles/${article.id}/vote`}
          updateItemFunction={updateArticleRating}
        />
      </div>
      <div className="date-time">{article?.created_at}</div>
    </div>;
  }
}

const mapDispatchToProps = {
  loadArticle,
  updateArticleRating,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);