import { useEffect, useState } from 'react';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadComments } from '../../../redux/comments/actions';

function CommentsSection ({ loadComments, article }) {
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (article.id === undefined || article.id === null) {
      return
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadComments(response.data);
    }).catch((error) => {

    });
  }, [article, loadComments])

  const onClick = e => {
    setShowComments(true);
  }

  if (showComments) {
    return <div className="comments-section-container">
      <CommentsList/>
      <CreateComment/>
    </div>;
  } else {
    return <div className="comments-section-container">
      <button onClick={onClick} className="medium-gray-button">{`Show comments (${article.comments_count})`}</button>
    </div>;
  }
}

const mapDispatchToProps = {
  loadComments,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);