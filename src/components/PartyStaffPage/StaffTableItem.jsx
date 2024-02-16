import { connect } from 'react-redux';
import { ButtonGroup, Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function StaffTableItem ({ user, staffMember }) {
  return (
    <TableRow
      key={staffMember.id}
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
            <Link to={`/user/${staffMember.id}`}>
              {staffMember.user.nickname}
            </Link>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {staffMember.user.level}
      </TableCell>
      <TableCell align="right">
        {staffMember.position.name}
      </TableCell>
      <TableCell align="right">
        {staffMember.created_at}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup size={'small'} variant={'text'} aria-label="text button group" orientation="vertical">
          <Button fullWidth>
            Update position
          </Button>
          <Button fullWidth>
            Change compensation
          </Button>
          <Button fullWidth>
            Free
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffTableItem);