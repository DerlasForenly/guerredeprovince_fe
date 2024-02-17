import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RequestsTableItem from './RequestsTableItem';
import { loadRequests } from '../../redux/politicalParty/actions';

function RequestsTable ({ user, requests }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    if (!user) {
      return;
    }

    setLoading(true);
    dispatch(loadRequests(id)).finally(() => setLoading(false));
  }, [dispatch, id, user]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Level</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          requests.map((request, index) => {
            return <RequestsTableItem request={request} key={index}/>
          })
        }
      </TableBody>
    </Table>
  );
}

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    requests: state.party.requests
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsTable);
