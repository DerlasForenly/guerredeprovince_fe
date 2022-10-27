import { connect } from 'react-redux';

import avatarImg from '../assets/default_avatar.jpg';

function Article ({ article }) {
  return <div className="article row">
    <div className="space-between col">
      <label className="title">{article?.title}</label>
      <div className="author-and-rating row">
        <label className="author">{article?.user_id}</label>
        <label className="rating">+15</label>
      </div>
    </div>
    <img src={avatarImg} alt="avatar" className="avatar"></img>
  </div>;
}

export default connect(null, null)(Article);

