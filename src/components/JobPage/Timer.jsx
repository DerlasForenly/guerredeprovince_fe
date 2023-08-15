import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

function Timer({ time = 0}) {
  const [seconds, setSeconds] = useState(time);

  const timeToCompensation = (seconds) => {
    if (seconds <= 0) {
      return 'Ready';
    }

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds + " min";
  }

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <Typography component={'h2'} variant={'body2'}>{ timeToCompensation(seconds) }</Typography>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
