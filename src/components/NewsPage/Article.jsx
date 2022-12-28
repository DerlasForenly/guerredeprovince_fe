import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RatingLabel from '../baseComponents/RatingLabel';
import Avatar from '../baseComponents/Avatar';

function Article ({ article }) {
  return <Link
    to={`/news/article/${article?.id}`}
    className="article-in-list"
  >
    <div className="title-author">
      <label className="title">{article?.title}</label>
      <div className="author-and-rating row">
        <label className="author">{article?.author}</label>
        <RatingLabel value={article?.rating}/>
      </div>
    </div>

    <Avatar
      src={`${process.env.REACT_APP_API}/${article?.avatar}`}
      className="avatar"
      round
      size={'small'}
      ml={10}
    />
  </Link>;
}

export default connect(null, null)(Article);

function Title() {
  return <div></div>
}

