import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { CircularProgress, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Title from '../components/baseComponents/Title';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';

const CreateArticlePage = ({ user }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    newspaperId: 0,
  });

  const [error, setError] = useState('');
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
    setError('');

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
      setState({
        title: '',
        content: '',
        newspaperId: 0,
      });
      event.target.reset();
      navigate(`/article/${response.data.article_id}`);
    }).catch((error) => {
      setError(error.response.data.message);
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
              disabled={loading}
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
              disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                >
                  <MenuItem key={1} value={0}>Ukrainian</MenuItem>
                  <MenuItem key={2} value={1}>English</MenuItem>
                </TextField>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                {
                  error ?
                    <Typography component={'h2'} color={'red'} variant={'body2'}>{error}</Typography> :
                    <div></div>
                }
                {loading ? <CircularProgress /> : <div></div>}
                <Button
                  type={'submit'}
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  Create
                </Button>
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
