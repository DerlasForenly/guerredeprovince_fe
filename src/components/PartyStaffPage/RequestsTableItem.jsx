import { connect } from 'react-redux';
import { ButtonGroup, Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function RequestsTableItem ({ user, request }) {
  return (
    <TableRow
      key={request.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Stack direction={'row'} spacing={1}>
          <Avatar
            variant={'square'}
            src={picturePlaceholder}
            alt={'party-avatar'}
          />
          <Stack>
            <Link to={`/user/${request.id}`}>
              {request.user.nickname}
            </Link>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {request.user.level}
      </TableCell>
      <TableCell align="right">
        <ButtonGroup size={'small'} variant={'text'} aria-label="text button group">
          <Button fullWidth>
            Accept
          </Button>
          <Button fullWidth>
            Decline
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsTableItem);