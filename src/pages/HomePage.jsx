import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Copyright from '../components/baseComponents/Copyright';
import Title from '../components/baseComponents/Title';
import PresidentElectionTable from '../components/HomePage/PresidentElectionTable';
import { Stack } from '@mui/material';
import ParliamentElectionTable from '../components/HomePage/ParliamentElectionTable';
import PartyElectionTable from '../components/HomePage/PartyElectionTable';

const HomePage = ({ user }) => {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Stack spacing={2}>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Title>President elections</Title>
        <PresidentElectionTable />
      </Paper>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Title>Parliament elections</Title>
        <ParliamentElectionTable />
      </Paper>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Title>Party elections</Title>
        <PartyElectionTable />
      </Paper>
    </Stack>
    <Copyright sx={{ pt: 4 }} />
  </Container>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
