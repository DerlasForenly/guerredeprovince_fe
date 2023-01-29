import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLoading } from '../../redux/app/actions';

function ArticleMenu ({ user, article, setLoading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    setLoading(true);

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setLoading(false);
      navigate('/news');
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  };

  const menuItems = [
    // <Link to={'/article/edit'}><MenuItem>Edit</MenuItem></Link>,
    <MenuItem onClick={handleDelete}>Complain</MenuItem>,
    <MenuItem onClick={handleDelete}>Delete</MenuItem>,
  ];

  return (
    <Stack>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size={'large'}
      >
        <MoreVertIcon />
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
        {menuItems}
      </Menu>
    </Stack>
  );
}

const mapDispatchToProps = {
  setLoading,
};

const mapStateToProps = state => {
  return {
    article: state.article.article,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleMenu);