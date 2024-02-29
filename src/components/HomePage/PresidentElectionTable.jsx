import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { loadActivePresidentElection } from '../../redux/country/actions';
import PresidentElectionTableItem from './PresidentElectionTableItem';
import Typography from '@mui/material/Typography';

function PresidentElectionTable ({ user, election, loading }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadActivePresidentElection(user.citizenship.id)).finally(() => {});
    }
  }, [dispatch, user]);

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
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          election.candidates.map((user, index) => {
            return <PresidentElectionTableItem candidate={user} key={index} />
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
    election: state.country.presidentElection.data,
    loading: state.country.presidentElection.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PresidentElectionTable);
