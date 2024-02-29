import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Title from '../../components/baseComponents/Title';
import { useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';

const StartParliamentElection = ({ lawTypeId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmitHandler = e => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('meta', JSON.stringify({}));
    formData.append('law_type_id', lawTypeId);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/laws`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
      data: formData,
    }).then((response) => {
      enqueueSnackbar('Law has been created!');
      setLoading(false);

      navigate(`/country/${id}/parliament`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Title>Start parliament election</Title>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'body1'} component={'h2'} color={'red'}>
            {error}
          </Typography>
          <Button variant={'contained'} type={'submit'} disabled={loading}>Create</Button>
        </Stack>
      </Paper>
    </form>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    country: state.country.country.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartParliamentElection);