import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import Title from '../components/baseComponents/Title';
import { ButtonGroup, LinearProgress, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CountryPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user === false) {
      return;
    }
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/countries/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setCountry(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id, user]);

  if (loading) {
    return <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <LinearProgress />
      </Paper>
    </Container>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Stack direction={'row'} spacing={2}>
          <Stack spacing={2}>
            <Avatar
              variant={'square'}
              src={`${process.env.REACT_APP_API}/${country.emblem}`}
              alt={'user-avatar'}
              sx={{ width: 128, height: 128 }}
            />
            <ButtonGroup
              size={'small'}
              variant={'text'}
              aria-label="text button group"
              disabled={loading}
              orientation="vertical"
            >
              <Button>
                <Link to={`/country/${country.id}/parliament`}>Go to parliament</Link>
              </Button>
              <Button>
                Update emblem
              </Button>
              <Button>
                Update name
              </Button>
              <Button>
                Update color
              </Button>
              {/*<Button>Request citizenship</Button>*/}
            </ButtonGroup>
          </Stack>

          <Stack>
            <Title>{country.name}</Title>
            <Typography component={'h2'} variant={'body1'}>Union:</Typography>
            <br />
            <Typography component={'h2'} variant={'body1'}>Capital:</Typography>
            <Typography component={'h2'} variant={'body1'}>Regions: {country.regions.length}</Typography>
            <Typography component={'h2'} variant={'body1'}>Borders:</Typography>
            <Typography component={'h2'} variant={'body1'}>Political
              system: {country.political_system.name}</Typography>
            <br />
            <Typography component={'h2'} variant={'body1'}>Leader: {country.leader.nickname}</Typography>
            <Typography component={'h2'} variant={'body1'}>Minister of Defence:</Typography>
            <Typography component={'h2'} variant={'body1'}>Foreign Minister:</Typography>
            <Typography component={'h2'} variant={'body1'}>Prime Minister:</Typography>
            <Typography component={'h2'} variant={'body1'}>Minister of Economy:</Typography>
            <Typography component={'h2'} variant={'body1'}>Ministry of Energy:</Typography>
            <Typography component={'h2'} variant={'body1'}>Ministry of Infrastructure:</Typography>
            <Typography component={'h2'} variant={'body1'}>Minister of Health Protection:</Typography>
            <Typography component={'h2'} variant={'body1'}>Ministry of Social Policy:</Typography>
            <br />
            <Typography component={'h2'} variant={'body1'}>Head commander of the Army:</Typography>
            <br />
            <Typography component={'h2'} variant={'body1'}>Population:</Typography>
            <Typography component={'h2'} variant={'body1'}>Parties:</Typography>
            <Typography component={'h2'} variant={'body1'}>Business:</Typography>
            <br />
            <Typography component={'h2'} variant={'body1'}>Resources:</Typography>
            <Typography component={'h2'} variant={'body1'}>Taxes:</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage);