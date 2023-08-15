import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { setUserWorkAction } from '../../redux/auth/actions';

function TimeForm ({ setUserWorkAction }) {
  const [loading, setLoading] = useState(false);
  const timeInput = useRef();

  const onSubmit = event => {
    event.preventDefault();

    setLoading(true);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/businesses/work`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        time: timeInput.current.value,
      }
    }).then((response) => {
      setUserWorkAction(response.data.action);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Stack direction={'row'} alignItems={'flex-end'} width={'fit-content'} spacing={2} justifyContent={'space-between'}>
        <TextField
          inputRef={timeInput}
          type={'number'}
          size={'small'}
          required
          label={'Time'}
          name={'time'}
          placeholder={'Time'}
          min={0}
          max={130}
          variant={'standard'}
          sx={{ width: '100px' }}
          disabled={loading}
        />
        <Button
          type={'submit'}
          variant={'contained'}
          size={'small'}
          disabled={loading}
        >
          Work
        </Button>
      </Stack>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  setUserWorkAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeForm);