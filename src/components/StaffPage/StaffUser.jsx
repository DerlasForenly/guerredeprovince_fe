import { connect } from 'react-redux';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

function StaffUser ({ staff }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div className="user-staff">
    <div className={"row"}>
      <img
        src={`${process.env.REACT_APP_API}/${staff.user.avatar}`}
        alt={"avatar"}
        className={"staff-avatar"}
      />
      <div className="col">
        <label className={"nickname"}>{staff.user.nickname}</label>
        <label className={"position-name"}>Position: {staff.position.name}</label>
      </div>
    </div>
    <IconButton
      aria-label="more"
      id="long-button"
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      size={'small'}
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
      <MenuItem onClick={handleClose}>Manage</MenuItem>
      <MenuItem onClick={handleClose}>Free</MenuItem>
    </Menu>
  </div>;
}

const mapDispatchToProps = {
};

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffUser);