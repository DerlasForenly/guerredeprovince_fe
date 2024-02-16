import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Title from '../../components/baseComponents/Title';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { setPrimaryColor, setSecondaryColor } from '../../redux/app/actions';

function ThemeSettings ({ setPrimaryColor, primaryColor, setSecondaryColor, secondaryColor }) {
  const [primaryColorTimer, setPrimaryColorTimer] = useState(false);
  const [secondaryColorTimer, setSecondaryColorTimer] = useState(false);

  const onChangeSecondaryColor = (event) => {
    if (secondaryColorTimer) {
      return;
    }

    setSecondaryColorTimer(true);

    setTimeout(() => {
      setSecondaryColor(event.target.value);
      setSecondaryColorTimer(false);
    }, 500);
  }

  const onChangePrimaryColor = (event) => {
    if (primaryColorTimer) {
      return;
    }

    setPrimaryColorTimer(true);

    setTimeout(() => {
      setPrimaryColor(event.target.value);
      setPrimaryColorTimer(false);
    }, 500);
  };


  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Stack spacing={2}>
        <Title>Theme</Title>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography component={'h2'} variant={'body1'}>
            Primary color:
          </Typography>
          <input
            style={{ outline: 'none', border: 'none', background: 'none', width: '80px' }}
            type={'color'}
            defaultValue={primaryColor}
            onChange={onChangePrimaryColor}
          />
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography component={'h2'} variant={'body1'}>
            Secondary color:
          </Typography>
          <input
            style={{ outline: 'none', border: 'none', background: 'none', width: '80px' }}
            type={'color'}
            defaultValue={secondaryColor}
            onChange={onChangeSecondaryColor}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

const mapDispatchToProps = {
  setPrimaryColor,
  setSecondaryColor,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    primaryColor: state.app.primaryColor,
    secondaryColor: state.app.secondaryColor,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings);