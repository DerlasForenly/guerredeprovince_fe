import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import avatarImg from '../assets/default_avatar.jpg';

const NewspaperShortInfo = () => {
  return <div className="newspaper-and-navigation-container row">
    <div className="newspaper-short-info-container row">
      <img src={avatarImg} alt="newspaper-avatar" />
      <div className="text-info col">
        <div className="col">
          <label className="newspaper-name">Газета доброї волі на кожен день</label>
          <label>Your position: moderator</label>
        </div>
        <label className="rating">+855</label>
      </div>
    </div>
    <div>
      <Link to="/news/article/create">
        <button>Create an article</button>
      </Link>
      <button>My subscriptions</button>
    </div>
  </div>;
};

export default connect(null, null)(NewspaperShortInfo);