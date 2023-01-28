import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { me, clearUser } from '../redux/auth/actions';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Drawer } from '../components/baseComponents/AppBar';
import UserPanel from '../components/BasePage/UserPanel';
import backgroundGif from '../assets/background.gif';
import ArticleIcon from '@mui/icons-material/Article';
import BalanceIcon from '@mui/icons-material/Balance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CastleIcon from '@mui/icons-material/Castle';
import DomainIcon from '@mui/icons-material/Domain';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, List } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function GuardedPage ({ me, element, clearUser, primaryColor, user }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [theme, setTheme] = useState(createTheme());

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
          {element}
        </Box>
      </Box>
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

export const mainListItems = (
  <React.Fragment>
    <ListItem label={'Overview'} to={'/overview'} icon={<HomeIcon />} />
    <ListItem label={'News'} to={'/news'} icon={<ArticleIcon />} />
    <ListItem label={'World'} to={'/world'} icon={<ExploreIcon />} />
    <ListItem label={'Region'} to={'/region'} icon={<DomainIcon />} />
    <ListItem label={'Market'} to={'/market'} icon={<BalanceIcon />} />
    <ListItem label={'Party'} to={'/party'} icon={<GroupIcon />} />
    <ListItem label={'Job'} to={'/job'} icon={<BusinessCenterIcon />} />
    <ListItem label={'Wars'} to={'/wars'} icon={<CastleIcon />} />
  </React.Fragment>
);

function ListItem ({ label, to = '/', icon = <LayersIcon /> }) {
  return <Link to={to}>
    <ListItemButton>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  </Link>;
}

const secondaryListItems = (
  <React.Fragment>
    <ListItem
      label={'Settings'}
      to={'/settings'}
      icon={<SettingsIcon />}
    />
  </React.Fragment>
);

function AppBarBreadcrumbs ({ url = '' }) {
  const [path, setPath] = useState([]);

  useEffect(() => {
    let u = url.split('/');
    u.shift();

    u = u.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

    setPath(u);
  }, [url]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center'
      }}
      color={'inherit'}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {
        path.map((item, index) => {
          return (
            <Typography
              key={index}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontWeight={index === url.length - 1 ? 'normal' : 'bold'}
            >
              {item}
            </Typography>
          );
        })
      }
    </Breadcrumbs>
  );
}
