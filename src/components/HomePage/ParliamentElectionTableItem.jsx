import { connect, useDispatch } from 'react-redux';
import { Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadActiveParliamentElection } from '../../redux/country/actions';
import { useState } from 'react';

function ParliamentElectionTableItem ({ user, candidate, election }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onVote = e => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/elections`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        candidate_id: candidate.id,
      },
    }).then((response) => {
      console.log(response.data);
      if (user?.citizenship?.id) {
        dispatch(loadActiveParliamentElection(user.citizenship.id)).finally(() => {})
      }
    }).catch((error) => {

    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <TableRow
      key={candidate.id}
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
            <Link to={`/party/${candidate.candidable_id}`}>
              {candidate.name}
            </Link>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {candidate.members}
      </TableCell>
      <TableCell align="center">
        {
          candidate.my_vote ? <div>+</div> :
            <Button fullWidth size={'small'} variant={'text'} onClick={onVote} disabled={loading || election.voted }>
              Vote up
            </Button>
        }
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    election: state.country.parliamentElection.data,
  };
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ParliamentElectionTableItem);