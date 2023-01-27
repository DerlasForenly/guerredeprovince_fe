import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import RatingLabel from '../../components/baseComponents/RatingLabel';

function Newspaper ({ newspaper }) {
  return (
    <Link to={`/newspaper/${newspaper.id}`}>
      <Stack direction={'row'} spacing={2}>
        <Avatar
          variant={'square'}
          alt="newspaper-avatar"
          src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
          sx={{ width: 86, height: 86 }}
        />
        <Stack justifyContent="space-between">
          <Stack>
            <Typography variant="h6">
              {newspaper?.name}
            </Typography>
            <Typography component="h2" variant="body2">
              Your position: {newspaper.position}
            </Typography>
          </Stack>
          <RatingLabel value={newspaper.value} />
        </Stack>
      </Stack>
    </Link>
  )
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newspaper);
