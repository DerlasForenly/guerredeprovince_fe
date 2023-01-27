import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Copyright from '../../components/baseComponents/Copyright';
import { mdTheme } from '../../style/theme';
import Cookies from 'js-cookie';
import { signIn } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

function SignUp ({ singIn }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/register`,
      data: {
        nickname: data.get('nickname'),
        email: data.get('email'),
        password: data.get('password'),
        password_confirmation: data.get('password_confirmation'),
      }
    }).then((response) => {

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/api/auth/login`,
        data: {
          email: data.get('email'),
          password: data.get('password'),
        }
      }).then((response) => {
        Cookies.set('access_token', response.data.access_token);
        signIn(response.data);
        setLoading(false);
        navigate('/overview');
      }).catch((error) => {
        setError(error.response.data.error ? error.response.data.error : error.response.data.message);
        setLoading(false);
      });
    }).catch((error) => {
      setError(error.response.data.error ? error.response.data.error : error.response.data.message);
      setLoading(false);
    });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password confirmation"
                  type="password"
                  id="password_confirmation"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color={'red'} variant={'body1'} component={'h2'}>
                  {error}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/sign-in'} style={{ textDecoration: 'underline' }}>
                  <Typography component={'h2'} variant={'body2'}>
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = {
  signIn,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);