import { connect } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RequestsTableItem from './RequestsTableItem';

function RequestsTable ({ requests, loading }) {
  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Level</TableCell>
          <TableCell align="right">Created at</TableCell>
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

const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    requests: state.party.requests.data,
    loading: state.party.requests.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsTable);
