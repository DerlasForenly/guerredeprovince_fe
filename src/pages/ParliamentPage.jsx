import { connect, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { LinearProgress, Stack } from '@mui/material';
import Title from '../components/baseComponents/Title';
import { useEffect, useState } from 'react';
import { loadCountry, loadParliamentarians } from '../redux/country/actions';
import { useParams } from 'react-router';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../assets/picture-placeholder.jpg';
import avatarPlaceholder from '../assets/avatar-placeholder.jpg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import BillsOnAgendaTable from '../components/ParliamentPage/BillsOnAgendaTable';
import Box from '@mui/material/Box';

const ParliamentPage = ({ country, loading, user, parliamentarians }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (user) {
      if (!country) {
        dispatch(loadCountry(id)).finally(() => {});
      }

      if (country) {
        dispatch(loadParliamentarians(id)).finally(() => {
          setSeats(new Array(country.parliament_size).fill(null));
        });
      }
    }
  }, [country, dispatch, id, user]);

  if (loading) {
    return <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <LinearProgress />
      </Paper>
    </Container>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Title>{country.political_system.name}</Title>
            <Link to={`/country/${id}/parliament/create-new-law-project`}>
              <Button variant={'outlined'}>Create new law project</Button>
            </Link>
          </Stack>
          <Grid container sx={{ padding: 2 }}>
            {
              seats.map((seat, index) => {
                const parliamentarian = parliamentarians[index]?.user_id ? parliamentarians[index] : null;

                if (parliamentarian) {
                  return (
                    <Box sx={{ background: `linear-gradient(to bottom, white, ${parliamentarians[index].color})` }}>
                      <Link to={`/user/${parliamentarians[index].user_id}`} key={index}>
                        <Avatar
                          variant={'circular'}
                          src={avatarPlaceholder}
                          alt={'user-avatar'}
                          sx={{
                            width: 36,
                            height: 36,
                            m: '2px',
                            border: `3px solid ${parliamentarians[index].color}`,
                          }}
                        />
                      </Link>
                    </Box>
                  );
                } else {
                  return <Avatar
                    key={index}
                    variant={'circular'}
                    src={picturePlaceholder}
                    alt={'user-avatar'}
                    sx={{
                      width: 36,
                      height: 36,
                      m: '2px',
                      border: `3px solid white`,
                    }}
                  />;
                }
              })
            }
          </Grid>
          <Typography component={'h2'}
                      variant={'body1'}>Seats: {parliamentarians.length}/{country.parliament_size}</Typography>
        </Paper>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
            <Title>Bills on the agenda</Title>
            <Button variant={'outlined'}>Go to history</Button>
          </Stack>
          <BillsOnAgendaTable />
        </Paper>
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    country: state.country.country.data,
    loading: state.country.parliamentarians.loading,
    parliamentarians: state.country.parliamentarians.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParliamentPage);