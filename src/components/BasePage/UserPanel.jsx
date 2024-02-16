import { connect } from 'react-redux';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { Avatar, Divider, IconButton, LinearProgress, linearProgressClasses, Stack } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { clearUser } from '../../redux/auth/actions';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiamondIcon from '@mui/icons-material/Diamond';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'none',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === 'none' ? '#fcf403' : '#fff93d',
  },
}));

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

  return <Stack direction={'row'} spacing={2} alignItems={'center'}>
    <Paper sx={{ p: 0.5, width: 'fit-content', boxShadow: 'inset 0 0 3px', minWidth: 220 }} elevation={0}>
      <Stack alignItems={'flex-end'}>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography fontSize={'small'} noWrap>{user.gold}</Typography>
          <MonetizationOnIcon fontSize={'small'} />
          {/*<Typography variant={'body2'} fontWeight={'bold'}>G</Typography>*/}
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography fontSize={'small'} noWrap>{user.diamonds}</Typography>
          <DiamondIcon fontSize={'small'} />
          {/*<Typography variant={'body2'} fontWeight={'bold'}>D</Typography>*/}
        </Stack>
      </Stack>
    </Paper>

    <Notifications />
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
    <Stack>
      <Typography variant={'body1'} component={'h2'} fontWeight={'bold'} noWrap>LVL: {user.level}</Typography>
      <BorderLinearProgress variant="determinate" value={50} />
    </Stack>
  </Stack>;
};

const mapDispatchToProps = {
  clearUser,
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

function Notifications () {
  return <IconButton
    size="large"
    aria-label="show 17 new notifications"
    color="inherit"
  >
    <Badge badgeContent={360} color="error">
      <NotificationsIcon />
    </Badge>
  </IconButton>;
}
