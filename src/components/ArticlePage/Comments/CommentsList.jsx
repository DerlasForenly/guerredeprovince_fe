import { connect } from 'react-redux';
import Comment from './Comment';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

function CommentsList ({ comments }) {
  return (
    <Stack spacing={1} divider={<Divider />}>
      {
        comments.map((element, index) => {
          return <Comment comment={element} key={index} />;
        })
      }
    </Stack>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
