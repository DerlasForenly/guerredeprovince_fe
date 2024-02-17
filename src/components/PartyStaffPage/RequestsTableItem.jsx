import { connect, useDispatch } from 'react-redux';
import { ButtonGroup, Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { acceptJoinRequest, declineJoinRequest } from '../../redux/politicalParty/actions';
import { useParams } from 'react-router';

function RequestsTableItem ({ request }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const onAccept = (e) => {
    setLoading(true);
    dispatch(acceptJoinRequest(id, request.id)).finally(() => setLoading(false));

  }

  const onDecline = (e) => {
    setLoading(true);
    dispatch(declineJoinRequest(id, request.id)).finally(() => setLoading(false));
  }

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
        {request.created_at}
      </TableCell>
      <TableCell align="right">
        <ButtonGroup size={'small'} variant={'text'} aria-label="text button group" disabled={loading}>
          <Button fullWidth onClick={onAccept}>
            Accept
          </Button>
          <Button fullWidth onClick={onDecline}>
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