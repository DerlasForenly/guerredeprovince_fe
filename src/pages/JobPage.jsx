import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import CurrentJobCard from '../components/JobPage/CurrentJobCard';
import BusinessesTable from '../components/JobPage/BusinessesTable';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const JobPage = ({ user }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Stack spacing={2} direction={'row'}>
          <CurrentJobCard />
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Button fullWidth>
              <Link to={'/job/create'}>
                Start new business
              </Link>
            </Button>
          </Paper>
        </Stack>
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

