import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Title from '../../components/baseComponents/Title';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { setPrimaryColor } from '../../redux/app/actions';

function ThemeSettings ({ setPrimaryColor, primaryColor }) {
  const [primaryColorTimer, setPrimaryColorTimer] = useState(false);

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
    <Paper sx={{ p: 2, width: 300 }}>
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
            defaultValue={primaryColor}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

const mapDispatchToProps = {
  setPrimaryColor,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    primaryColor: state.app.primaryColor,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings);