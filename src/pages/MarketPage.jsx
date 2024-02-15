import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadUserStorage } from '../redux/storage/actions';

const MarketPage = ({storage, user, loadUserStorage}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === false) {
      setLoading(true);
      return;
    }
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/users/${user.id}/treasury`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadUserStorage(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [user, loadUserStorage]);

  if (loading) {
    return <div></div>
  }

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Stack spacing={2}>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Title>Storage</Title>
        {
          storage.map((element, index) => {
            return <Stack direction={'row'} justifyContent={'space-between'} key={index}>
              <Typography component={'h2'} variant={'body1'}>{element?.name}:</Typography>
              <Typography component={'h2'} variant={'body1'}>{element?.quantity}/?</Typography>
            </Stack>
          })
        }
      </Paper>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Title>Market</Title>
      </Paper>
    </Stack>
  </Container>;
};

const mapDispatchToProps = {
  loadUserStorage
};

const mapStateToProps = state => ({
  storage: state.storage.storage,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);