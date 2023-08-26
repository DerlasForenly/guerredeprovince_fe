import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Copyright from '../components/baseComponents/Copyright';
import Title from '../components/baseComponents/Title';

const HomePage = () => {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Title>Empty Home page</Title>
    </Paper>
    <Copyright sx={{ pt: 4 }} />
  </Container>;
};

export default connect(null, null)(HomePage);
