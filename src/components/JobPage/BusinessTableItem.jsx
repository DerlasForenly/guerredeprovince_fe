import { connect } from 'react-redux';
import { Stack, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setUserJob } from '../../redux/auth/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BusinessTableItem ({ user, business, setUserJob }) {
  const [loading, setLoading] = useState(false);

  const onJoinButtonClick = e => {
    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/businesses/${business.id}/get-job`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      setUserJob(response.data.employee.business_id)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    });
  }

  return (
    <TableRow
      key={business.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Stack direction={'row'} spacing={1}>
          <Avatar
            variant={'square'}
            src={picturePlaceholder}
            alt={'business-avatar'}
          />
          <Stack>
            <Link to={`/business/${business.id}`}>
              <div>{business.name}</div>
            </Link>
            <Link to={`/user/${business.owner.id}`}>
              <div>{business.owner.nickname}</div>
            </Link>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">{business.corporation?.name ? business.corporation?.name : 'None'}</TableCell>
      <TableCell align="right">{business.lvl}</TableCell>
      <TableCell align="right">{business.resource.id}</TableCell>
      <TableCell align="right">{business.salary}</TableCell>
      <TableCell align="right">{business.expected_salary}</TableCell>
      <TableCell align="center">
        <Button size={'small'} onClick={onJoinButtonClick} disabled={user.job_business_id || loading}>Join</Button>
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  setUserJob
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessTableItem);