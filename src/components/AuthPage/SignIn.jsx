import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useState } from 'react';

import {
  signIn,
} from '../../redux/auth/actions';
import { connect } from 'react-redux';
import Copyright from '../../components/baseComponents/Copyright';

const theme = createTheme();

function SignIn ({ singIn }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

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
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" >
                  <Typography component={'h2'} variant={'body2'}>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" >
                  <Typography component={'h2'} variant="body2">
                    {'Don\'t have an account? Sign Up'}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = {
  signIn,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);