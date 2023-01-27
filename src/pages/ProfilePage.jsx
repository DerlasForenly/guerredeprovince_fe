import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { LinearProgress, Stack } from '@mui/material';
import Title from '../components/baseComponents/Title';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/users/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {

      setUser(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, width: 700 }}>
          <LinearProgress />
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: 700 }}>
        <Stack direction={'row'} spacing={2}>
          <Avatar
            src={`${process.env.REACT_APP_API}/${user.avatar}`}
            alt={'user-avatar'}
            sx={{ width: 128, height: 128 }}
          />
          <Stack>
            <Title>{user.nickname}</Title>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);