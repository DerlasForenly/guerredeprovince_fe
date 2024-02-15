import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { loadBusiness, updateBusiness } from '../redux/business/actions';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';

const BusinessPage = ({business, user, loadBusiness, updateBusiness}) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user === false) {
      setLoading(true);
      return;
    }
    setLoading(true);

    updateBusiness({});

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/businesses/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadBusiness(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id, loadBusiness, updateBusiness, user]);

  if (loading) {
    return <div></div>
  }

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
      <Typography component={'h2'} variant={'body1'}>{business.name}</Typography>
    </Paper>
  </Container>;
};

const mapDispatchToProps = {
  loadBusiness,
  updateBusiness
};

const mapStateToProps = state => ({
  business: state.business.business,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);