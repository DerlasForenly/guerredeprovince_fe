import { setUserMoveAction } from '../../redux/auth/actions';
import { setMovingToRegion } from '../../redux/worldMap/actions';
import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function MoveForm({ user, setUserMoveAction, selectedRegion, setMovingToRegion, movingToRegion }) {
  const [loading, setLoading] = useState(false);

  const onMoveClick = e => {
    e.preventDefault();

    if (selectedRegion === false) {
      return;
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/world-map/traveling/${selectedRegion?.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      setUserMoveAction(response.data.action);
      setMovingToRegion(response.data.move.endRegion);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }

  if (selectedRegion && user?.current_region?.id !== selectedRegion?.id && !user?.move_action) {
    return (
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Stack spacing={1} justifyContent={'center'}>
          <Button variant="outlined" size={'large'} onClick={onMoveClick} disabled={loading}>Move</Button>
          <Typography component={'h2'} variant={'body1'}>It will last 15 min and 5 435 G</Typography>
        </Stack>
      </Stack>
    )
  }

  if (user.move_action) {
    return (
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Stack spacing={1} justifyContent={'center'}>
          <Button variant="outlined" size={'large'} onClick={onMoveClick} disabled={loading}>Cancel</Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <></>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedRegion: state.worldMap.selectedRegion,
    movingToRegion: state.worldMap.movingToRegion,
  };
};

const mapDispatchToProps = {
  setUserMoveAction,
  setMovingToRegion
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveForm);