import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Title from '../components/baseComponents/Title';
import picturePlaceholder from '../assets/picture-placeholder.jpg';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SvgMap from '../components/WorldMapPage/SvgMap';

import MoveForm from '../components/WorldMapPage/MoveForm';
import Timer from '../components/WorldMapPage/Timer';

const WorldMapPage = ({ user, selectedRegion, moveToRegion }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={3}>
            <Stack spacing={4} mb={5} verticalAlign={'center'}>
              <Stack direction={'row'} justifyContent={'space-between'} >
                <Stack direction={'column'} width={300} spacing={1}>
                  <Title>Current location</Title>
                  <Stack direction={'row'} spacing={1}>
                    <Avatar
                      variant={'square'}
                      src={picturePlaceholder}
                      alt={'country-avatar'}
                      sx={{ height: 56, width: 56 }}
                    />
                    <Stack>
                      <Typography component={'h2'} variant={'body1'}>{user?.current_region?.country?.name}</Typography>
                      <Typography component={'h2'} variant={'body1'}>{user?.current_region?.name}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <MoveForm />
                {
                  selectedRegion && !user?.move_action?.end_region ? <Stack direction={'column'} spacing={1} textAlign={'right'} width={300}>
                    <Title>Selected location</Title>
                    <Stack direction={'row'} spacing={1} justifyContent={'right'}>
                      <Stack>
                        <Typography component={'h2'} variant={'body1'}>{selectedRegion.country.name}</Typography>
                        <Typography component={'h2'} variant={'body1'}>{selectedRegion.name}</Typography>
                      </Stack>
                      <Avatar
                        variant={'square'}
                        src={picturePlaceholder}
                        alt={'country-avatar'}
                        sx={{ height: 56, width: 56 }}
                      />
                    </Stack>
                  </Stack> : <></>
                }
                {
                  user?.move_action?.end_region ? <Stack direction={'column'} spacing={1} textAlign={'right'} width={300}>
                    <Title>Moving to location</Title>
                    <Stack direction={'row'} spacing={1} justifyContent={'right'}>
                      <Stack>
                        <Typography component={'h2'} variant={'body1'}>{user.move_action.end_region.country.name}</Typography>
                        <Typography component={'h2'} variant={'body1'}>{user.move_action.end_region.name}</Typography>
                      </Stack>
                      <Avatar
                        variant={'square'}
                        src={picturePlaceholder}
                        alt={'country-avatar'}
                        sx={{ height: 56, width: 56 }}
                      />
                    </Stack>
                  </Stack> : <></>
                }
              </Stack>
            </Stack>
            {
              user.move_action ? <Timer fullTime={user.move_action.time} time={user.move_action.remaining_time} /> : <></>
            }
          </Stack>
        </Paper>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={3}>
            <SvgMap></SvgMap>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedRegion: state.worldMap.selectedRegion,
    moveToRegion: state.worldMap.moveToRegion
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapPage);