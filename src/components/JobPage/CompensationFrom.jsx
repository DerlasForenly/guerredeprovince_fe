import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { ButtonGroup, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { me, clearUser } from '../../redux/auth/actions';
import { useNavigate } from 'react-router';

function CompensationFrom ({ user, me, clearUser }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onCompensation = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/businesses/get-salary`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/auth/me`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token'),
        }
      }).then((response) => {
        me(response.data);
        setLoading(false);
      }).catch((error) => {
        Cookies.remove('access_token');
        clearUser();
        navigate('/sign-in');
      });

    }).catch((error) => {
      setLoading(false);
    });
  }

  const onInterrupt = e => {

  }

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'} width={'50%'}>
      <Stack direction={'row'} spacing={2} width={'90%'}>
        <ButtonGroup
          fullWidth
          variant={'text'}
        >
          <Button onClick={onInterrupt} disabled={loading}>Interrupt</Button>
          <Button disabled={user.action.remaining_time || loading} onClick={onCompensation}>Compensation</Button>
        </ButtonGroup>

      </Stack>
      { loading ? <CircularProgress size={25}/> : <div></div> }
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  me, clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationFrom);