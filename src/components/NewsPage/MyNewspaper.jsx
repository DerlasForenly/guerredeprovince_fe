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
    setLoading(true);

    if (user === false) {
      return;
    }

    if (user.newspaper_id === null) {
      setLoading(false);
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

  if (newspaperNotFound) {
    return (
      <Paper sx={{ p: p, width: width }}>
        <Stack spacing={2}>
          <Title>You do not have any newspaper</Title>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button fullWidth>
              <Link to={'/newspaper/create'}>
                Create Newspaper
              </Link>
            </Button>
            <Button fullWidth>
              <Link to={'/news/subscriptions'}>
                My Subscriptions
              </Link>
            </Button>
          </ButtonGroup>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: p, width: width }}>
      <Stack spacing={2}>
        <Title>My newspaper</Title>
        <Newspaper />
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