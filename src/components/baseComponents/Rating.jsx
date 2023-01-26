import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import RatingLabel from '../../components/baseComponents/RatingLabel';
import { CircularProgress, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * @param item
 * @param updateItemFunction
 * @param voteUrl
 * @returns {JSX.Element}
 * @constructor
 */
function Rating ({
                   item,
                   updateItemFunction,
                   voteUrl,
                   size = 'medium',
                   typoVariant = 'body2'
                 }) {
  const [loading, setLoading] = useState(false);

  const up = e => {
    const newValue = 1;

    if (item.voted === newValue || loading) {
      return;
    }

    setLoading(true);
    post(newValue);
  };

  const down = e => {
    const newValue = -1;

    if (item.voted === newValue || loading) {
      return;
    }

    setLoading(true);
    post(newValue);
  };

  const post = (value) => {
    axios({
      method: 'post',
      url: voteUrl,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: { value },
    }).then((response) => {
      updateItemFunction(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  };

  return (
    <Stack direction={'row'} spacing={1} alignContent={'center'} justifyContent={'center'}>
      <KeyboardArrowDownIcon
        fontSize={size}
        onClick={down}
      />
      {
        loading ?
          <CircularProgress size={8} /> :
          <RatingLabel
            value={item.rating}
            variant={typoVariant}
          />
      }
      <KeyboardArrowUpIcon
        fontSize={size}
        onClick={up}
      />
    </Stack>
  );
}

export default Rating;