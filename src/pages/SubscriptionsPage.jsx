import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadSubscriptions, setSubscriptionsPage } from '../redux/subscriptions/actions';
import { LinearProgress, Pagination, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';
import Container from '@mui/material/Container';
import Newspaper from '../components/SubscriptionsPage/Newspaper';
import Divider from '@mui/material/Divider';

const SubscriptionsPage = ({
                             userId,
                             loadSubscriptions,
                             meta,
                             setSubscriptionsPage,
                             subscriptions
                           }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId === false || userId === undefined || meta.currentPage === undefined) {
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/users/${userId}/subscriptions?page=${meta.currentPage}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
    }).then((response) => {
      loadSubscriptions(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [userId, loadSubscriptions, meta.currentPage]);

  const onPageChange = (event, value) => {
    setSubscriptionsPage(value);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={2} direction={'row'}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <LinearProgress />
          </Paper>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Title>My subscriptions</Title>
          <Stack spacing={2} divider={<Divider />}>
            {
              subscriptions.map((item, index) => {
                return <Newspaper newspaper={item} key={index}></Newspaper>;
              })
            }
            <Stack sx={{ width: '100%' }} justifyContent={'center'} alignItems={'center'}>
              <Pagination
                count={meta.lastPage}
                size="small"
                onChange={onPageChange}
              />
            </Stack>
          </Stack>
        </Paper>
    </Container>
  );
};

const mapDispatchToProps = {
  loadSubscriptions,
  setSubscriptionsPage
};

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id,
    subscriptions: state.subscriptions.subscriptions.subscriptions,
    meta: state.subscriptions.subscriptions.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);