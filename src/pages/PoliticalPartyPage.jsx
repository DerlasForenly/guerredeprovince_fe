import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';

const PoliticalPartyPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [party, setParty] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user === false) {
      setLoading(true);
      return;
    }
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/parties/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setParty(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id, user]);

  if (loading) {
    return <div></div>
  }

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Title>{party.name}</Title>
    </Paper>
  </Container>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoliticalPartyPage);