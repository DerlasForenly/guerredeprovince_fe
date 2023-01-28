import Title from '../../components/baseComponents/Title';
import { LinearProgress, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TimeForm from './TimeForm';
import CompensationFrom from './CompensationFrom';

function CurrentJobCard ({ user }) {
  const [business, setBusiness] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === false || user.job_business_id === null) {
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/businesses/${user.job_business_id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setBusiness(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 'fit-content', height: 'fit-content' }}>
        <Title>Current job</Title>
        <LinearProgress />
      </Paper>
    );
  }

  if (user.job_business_id === null) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 'fit-content', height: 'fit-content' }}>
        <Title>Current job</Title>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '600px', height: 'fit-content' }}>
      <Title>Current job</Title>
      <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
        <Avatar
          variant={'square'}
          src={picturePlaceholder}
          alt={'business-avatar'}
          sx={{
            height: 200,
            width: 200,
          }}
        />
        <Typography component={'h2'} variant={'h6'}>
          {business.name}
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Typography component={'h2'} variant={'body2'}>LVL:</Typography>
          <Typography component={'h2'} variant={'body2'}>{business.exp}</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Typography component={'h2'} variant={'body2'}>Salary ({business.salary}%):</Typography>
          <Typography component={'h2'} variant={'body2'}>1 345 i/m</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Typography component={'h2'} variant={'body2'}>Time to compensation:</Typography>
          <Typography component={'h2'} variant={'body2'}>14:36 m</Typography>
        </Stack>
        {user.action ? <CompensationFrom /> : <TimeForm />}
      </Stack>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CurrentJobCard);