import { connect } from 'react-redux';
import { Tab } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import WorldTable from './WorldTable';


function BusinessesTable ({ user }) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="World" value="1" />
            <Tab label="Region" value="2" />
            <Tab label="My" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 1 }}>
          <WorldTable />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 1 }}>
          <WorldTable />
        </TabPanel>
        <TabPanel value="3" sx={{ p: 1 }}>
          <WorldTable />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(BusinessesTable);


