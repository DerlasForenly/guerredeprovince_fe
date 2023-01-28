import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import CurrentJobCard from '../components/JobPage/CurrentJobCard';
import BusinessesTable from '../components/JobPage/BusinessesTable';

const JobPage = ({ user }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2} direction={'row'}>
        <CurrentJobCard />
        <BusinessesTable />
      </Stack>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(JobPage);

