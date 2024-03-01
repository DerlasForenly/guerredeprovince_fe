import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { useSnackbar, withSnackbar } from 'notistack';
import Title from '../components/baseComponents/Title';
import { setLoading } from '../redux/app/actions';

const CreateOffer = ({ loading, setLoading, resources }) => {
  const { enqueueSnackbar } = useSnackbar();
  const resourceIdInput = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/trade-offers`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
      data: {
        resource_id: resourceIdInput.current.value,
        quantity: 100,
        is_buying: true,
      },
    }).then((response) => {
      enqueueSnackbar('New business has been founded!')
      setLoading(false);
      navigate(`/market`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  };

  if (error) {
    return (
      <div></div>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <Title>Create new offer</Title>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

const mapDispatchToProps = {
  setLoading,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.app.loading,
    resources: state.app.resourcesList,
  };
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(CreateOffer));
