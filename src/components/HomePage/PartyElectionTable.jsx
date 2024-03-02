import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { loadActivePartyElection } from '../../redux/country/actions';
import Typography from '@mui/material/Typography';
import PartyElectionTableItem from './PartyElectionTableItem';
function PartyElectionTable ({ user, election, loading }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.political_party?.id) {
      dispatch(loadActivePartyElection(user.political_party.id)).finally(() => {});
    }
  }, [dispatch, user.political_party.id]);

  if (loading) {
    return <LinearProgress />;
  }

  if (!election) {
    return <Typography component={'h2'} variant={'body2'}>There is no active election</Typography>
  }

  console.log(election)

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Level</TableCell>
          <TableCell align="right">Votes</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          election.candidates.map((user, index) => {
            return <PartyElectionTableItem candidate={user} key={index} />
          })
        }
      </TableBody>
    </Table>
  );
}

const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    election: state.country.partyElection.data,
    loading: state.country.partyElection.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyElectionTable);
