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
import NoJobCard from './NoJobCard';
import Button from '@mui/material/Button';
import { clearUserJob } from '../../redux/auth/actions';

function CurrentJobCard ({ user, clearUserJob }) {
  const [business, setBusiness] = useState(false);
  const [loading, setLoading] = useState(true);

  const timeToCompensation = (seconds) => {
    if (seconds <= 0) {
      return 'Ready';
    }

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds + "min";
  }

  const onLeave = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/businesses/drop-job`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      clearUserJob();
    }).catch((error) => {

    });
  };

  useEffect(() => {
    if (user === false || user.job_business_id === null) {
      setLoading(false);
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
  }, [user.job_business_id, user]);

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content' }}>
        <LinearProgress />
      </Paper>
    );
  }

  if (user.job_business_id === null) {
    return <NoJobCard user={user}/>;
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content' }}>
        <Title>Current job</Title>
        <Stack spacing={2} direction={'row'}>
          <Avatar
            variant={'square'}
            src={picturePlaceholder}
            alt={'business-avatar'}
            sx={{
              height: 200,
              width: 200,
            }}
          />
          <Stack sx={{ width: '100%' }} justifyContent={'space-between'}>
            <Stack spacing={1}>
              <Typography component={'h2'} variant={'h6'}>
                {business.name}
              </Typography>
              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography component={'h2'} variant={'body2'}>Exp:</Typography>
                <Typography component={'h2'} variant={'body2'}>{business.exp}</Typography>
              </Stack>
              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography component={'h2'} variant={'body2'}>Salary ({business.salary}%):</Typography>
                <Typography component={'h2'} variant={'body2'}>1 345 i/m</Typography>
              </Stack>

              {user.action ? <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography component={'h2'} variant={'body2'}>Time to compensation:</Typography>
                <Typography component={'h2'} variant={'body2'}>{ timeToCompensation(user.action.remaining_time) }</Typography>
              </Stack> : <div />}

            </Stack>

            <Stack width={'100%'} justifyContent={'space-between'} direction={'row'}>
              {user.action ? <CompensationFrom /> : <TimeForm />}
              <Button variant={'text'} onClick={onLeave} disabled={loading}>
                Leave
              </Button>
            </Stack>
          </Stack>

        </Stack>
      </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  clearUserJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentJobCard);
