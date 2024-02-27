import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Copyright from '../components/baseComponents/Copyright';
import Title from '../components/baseComponents/Title';
import ElectionTable from '../components/HomePage/ElectionTable';

const HomePage = ({ user }) => {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Title>President elections</Title>
      <ElectionTable />
    </Paper>
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
