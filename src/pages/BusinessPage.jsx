import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { loadUserStorage } from '../redux/storage/actions';

const BusinessPage = ({storage, user, loadUserStorage}) => {
  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
    </Paper>
  </Container>;
};

const mapDispatchToProps = {
  loadUserStorage
};

const mapStateToProps = state => ({
  storage: state.storage.storage,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);