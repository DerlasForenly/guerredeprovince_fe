import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadComments } from '../../../redux/comments/actions';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';

function CreateComment ({ article, loadComments }) {
  const commentInput = useRef();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = event => {
    event.preventDefault();

    setLoading(true);

    console.log(commentInput.current);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        content: commentInput.current.value,
      },
    }).then((response) => {
      event.target.reset();

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        loadComments(response.data);
        setLoading(false);
        enqueueSnackbar('Comment has been created!');
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  };

  return (
    <form className="create-comment-form" onSubmit={onSubmit}>
      <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
        <TextField
          inputRef={commentInput}
          required
          multiline
          disabled={loading}
          minRows={1}
          name={'content'}
          sx={{ width: '100%' }}
        />
        <Button
          type="submit"
          disabled={loading}
        >
          Send
        </Button>
      </Stack>
    </form>
  );
}

const mapDispatchToProps = {
  loadComments,
};

const mapStateToProps = state => {
  return {
    article: state.article.article
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);