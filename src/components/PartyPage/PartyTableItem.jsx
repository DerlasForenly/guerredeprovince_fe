import { connect } from 'react-redux';
import { Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function PartyTableItem ({ user, party }) {
  const [loading, setLoading] = useState(false);

  const onJoinButtonClick = e => {
    setLoading(true);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/requests/parties/${party.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    });
  }

  if (loading || !party) {
    return <TableRow></TableRow>;
  }

  return (
    <TableRow
      key={party.id}
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
            <Link to={`/party/${party.id}`}>
              [{party.tag}] {party.name}
            </Link>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Link to={`/country/${party.country.id}`}>
          {party.country.name}
        </Link>
      </TableCell>
      <TableCell align="right">
        <Link to={`/party/${party.id}/staff`}>
          {party.members}
        </Link>
      </TableCell>
      <TableCell align="right">
        <Link to={`/user/${party.leader.id}`}>
          {party.leader.nickname}
        </Link>
      </TableCell>
      <TableCell align="center">
        <Button size={'small'} onClick={onJoinButtonClick} disabled={user.political_party || loading}>Join</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PartyTableItem);