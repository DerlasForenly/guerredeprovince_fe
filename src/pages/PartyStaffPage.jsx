import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import StaffTable from '../components/PartyStaffPage/StaffTable';
import RequestsTable from '../components/PartyStaffPage/RequestsTable';
import Title from '../components/baseComponents/Title';

const PartyStaffPage = ({ user }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Title>Staff</Title>
          <StaffTable />
        </Paper>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Title>Requests</Title>
          <RequestsTable />
        </Paper>
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyStaffPage);