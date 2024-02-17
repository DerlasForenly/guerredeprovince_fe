import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import StaffTableItem from './StaffTableItem';
import { loadStaff } from '../../redux/politicalParty/actions';

function StaffTable ({ user, staff }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    if (!user) {
      return;
    }

    setLoading(true);
    dispatch(loadStaff(id)).finally(() => setLoading(false));
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
          <TableCell align="right">Position</TableCell>
          <TableCell align="right">Joined at</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          staff.map((user, index) => {
            return <StaffTableItem staffMember={user} key={index} />
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
    staff: state.party.staff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffTable);
