import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

function Article ({ article }) {
  return (
    <Link to={`/article/${article?.id}`}>
      <Stack direction={'row'} spacing={1} justifyContent="space-between" sx={{ width: '100%' }}>
        <Stack justifyContent="space-between" sx={{ width: '100%', p: 0.5 }}>
          <Typography
            component="h2"
            variant="body2"
            fontWeight={'bold'}
            color={'primary'}
          >
            {article?.title}
          </Typography>
          <Stack justifyContent="space-between" direction={'row'}>
            <Typography
              component="h2"
              variant="body2"
            >
              {article?.author}
            </Typography>
            {/*<RatingLabel value={article?.rating} />*/}
          </Stack>
        </Stack>
        <Avatar
          variant={'square'}
          src={`${process.env.REACT_APP_API}/${article?.avatar}`}
          sx={{ width: 56, height: 56 }}
        />
      </Stack>
    </Link>
  );
}

export default connect(null, null)(Article);
