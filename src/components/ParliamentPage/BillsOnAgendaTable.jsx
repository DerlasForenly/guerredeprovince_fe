import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { loadActiveLaws } from '../../redux/country/actions';
import BillsOnAgendaItem from './BillsOnAgendaItem';

function BillsOnAgendaTable ({ laws, loading }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadActiveLaws(id)).finally(() => {})
  }, [dispatch, id]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Rating</TableCell>
          <TableCell align="right">Votes</TableCell>
          <TableCell align="right">Created at</TableCell>
          <TableCell align="right">Time to end</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          laws.map((law, index) => {
            return <BillsOnAgendaItem law={law} key={index}/>
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
    laws: state.country.activeLaws.data,
    loading: state.country.activeLaws.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsOnAgendaTable);
