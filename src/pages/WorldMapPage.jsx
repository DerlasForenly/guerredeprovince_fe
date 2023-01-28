import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WavesIcon from '@mui/icons-material/Waves';

const WorldMapPage = ({ user }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%', height: '700px', display: 'flex' }}>
        <Stack sx={{ p: 2, width: '100%', height: '100%' }} justifyContent={'center'} alignItems={'center'}>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <LocationCityIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
          <Stack direction={'row'}>
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
            <WavesIcon fontSize="large" />
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(WorldMapPage);