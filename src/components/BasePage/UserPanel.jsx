import { connect } from 'react-redux';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { Avatar, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { clearUser } from '../../redux/auth/actions';

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
  }

  const handleProfile = () => {
    navigate('/profile');
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div className="user-panel-container row">
    <div className="push-notifications-container">99+</div>
    <IconButton
      onClick={handleClick}
      size="small"
      aria-controls={open ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <Avatar
        src={`${process.env.REACT_APP_API}/${user?.avatar}`}
        sx={{ width: 50, height: 50 }}
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
    <div className="user-panel-balance col">
      <label>{user?.gold} G</label>
      <label>{user?.diamonds} D</label>
    </div>
  </div>;
};

const mapDispatchToProps = {
  clearUser,
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
