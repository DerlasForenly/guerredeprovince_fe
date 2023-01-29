import Rating from '../../baseComponents/Rating';
import { connect } from 'react-redux';
import { updateCommentRating, loadComments } from '../../../redux/comments/actions';
import { setLoading } from '../../../redux/app/actions';
import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

function Comment ({ comment, updateCommentRating, setLoading, loadComments }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { id } = useParams();

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
      url: `${process.env.REACT_APP_API}/api/comments/${comment.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/articles/${id}/comments`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        loadComments(response.data);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });

    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  };

  return <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
    <Link to={`/user/${comment.user.id}`}>
      <Avatar
        variant={'square'}
        src={`${process.env.REACT_APP_API}/${comment.user.avatar}`}
        alt={'user-avatar'}
        sx={{ height: 56, width: 56 }}
      />
    </Link>
    <Stack sx={{ width: '100%' }} spacing={1}>
      <Stack direction={'row'} spacing={1}>
        <Stack direction={'column'} justifyContent={'space-between'} sx={{ width: '100%' }} spacing={1}>
          <Stack direction={'row'} spacing={1}>
            <Link to={`/user/${comment.user.id}`}>
              <Typography component={'h2'} variant={'body2'}>{comment.user.nickname}</Typography>
            </Link>
            {
              comment.comment_id ?
                <Stack spacing={1}>
                  <Typography component={'h2'} variant={'body2'}>in reply to</Typography>
                  <Link to={`/user/${comment.in_reply_to.id}`}>
                    <Typography component={'h2'} variant={'body2'}>{comment.in_reply_to.nickname}</Typography>
                  </Link>
                  <Typography component={'h2'} variant={'body2'}>{`(comment: ${comment.comment_id})`}</Typography>
                </Stack> :
                <Stack></Stack>
            }
            <Typography component={'h2'} variant={'body2'} color={'primary'} fontWeight={'bold'}>Reply</Typography>
          </Stack>
          <Typography component={'h2'} variant={'body2'}>{comment.content}</Typography>
        </Stack>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          size={'small'}
          sx={{ height: 20, width: 20 }}
        >
          <MoreVertIcon sx={{ height: 20, width: 20 }} />
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
          { comment.permissions.edit ? <MenuItem onClick={handleClose}>Edit</MenuItem> : null }
          <MenuItem onClick={handleClose}>Complain</MenuItem>
          { comment.permissions.delete ? <MenuItem onClick={handleDelete}>Delete</MenuItem> : null }
        </Menu>
      </Stack>
      <Stack
        direction={'row'}
        sx={{ width: '100%' }}
        justifyContent={'space-between'}
      >
        <Typography component={'h2'} variant={'body2'} color={'gray'} fontSize={'12px'}>{comment.updated_at}</Typography>
        <Rating
          size={'small'}
          item={comment}
          voteUrl={`${process.env.REACT_APP_API}/api/comments/${comment.id}/vote`}
          updateItemFunction={updateCommentRating}
        />
      </Stack>
    </Stack>
  </Stack>;
}

const mapDispatchToProps = {
  updateCommentRating,
  setLoading,
  loadComments,
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
