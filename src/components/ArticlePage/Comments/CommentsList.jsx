import { connect } from 'react-redux';
import Comment from './Comment';

function CommentsList ({ comments }) {
  return <div className="col">
    {
      comments.map((element, index) => {
        return <Comment comment={element} key={index} />;
      })
    }
  </div>;
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
