import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
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
import { setLoading } from '../redux/app/actions';
import { useSnackbar } from 'notistack';
import { loadCategories } from '../redux/article/actions';

const CreateArticlePage = ({
                             user,
                             article,
                             pageTitle = 'Create article:',
                             buttonText = 'Create',
                             setLoading,
                             loading,
                             loadCategories,
                             categories
                           }) => {
  const { enqueueSnackbar } = useSnackbar();
  const titleInput = useRef();
  const contentInput = useRef();
  const newspaperIdInput = useRef();
  const categoryIdInput = useRef();

  const [error, setError] = useState('');

  const [onBehalf, setOnBehalf] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.newspaper_id) {
      setOnBehalf([<MenuItem key={2} value={user.newspaper_id}>Newspaper</MenuItem>]);
    }

  }, [user.newspaper_id]);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/categories`,
    }).then((response) => {
      setLoading(false);
      loadCategories(response.data);
    }).catch((error) => {
      console.log(error.response.data.message);
      setLoading(false);
    });
  }, [loadCategories, setLoading])

  const submitHandler = event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const data = {
      title: titleInput.current.value,
      content: contentInput.current.value,
      category_id: categoryIdInput.current.value,
    };

    if (parseInt(newspaperIdInput.current.value) !== 0) {
      data.newspaper_id = parseInt(newspaperIdInput.current.value);
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
      enqueueSnackbar('Article has been created!');
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
            <Title>{pageTitle}</Title>
            <TextField
              inputRef={titleInput}
              required
              label={'Title'}
              name={'title'}
              placeholder={'Title'}
              max={80}
              sx={{ width: '100%' }}
              disabled={loading}
              defaultValue={article?.title}
            />
            <TextField
              inputRef={contentInput}
              required
              variant="filled"
              label="Content"
              multiline
              minRows={15}
              placeholder={'Content'}
              max={4000}
              name={'content'}
              disabled={loading}
              defaultValue={article?.content}
            />
            <Stack
              direction={'row'}
              sx={{ width: '100%' }}
              alignItems={'flex-end'}
              justifyContent={'space-between'}
            >
              <Stack spacing={2} sx={{ width: '50%' }}>
                <TextField
                  variant={'standard'}
                  sx={{ width: '100%' }}
                  name={'categoryId'}
                  inputRef={categoryIdInput}
                  required
                  select
                  label="Category"
                  defaultValue={13}
                  disabled={loading}
                >
                  {
                    categories.map((item, index) => {
                      return <MenuItem key={index} value={item.id}>{ item.name.charAt(0).toUpperCase() + item.name.slice(1)}</MenuItem>
                    })
                  }
                </TextField>
                <TextField
                  inputRef={newspaperIdInput}
                  variant={'standard'}
                  sx={{ width: '100%' }}
                  required
                  name={'newspaperId'}
                  select
                  label="On behalf of the"
                  defaultValue={0}
                  disabled={loading || onBehalf.length === 0}
                >
                  {[<MenuItem key={1} value={0}>{user?.nickname}</MenuItem>, ...onBehalf]}
                </TextField>
                <TextField
                  variant={'standard'}
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
                  {buttonText}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

const mapDispatchToProps = {
  setLoading,
  loadCategories,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.app.loading,
    categories: state.article.categories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticlePage);
