import * as React from 'react';
import { useEffect } from 'react';
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
import ListSubheader from '@mui/material/ListSubheader';
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
import { List } from '@mui/material';

function GuardedPage ({ me, element, clearUser }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/auth/me`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      }
    }).then((response) => {
      me(response.data);
    }).catch((error) => {
      clearUser();
      navigate('/sign-in');
    });
  }, [me, navigate, clearUser]);

  return (
    <ThemeProvider theme={mdTheme}>
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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                width: '100%',
              }}
            >
              Dashboard
            </Typography>
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

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#a67d0c',
    },
    secondary: {
      main: '#a67d0c',
    },
  },
});

const mapDispatchToProps = {
  me,
  clearUser,
};

const mapStateToProps = state => {
  return {
    loading: state.app.loading,
    stability: state.app.stability,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuardedPage);

export const mainListItems = (
  <React.Fragment>
    <ListItem label={'Overview'} to={'/overview'} icon={<HomeIcon />} />
    <ListItem label={'News'} to={'/news'} icon={<ArticleIcon />} />
    <ListItem label={'World'} icon={<ExploreIcon />} />
    <ListItem label={'Region'} icon={<DomainIcon />} />
    <ListItem label={'Market'} icon={<BalanceIcon />} />
    <ListItem label={'Party'} icon={<GroupIcon />} />
    <ListItem label={'Job'} icon={<BusinessCenterIcon />} />
    <ListItem label={'Wars'} icon={<CastleIcon />} />
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

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      There is nothing here
    </ListSubheader>
    <ListItem label={'Nothing'} />
    <ListItem label={'Nothing'} />
    <ListItem label={'Nothing'} />
  </React.Fragment>
);
