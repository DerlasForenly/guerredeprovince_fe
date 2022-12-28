import Rating from '../../baseComponents/Rating';
import { connect } from 'react-redux';
import { updateCommentRating } from '../../../redux/comments/actions';
import { Link } from 'react-router-dom';
import { Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import Cookies from 'js-cookie';

function Comment ({ comment, updateCommentRating }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API}/api/comments/${comment.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  return <div className="comment col">
    <div className="row">
      <Link to={`/user/${comment.user.id}`}>
        <img
          src={`${process.env.REACT_APP_API}/${comment.user.avatar}`}
          alt="avatar"
        />
      </Link>
      <div className="col">
        <div className="nick-more row">
          <div className="row">
            <Link to={`/user/${comment.user.id}`}>
              <label className="nickname">{comment.user.nickname}</label>
            </Link>
            {
              comment.comment_id ?
                <div>
                  <label>in reply to</label>
                  <Link to={`/user/${comment.in_reply_to.id}`}>
                    <label className="nickname">{comment.in_reply_to.nicknam}</label>
                  </Link>
                  <label>{`(comment: ${comment.comment_id})`}</label>
                </div> :
                <div></div>
            }
            <label className="reply">Reply</label>
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Complain</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <p className="content">{comment.content}</p>
        <div className="date-rating row">
          <label className="date">{comment.updated_at}</label>
          <Rating
            item={comment}
            voteUrl={`${process.env.REACT_APP_API}/api/comments/${comment.id}/vote`}
            updateItemFunction={updateCommentRating}
            fs={13}
            iconH={8}
            iconW={8}
            padding={5}
          />
        </div>
      </div>
    </div>
  </div>;
}

const mapDispatchToProps = {
  updateCommentRating,
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
