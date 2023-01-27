import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadComments } from '../../../redux/comments/actions';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreateComment ({ article, loadComments }) {
  const [state, setState] = useState({
    content: '',
  })

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = event => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: state,
    }).then((response) => {
      setState({
        content: '',
      });
      event.target.reset();

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        loadComments(response.data);
      }).catch((error) => {
        console.error(error);
      });

    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <form className="create-comment-form" onSubmit={onSubmit}>
      <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
        <TextField
          required
          multiline
          minRows={3}
          onChange={changeInputHandler}
          name={'content'}
          sx={{ width: '100%' }}
        />
        <Button type="submit" >Send</Button>
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