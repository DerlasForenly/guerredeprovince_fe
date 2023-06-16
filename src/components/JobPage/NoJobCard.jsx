import Title from '../../components/baseComponents/Title';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function NoJobCard ({ user }) {
  useEffect(() => {

  }, [])

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content' }}>
      <Title>You do not have any job now</Title>
      <Typography component={'h2'} variant={'body1'}>You can found you own business or join an existing one</Typography>
      <Button fullWidth>
        <Link to={'/home'}>
          Start new business
        </Link>
      </Button>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, null)(NoJobCard);