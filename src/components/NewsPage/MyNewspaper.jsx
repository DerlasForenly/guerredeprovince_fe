import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ButtonGroup, LinearProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import Title from '../../components/baseComponents/Title';
import Newspaper from './Newspaper';
import { loadNewspaper } from '../../redux/newspaper/actions';
import { Link } from 'react-router-dom';

function MyNewspaper ({ user = false, newspaper, loadNewspaper }) {
  const [newspaperNotFound, setNewspaperNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const width = 400;
  const p = 2;

  useEffect(() => {
    if (user === false) {
      return;
    }

    if (user.newspaper_id === null) {
      setNewspaperNotFound(true);
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/newspapers/${user.newspaper_id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadNewspaper(response.data);

      setNewspaperNotFound(false);
      setLoading(false);
    }).catch((error) => {

      setNewspaperNotFound(true);
      setLoading(false);
    });

  }, [loadNewspaper, user]);

  if (loading) {
    return (
      <Paper sx={{ p: p, width: width }}>
        <LinearProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: p, width: width }}>
      <Stack spacing={2}>
        {
          newspaperNotFound ?
            <NewspaperNotFound /> :
            <Stack>
              <Title>My newspaper</Title>
              <Newspaper />
            </Stack>
        }
        <CreateAndSubs />
      </Stack>
    </Paper>
  );
}

const mapDispatchToProps = {
  loadNewspaper
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNewspaper);

function NewspaperNotFound () {
  return (
    <Stack spacing={2}>
      <Title>You do not have any newspaper</Title>
      <Button fullWidth>
        <Link to={'/newspaper/create'}>
          Create Newspaper
        </Link>
      </Button>
    </Stack>
  );
}

function CreateAndSubs () {
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button fullWidth>
        <Link to={'/article/create'}>
          Create article
        </Link>
      </Button>
      <Button fullWidth>
        <Link to={'/news/subscriptions'}>
          My Subscriptions
        </Link>
      </Button>
    </ButtonGroup>
  )
}