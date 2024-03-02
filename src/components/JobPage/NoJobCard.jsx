import Title from '../../components/baseComponents/Title';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

function NoJobCard ({ user }) {
  useEffect(() => {

  }, [])

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '40%', height: 'fit-content' }}>
      <Stack spacing={1}>
        <Title>You do not have any job now</Title>
        <Typography component={'h2'} variant={'body1'}>You can found you own business or join an existing one</Typography>
      </Stack>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, null)(NoJobCard);