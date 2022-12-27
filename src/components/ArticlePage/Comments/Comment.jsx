import moreIcon from '../../../assets/more.png';
import Rating from '../../Rating';
import { connect } from 'react-redux';
import { updateCommentRating } from '../../../redux/comments/actions';
import { Link } from 'react-router-dom';

function Comment ({ comment, updateCommentRating }) {
  return <div className="comment col">
    <div className="row">
      <Link to={`/user/${comment.user.id}`}>
        <img
          src={`${process.env.REACT_APP_API}/${comment.user.avatar}`}
          alt="avatar"
        />
      </Link>
      <div className="col">
        <div className="nick-more row">
          <div className="row">
            <Link to={`/user/${comment.user.id}`}>
              <label className="nickname">{comment.user.nickname}</label>
            </Link>
            {
              comment.comment_id ?
                <div>
                  <label>in reply to</label>
                  <Link to={`/user/${comment.in_reply_to.id}`}>
                    <label className="nickname">{comment.in_reply_to.nicknam}</label>
                  </Link>
                  <label>{`(comment: ${comment.comment_id})`}</label>
                </div> :
                <div></div>
            }
            <label className="reply">Reply</label>
          </div>
          <img src={moreIcon} className="more" alt="more-icon" />
        </div>
        <p className="content">{comment.content}</p>
        <div className="date-rating row">
          <label className="date">{comment.updated_at}</label>
          <Rating
            item={comment}
            voteUrl={`${process.env.REACT_APP_API}/api/comments/${comment.id}/vote`}
            updateItemFunction={updateCommentRating}
          />
        </div>
      </div>
    </div>
  </div>;
}

const mapDispatchToProps = {
  updateCommentRating,
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
