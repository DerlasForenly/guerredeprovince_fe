import { connect } from 'react-redux';

import avatarImg from '../assets/default_avatar.jpg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Article ({ article }) {

  useEffect(() => {

  }, [article])

  return <Link to={`/news/article/${article?.id}`} className="article row">
    <div className="space-between col">
      <label className="title">{article?.title}</label>
      <div className="author-and-rating row">
        <div>
          <label className="author">{article?.author}</label>
          {/*<label className="date">{article?.created_at}</label>*/}
        </div>
        <label className="rating">{article?.rating > 0 ? '+' + article?.rating : article?.rating }</label>
      </div>
    </div>
    <img src={avatarImg} alt="avatar" className="avatar"></img>
  </Link>;
}

export default connect(null, null)(Article);

