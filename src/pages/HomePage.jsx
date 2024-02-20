import { connect, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Copyright from '../components/baseComponents/Copyright';
import Title from '../components/baseComponents/Title';
import { useEffect } from 'react';
import { loadActiveElections } from '../redux/country/actions';

const HomePage = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadActiveElections(user.citizenship.id)).then(r => {});
    }
  }, [dispatch, user]);

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Title>Current elections</Title>
    </Paper>
    <Copyright sx={{ pt: 4 }} />
  </Container>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    requests: state.party.requests.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
