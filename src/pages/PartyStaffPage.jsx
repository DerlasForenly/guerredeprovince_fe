import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PartyStaffPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/parties/${user.political_party.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [user]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, width: '100%' }}>
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