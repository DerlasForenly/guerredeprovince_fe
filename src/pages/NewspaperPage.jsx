import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Container from '@mui/material/Container';

import { loadNewspaper } from '../redux/newspaper/actions';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';
import { ButtonGroup, LinearProgress, Stack } from '@mui/material';
import NewspaperArticles from '../components/NewspaperPage/NewspaperArticles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SubscribeButton from '../components/NewspaperPage/SubscribeButton';
import { updateSubscription } from '../redux/newspaper/actions';

function NewspaperPage ({ newspaper, loadNewspaper, updateSubscription }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/newspapers/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadNewspaper(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });

  }, [id, loadNewspaper]);

  if (loading) {
    return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2} direction={'row'} sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, width: 650 }}>
          <LinearProgress />
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
          <Title>Newspaper articles</Title>
          <NewspaperArticles />
        </Paper>
      </Stack>
    </Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2} direction={'row'} sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 650 }}>
          <Stack sx={{ width: '100%' }}>
            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <Avatar
                  variant={'square'}
                  src={`${process.env.REACT_APP_API}/${newspaper.avatar}`}
                  sx={{ width: 200, height: 200 }}
                />
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="text"
                >
                  <SubscribeButton key={'1'} newspaper={newspaper} updateSubscription={updateSubscription} />
                  <Button key="2" onClick={() => (navigate(`#`))}>Edit</Button>
                  <Button key="3" onClick={() => (navigate(`/newspaper/${newspaper.id}/staff`))}>Staff</Button>
                  <Button key="4" color={'error'}>Delete</Button>
                </ButtonGroup>
              </Stack>
              <Stack spacing={3} sx={{ width: '100%' }}>
                <Title>{newspaper.name}</Title>
                <Typography variant={'body2'} component={'h2'}>
                  {newspaper.description}
                </Typography>
                <Stack>
                  <Typography variant={'body1'} component={'h2'}>
                    Statistics:
                  </Typography>
                  <StatisticsRow
                    label="Best article:"
                    value={newspaper.best_article?.title}
                  />
                  <StatisticsRow
                    label="Worst article:"
                    value={newspaper.worst_article?.title}
                  />
                  <StatisticsRow
                    label="Count articles:"
                    value={newspaper?.total_articles}
                  />
                  <StatisticsRow
                    label="Total rating:"
                    value={newspaper?.rating}
                  />
                  <StatisticsRow
                    label="Personal:"
                    value={newspaper?.count_staff}
                  />
                  <StatisticsRow
                    label="Founded:"
                    value={newspaper?.created_at}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 400 }}>
          <Title>Newspaper articles</Title>
          <NewspaperArticles />
        </Paper>
      </Stack>
    </Container>
  );
}

const mapDispatchToProps = {
  loadNewspaper,
  updateSubscription
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperPage);

function StatisticsRow ({ label, value, url = false }) {
  return (
    <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
      <Typography variant={'body2'} component={'h2'}>
        {label}
      </Typography>
      <Typography variant={'body2'} component={'h2'}>
        {value}
      </Typography>
    </Stack>
  );
}

