import { connect } from 'react-redux';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import RequestsTableItem from './RequestsTableItem';

function RequestsTable ({ user }) {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/parties/${id}/requests`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setRequests(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id, user]);

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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(RequestsTable);
