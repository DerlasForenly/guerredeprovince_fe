import { connect, useDispatch } from 'react-redux';
import { ButtonGroup, TableCell, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadActiveLaws } from '../../redux/country/actions';

function BillsOnAgendaItem ({ law, parliamentarians }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id} = useParams();

  const onAccept = e => {
    const newValue = true;
    setLoading(true);
    onSubmit(newValue);
  };

  const onDecline = e => {
    const newValue = false;
    setLoading(true);
    onSubmit(newValue);
  };

  const onSubmit = (value) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/laws/${law.id}/vote`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: { value },
    }).then((response) => {
      console.log(response.data);
      dispatch(loadActiveLaws(id)).finally(() => {})
    }).catch((error) => {

    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <TableRow
      key={law.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {law.type.name}
      </TableCell>
      <TableCell align="right">
        {law.rating}
      </TableCell>
      <TableCell align="right">
        {law.votes}/{parliamentarians.length}
      </TableCell>
      <TableCell align="right">
        {law.created_at}
      </TableCell>
      <TableCell align="right">
        {law.time_to_end}
      </TableCell>
      <TableCell align="right">
        <ButtonGroup size={'small'} variant={'text'} aria-label="text button group" disabled={loading}>
          <Button fullWidth onClick={onAccept}>
            Accept
          </Button>
          <Button fullWidth onClick={onDecline}>
            Decline
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    parliamentarians: state.country.parliamentarians.data
  };
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BillsOnAgendaItem);