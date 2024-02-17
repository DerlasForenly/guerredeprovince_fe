import { connect, useDispatch } from 'react-redux';
import { LinearProgress, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import PartyTableItem from './PartyTableItem';
import { setLoading, loadParties } from '../../redux/politicalParty/actions';

function PartiesTable ({ user, parties, loading, setLoading }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');

  useEffect(() => {
    if (user) {
      dispatch(loadParties()).then(r => {});
    }
  }, [dispatch, setLoading, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <LinearProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="World" value="1" />
            <Tab label="Country" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 1 }}>
          <Table sx={{ minWidth: 500, width: '100%' }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Members</TableCell>
                <TableCell align="right">Leader</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                parties.map((party, index) => (
                  <PartyTableItem party={party} key={index} />
                ))
              }
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value="2" sx={{ p: 1 }}>
          <Table sx={{ minWidth: 500, width: '100%' }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Members</TableCell>
                <TableCell align="right">Leader</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                parties.map((party, index) => (
                  <PartyTableItem party={party} key={index} />
                ))
              }
            </TableBody>
          </Table>
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

const mapDispatchToProps = {
  setLoading
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.party.parties.loading,
    parties: state.party.parties.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartiesTable);
