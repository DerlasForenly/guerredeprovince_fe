import { connect } from 'react-redux';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { Avatar, Divider, IconButton, Stack } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { clearUser } from '../../redux/auth/actions';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';

const UserPanel = ({ user, clearUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = (event) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/logout`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      Cookies.remove('access_token');
      clearUser();
      navigate('/sign-in');
    }).catch((error) => {

    });
  };

  const handleProfile = () => {
    navigate(`/user/${user.id}`);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Stack direction={'row'} spacing={2}>
    <UserBalance user={user} />
    <Notifications/>
    <IconButton
      onClick={handleClick}
      size="small"
      aria-controls={open ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <Avatar
        src={`${process.env.REACT_APP_API}/${user?.avatar}`}
      />
    </IconButton>
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleProfile}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  </Stack>;
};

const mapDispatchToProps = {
  clearUser,
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

function UserBalance ({ user = { gold: 0, diamonds: 0 } }) {
  return <Stack>
    <Stack direction={'row'}>
      <Typography>{user.gold}</Typography>
      <Typography>G</Typography>
    </Stack>
    <Stack direction={'row'}>
      <Typography>{user.diamonds}</Typography>
      <Typography>D</Typography>
    </Stack>
  </Stack>;
}

function Notifications() {
  return <IconButton
    size="large"
    aria-label="show 17 new notifications"
    color="inherit"
  >
    <Badge badgeContent={17} color="error">
      <NotificationsIcon />
    </Badge>
  </IconButton>
}
