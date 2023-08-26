import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { List } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { SnackbarProvider } from 'notistack';

import { AppBar, Drawer } from '../components/baseComponents/AppBar';
import UserPanel from '../components/BasePage/UserPanel';
import backgroundGif from '../assets/background.gif';
import { secondaryListItems } from '../components/BasePage/SecondaryListItems';
import { mainListItems } from '../components/BasePage/MainListItems';
import { AppBarBreadcrumbs } from '../components/BasePage/AppBarBreadcrumbs';
import { me, clearUser } from '../redux/auth/actions';
import SimpleBackdrop from '../components/BasePage/SimpleBackdrop';

function GuardedPage ({ me, element, clearUser, primaryColor, user, loading }) {
  const [open, setOpen] = React.useState(true);
  const [theme, setTheme] = useState(createTheme());
  const [urlIsValidated, setUrlIsValidated] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setTheme(createTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: '#fcf403',
        },
      },
    }));
  }, [primaryColor]);

  useEffect(() => {
    if (!Cookies.get('access_token')) {
      navigate('/sign-in');

      return;
    }

    const url = new URL(window.location.href);
    if (url.pathname.includes('undefined') || url.search.includes('undefined')) {
      navigate('/home');
    }
    setUrlIsValidated(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/auth/me`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      }
    }).then((response) => {
      me(response.data);
    }).catch((error) => {
      Cookies.remove('access_token');
      clearUser();
      navigate('/sign-in');
    });
  }, [me, navigate, clearUser]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Box sx={{
          display: 'flex',
        }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <AppBarBreadcrumbs url={window.location.pathname} />
              <UserPanel />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <Typography variant={'body2'} fontWeight={'bold'}>GUERRE DE PROVINCE</Typography>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === 'light'
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              background: `no-repeat url(${backgroundGif})`,
              backgroundSize: 'cover',
            }}
          >
            <Toolbar />
            {loading ? <SimpleBackdrop /> : <></>}
            {urlIsValidated ? element : <></>}
          </Box>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

const mapDispatchToProps = {
  me,
  clearUser,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.app.loading,
    primaryColor: state.app.primaryColor,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuardedPage);
