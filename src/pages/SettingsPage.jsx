import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Title from '../components/baseComponents/Title';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { setPrimaryColor } from '../redux/app/actions';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ProfileSettings from '../components/SettingsPage/ProfileSettings';
import ThemeSettings from '../components/SettingsPage/ThemeSettings';

function SettingsPage ({ user }) {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack direction={'column'} spacing={2}>
        <ProfileSettings />
        <Paper sx={{ p: 2, width: '500px' }}>
          <Stack spacing={2}>
            <Title>General</Title>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography component={'h2'} variant={'body1'} noWrap>
                Default language:
              </Typography>
              <TextField
                sx={{ width: '50%' }}
                required
                select
                label="Language"
                defaultValue={0}
                disabled={true}
                variant="standard"
              >
                <MenuItem key={1} value={0}>Ukrainian</MenuItem>
                <MenuItem key={2} value={1}>English</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </Paper>
        <ThemeSettings />
      </Stack>
    </Container>
  );
}

const mapDispatchToProps = {
  setPrimaryColor,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);