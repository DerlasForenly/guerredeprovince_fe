import { connect } from 'react-redux';
import { LinearProgress, Tab } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import WorldTable from './WorldTable';
import axios from 'axios';
import Cookies from 'js-cookie';
import RegionTable from './RegionTable';
import MyBusinessTable from './MyBusinessTable';

function BusinessesTable ({ user }) {
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [myBusinesses, setMyBusinesses] = useState([]);
  const [regionalBusinesses, setRegionalBusinesses] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/businesses`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setBusinesses(response.data);
      setMyBusinesses(response.data.filter(business => business.owner.id === user.id))
      setRegionalBusinesses(response.data.filter(business => business.region.id === user.current_region.id))
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [user]);

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
            <Tab label="Region" value="2" />
            <Tab label="My" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 1 }}>
          <WorldTable businesses={businesses}/>
        </TabPanel>
        <TabPanel value="2" sx={{ p: 1 }}>
          <RegionTable businesses={myBusinesses}/>
        </TabPanel>
        <TabPanel value="3" sx={{ p: 1 }}>
          <MyBusinessTable businesses={regionalBusinesses}/>
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


