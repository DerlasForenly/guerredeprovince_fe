import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { connect } from 'react-redux';
import { me, clearUser } from '../../redux/auth/actions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

function Timer({ fullTime, time = 0, user, me, clearUser }) {
  const [seconds, setSeconds] = useState(time + 3);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setLoading(true)

      if (!Cookies.get('access_token')) {
        navigate('/sign-in');

        return;
      }

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/auth/me`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token'),
        }
      }).then((response) => {
        me(response.data);
        setLoading(false)
      }).catch((error) => {
        Cookies.remove('access_token');
        setLoading(false)
        clearUser();
        navigate('/sign-in');
      });
    }
  }, [clearUser, me, navigate, seconds]);

  if (loading) {
    return <LinearProgress/>
  }

  return (
    <LinearProgress variant='determinate' value={100 - seconds / fullTime * 100}/>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedRegion: state.worldMap.selectedRegion,
    moveToRegion: state.worldMap.moveToRegion
  };
};

const mapDispatchToProps = {
  me,
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);