import { connect, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import StaffTable from '../components/PartyStaffPage/StaffTable';
import RequestsTable from '../components/PartyStaffPage/RequestsTable';
import Title from '../components/baseComponents/Title';
import { useEffect } from 'react';
import { loadRequests } from '../redux/politicalParty/actions';
import { useParams } from 'react-router';

const PartyStaffPage = ({ user, requests }) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (user) {
      dispatch(loadRequests(id)).then(r => {});
    }
  }, [dispatch, id, user]);


  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        {
          requests.length === 0 ? <div></div> :
            <Paper sx={{ p: 2, width: '100%' }}>
              <Title>Requests</Title>
              <RequestsTable />
            </Paper>
        }
        <Paper sx={{ p: 2, width: '100%' }}>
          <Title>Staff</Title>
          <StaffTable />
        </Paper>
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    requests: state.party.requests.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyStaffPage);