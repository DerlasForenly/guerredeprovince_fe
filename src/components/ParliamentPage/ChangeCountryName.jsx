import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Title from '../../components/baseComponents/Title';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';

const ChangeCountryName = ({ lawTypeId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const nameInput = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmitHandler = e => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('meta', JSON.stringify({ name: nameInput.current.value }));
    formData.append('law_type_id', lawTypeId)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/laws`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
      },
      data: formData,
    }).then((response) => {
      enqueueSnackbar('Law has been created!')
      setLoading(false);

      navigate(`/country/${id}`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Title>Change country name</Title>
        <Stack spacing={2}>
          <TextField
            inputRef={nameInput}
            required
            label={'New name'}
            name={'name'}
            placeholder={'New name'}
            max={80}
            sx={{ width: '100%' }}
          />
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant={'body1'} component={'h2'} color={'red'}>
              {error}
            </Typography>
            <Button variant={'contained'} type={'submit'} disabled={loading}>Create</Button>
          </Stack>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCountryName);