import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useSnackbar, withSnackbar } from 'notistack';
import Title from '../components/baseComponents/Title';
import { setLoading } from '../redux/app/actions';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import steyr from '../assets/steyr.jpg';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';

const CreateOffer = ({ loading, setLoading, resources }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const resourceIdInput = useRef();
  const quantityInput = useRef();
  const priceInput = useRef();
  const [isBuying, setIsBuying] = useState(false);

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
        resource_id: parseInt(resourceIdInput.current.value),
        quantity: parseInt(quantityInput.current.value),
        price: parseInt(priceInput.current.value),
        is_buying: isBuying,
      },
    }).then((response) => {
      enqueueSnackbar('New trade offer has been created!');
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
            <Stack direction={'row'} width={'100%'} spacing={2}>
              <Stack width={'50%'} spacing={2}>
                <Title>Create new offer</Title>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="sell"
                  name="radio-buttons-group"
                  row
                  onChange={(e) => {
                    setIsBuying(e.target.value === 'buy');
                  }}
                >
                  <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                  <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                </RadioGroup>
                <TextField
                  sx={{ width: '100%' }}
                  variant={'outlined'}
                  required
                  select
                  label="Resource"
                  inputRef={resourceIdInput}
                  disabled={loading}
                  name={'resource_id'}
                  defaultValue={''}
                >
                  {
                    resources.map((resource, index) => {
                      return <MenuItem key={index} value={resource.id}>{resource.name}</MenuItem>;
                    })
                  }
                </TextField>
                <TextField
                  sx={{ width: '100%' }}
                  variant={'outlined'}
                  required
                  label="Quantity / 437654"
                  disabled={loading}
                  name={'quantity'}
                  type={'number'}
                  inputRef={quantityInput}
                >
                </TextField>
                <TextField
                  sx={{ width: '100%' }}
                  variant={'outlined'}
                  required
                  label="Price (135~575)"
                  disabled={loading}
                  name={'price'}
                  type={'number'}
                  inputRef={priceInput}
                >
                </TextField>
              </Stack>
              <Stack justifyContent={'flex-end'} spacing={2}>
                <Typography component={'h2'} variant={'body1'}>One day I wanna add some diagrams here...</Typography>
                <img src={steyr} alt={'graph'} width={'100%'}/>
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant={'body1'} component={'h2'} color={'red'}>
                {error}
              </Typography>
              <Button
                type={'submit'}
                size={'large'}
                variant={'contained'}
                disabled={loading}
              >
                Create
              </Button>
            </Stack>
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
