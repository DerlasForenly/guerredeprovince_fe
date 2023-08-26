import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';

const MarketPage = () => {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Title>Empty Market page</Title>
    </Paper>
  </Container>;
};

export default connect(null, null)(MarketPage);