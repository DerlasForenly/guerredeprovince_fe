import { useEffect, useState } from 'react';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadComments } from '../../../redux/comments/actions';
import Paper from '@mui/material/Paper';
import { LinearProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Title from '../../../components/baseComponents/Title';

function CommentsSection ({ loadComments, article }) {
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const width = 800;

  useEffect(() => {
    if (article.id === undefined || article.id === null) {
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadComments(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [article, loadComments]);

  const onClick = e => {
    setShowComments(true);
  };

  if (showComments) {
    return (
      <Paper sx={{ p: 2, width: width }}>
        <Stack spacing={3}>
          <CommentsList />
          <CreateComment />
        </Stack>
      </Paper>
    );
  }

  if (article.comments_count === 0) {
    return (
      <Paper sx={{ p: 2, width: width }}>
        <Stack spacing={1}>
          <Title>Create first comment!</Title>
          <CreateComment />
        </Stack>
      </Paper>
    );
  }

  if (loading) {
    return (
      <Paper sx={{ p: 2, width: width }}>
        <Stack spacing={3}>
          <LinearProgress />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, width: width }}>
      <Button
        onClick={onClick}
      >
        {`Show comments (${article.comments_count})`}
      </Button>
    </Paper>
  );
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