import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Article ({ article }) {
  return <Link to={`/news/article/${article?.id}`} className="article row">
    <div className="space-between col">
      <label className="title">{article?.title}</label>
      <div className="author-and-rating row">
        <div>
          <label className="author">{article?.author}</label>
          {/*<label className="date">{article?.created_at}</label>*/}
        </div>
        <label className={article?.rating >= 0 ? 'positive-rating' : 'negative-rating'}>
          { article?.rating > 0 ? '+' + article?.rating : article?.rating }
        </label>
      </div>
    </div>
    <img src={`${process.env.REACT_APP_API}/${article?.avatar}`} alt="avatar" className="avatar"></img>
  </Link>;
}

export default connect(null, null)(Article);

