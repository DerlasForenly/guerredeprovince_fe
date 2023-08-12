import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { ButtonGroup, Stack } from '@mui/material';
import { me, clearUser } from '../../redux/auth/actions';

function CompensationFrom ({ user, me, clearUser }) {
  const onInterrupt = e => {

  }

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'} width={'50%'}>
      <Stack direction={'row'} spacing={2} width={'90%'}>
        <ButtonGroup
          fullWidth
          variant={'text'}
        >
          <Button onClick={onInterrupt}>Interrupt</Button>
        </ButtonGroup>

      </Stack>
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  me, clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationFrom);