import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import loadingGif from '../../assets/loading.gif';
import moreIcon from '../../assets/more.png';
import { useEffect, useState } from 'react';
import { loadArticle, updateArticleRating } from '../../redux/article/actions';
import { Link } from 'react-router-dom';
import Rating from '../../components/baseComponents/Rating';

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
      {/*<ArticlePageNavigation></ArticlePageNavigation>*/}
      <div className="title">{article?.title}</div>
      <div className="content">{article?.content}</div>
      <div className="meta row">
        <div className="row">
          <img
            src={`${process.env.REACT_APP_API}/${article?.avatar}`}
            alt="avatar"
            className="avatar"
          />
          <div className="newspaper-author col">
            <Link to={`/newspaper/${article?.newspaper.id}`}>
              <div className="newspaper">{article?.newspaper.name}</div>
            </Link>
            <Link to={`/user/${article?.author.id}`}>
              <div className="author">{article?.newspaper ? 'Moderator:' : ''} {article?.author.nickname}</div>
            </Link>
          </div>
          {/*<button className="subscribe-button">Subscribe</button>*/}
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

function ArticlePageNavigation () {
  return <div className="back-more row">
    <Link to={'/news'}><button>Back</button></Link>
    <img src={moreIcon} alt="more-icon" className="more-icon"></img>
  </div>
}



