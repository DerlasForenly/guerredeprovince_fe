import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { ButtonGroup, Stack } from '@mui/material';

function CompensationFrom ({ user }) {
  return (
    <Stack direction={'row'} alignItems={'flex-end'} width={'100%'} spacing={2} justifyContent={'space-between'}>
      <ButtonGroup
        fullWidth
        variant={'text'}
      >
        <Button>interrupt</Button>
        <Button disabled>Compensation</Button>
      </ButtonGroup>
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CompensationFrom);