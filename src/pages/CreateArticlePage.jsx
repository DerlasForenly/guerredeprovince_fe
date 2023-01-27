import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import loadingGif from '../assets/ok.gif';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { CircularProgress, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Title from '../components/baseComponents/Title';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const CreateArticlePage = ({ user }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    newspaperId: 0,
  });

  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage('');

    const data = {
      title: state.title,
      content: state.content,
    };

    if (parseInt(state.newspaperId) !== 0) {
      data.newspaper_id = parseInt(state.newspaperId);
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/articles/`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: data,
    }).then((response) => {
      setLoading(false);
      setSuccess(true);
      setState({
        title: '',
        content: '',
        newspaperId: 0,
      });
      event.target.reset();
      navigate(`/article/${response.data.article_id}`);
    }).catch((error) => {
      setErrorMessage(error.message);
      setLoading(false);
    });
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: 900 }}>
        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <Title>Create article:</Title>
            <TextField
              required
              label={'Title'}
              name={'title'}
              placeholder={'Title'}
              max={80}
              sx={{ width: '100%' }}
              onChange={changeInputHandler}
            />
            <TextField
              required
              label="Content"
              multiline
              minRows={15}
              placeholder={'Content'}
              onChange={changeInputHandler}
              max={4000}
              name={'content'}
            />
            <Stack
              direction={'row'}
              sx={{ width: '100%' }}
              alignItems={'flex-end'}
              justifyContent={'space-between'}
            >
              <Stack spacing={2} sx={{ width: '50%' }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  select
                  label="On behalf of the"
                  defaultValue={0}
                  onChange={changeInputHandler}
                >
                  <MenuItem key={1} value={0}>{user?.nickname}</MenuItem>
                  <MenuItem key={2} value={user?.newspaper_id}>Newspaper</MenuItem>
                </TextField>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  select
                  label="Language"
                  defaultValue={0}
                >
                  <MenuItem key={1} value={0}>Ukrainian</MenuItem>
                  <MenuItem key={2} value={1}>English</MenuItem>
                </TextField>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                {loading ? <CircularProgress /> : <div></div>}
                <Button type={'submit'} variant="contained" size="large" disabled={loading}>Create</Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticlePage);

// eslint-disable-next-line no-unused-vars
function Loading ({ active }) {
  return active ? <div className="loading">
    <label>Wait...</label>
    <img src={loadingGif} alt="loading-gif"></img>
  </div> : <div></div>;
}

// eslint-disable-next-line no-unused-vars
function BackAndHelp () {
  return <div className="back-more row">
    <Link to="/news">
      <button className="back-button">Back</button>
    </Link>
    <Link to="/news">
      <button className="back-button">Help</button>
    </Link>
  </div>;
}
