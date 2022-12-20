import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import loadingGif from '../assets/loading.gif';
import moreIcon from '../assets/more.png';
import avatarImg from '../assets/default_avatar.jpg';
import { useEffect, useState } from 'react';
import { loadArticle, loadPromotedArticle } from '../redux/actions';
import { Link } from 'react-router-dom';

import Rating from '../components/ArticlePage/Rating';

function ArticleContent ({ article, loadArticle }) {
  const [contentLoading, setContentLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setContentLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadArticle(response.data);
      setContentLoading(false);
    }).catch((error) => {
      setContentLoading(false);
    });
  }, [id]);

  if (contentLoading) {
    return <div className="article-content-container">
      <img className="loading-gif" src={loadingGif} alt="loading-gif" />
    </div>;
  } else {
    return <div className="article-content-container col">
      <ArticlePageNavigation></ArticlePageNavigation>
      <div className="title">{article?.title}</div>
      <div className="content">{article?.content}</div>
      <div className="meta row">
        <div className="row">
          <img src={avatarImg} alt="avatar" className="avatar"></img>
          <div className="newspaper-author col">
            <div className="newspaper">{article?.newspaper}</div>
            <div className="author">{article?.newspaper ? 'Moderator:' : ''} {article?.author}</div>
          </div>
          {/*<button className="subscribe-button">Subscribe</button>*/}
        </div>
        <Rating></Rating>
      </div>
      <div className="date-time">{article?.created_at}</div>
    </div>;
  }
}

const mapDispatchToProps = {
  loadArticle,
};

const mapStateToProps = state => {
  return {
    article: state.news.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);

function ArticlePageNavigation () {
  return <div className="back-more row">
    <Link to={'/news'}><button>Back</button></Link>
    <img src={moreIcon} alt="more-icon" className="more-icon"></img>
  </div>
}



