import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { ButtonGroup, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import Title from '../components/baseComponents/Title';
import PartiesTable from '../components/PartyPage/PartiesTable';

const PartyPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [politicalParty, setPoliticalParty] = useState(false);

  useEffect(() => {
    if (!user.political_party) {
      return
    }

    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/parties/${user.political_party.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setPoliticalParty(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [user]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, width: '100%' }}>
          {
            user.political_party || loading === false ?
              <Stack>
                <Title>My party</Title>
                <Typography component={'h2'} variant={'body1'}>[{politicalParty.tag}] {politicalParty.name}</Typography>
                <Typography component={'h2'} variant={'body1'}>{politicalParty.description}</Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button fullWidth>
                    Edit
                  </Button>
                  <Button fullWidth>
                    <Link to={`/party/${politicalParty.id}/staff`}>
                      Manage staff
                    </Link>

                  </Button>
                  <Button fullWidth>
                    Leave
                  </Button>
                  <Button fullWidth>
                    Dissolve
                  </Button>
                </ButtonGroup>
              </Stack> :
              <Button fullWidth>
                <Link to={'/party/create'}>
                  Create new party
                </Link>
              </Button>
          }
        </Paper>
        <PartiesTable />
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.party.parties.loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyPage);