import { connect, useDispatch } from 'react-redux';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadTradeOffers, loadUserStorage } from '../../redux/storage/actions';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { clearUser, me } from '../../redux/auth/actions';

function OffersTable ({ user, tradeOffers, me, clearUser }) {
  const quantityInput = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTrade = e => {
    e.preventDefault();
    const { quantity } = e.target;

    setLoading(true);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/trade-offers/${e.target.getAttribute('offerid')}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: {
        quantity: parseInt(quantity.value),
      }
    }).then((response) => {
      dispatch(loadTradeOffers()).finally(() => {});
      dispatch(loadUserStorage(user.id)).finally(() => {});

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/auth/me`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token'),
        }
      }).then((response) => {
        me(response.data);
      }).catch((error) => {
        Cookies.remove('access_token');
        clearUser();
        navigate('/sign-in');
      });

      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell align="right">Resource</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          tradeOffers.map((offer, index) => (
            <TableRow
              key={offer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction={'row'} spacing={1}>
                  <Avatar
                    variant={'square'}
                    src={picturePlaceholder}
                    alt={'party-avatar'}
                  />
                  <Stack>
                    <Link to={`/user/${offer.user.id}`}>
                      {offer.user.nickname}
                    </Link>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="right">{offer.resource.name}</TableCell>
              <TableCell align="right">{offer.quantity}</TableCell>
              <TableCell align="right">{offer.price}</TableCell>
              <TableCell align="right">
                <form onSubmit={onTrade} offerid={offer.id}>
                  <Stack spacing={2} direction={'row'}>
                    <TextField
                      inputRef={quantityInput}
                      type={'number'}
                      size={'small'}
                      required
                      label={'Quantity'}
                      name={'quantity'}
                      placeholder={'Quantity'}
                      min={0}
                      sx={{ width: '100%' }}
                      disabled={loading}
                    />
                    <Button
                      size={'small'}
                      variant={'contained'}
                      type={'submit'}
                      disabled={loading}
                    >
                      {offer.isBuying ? 'Sell' : 'Buy'}
                    </Button>
                  </Stack>
                </form>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    storage: state.storage.storage.data,
    storageLoading: state.storage.storage.loading,
    tradeOffers: state.storage.tradeOffers.data,
    tradeOffersLoading: state.storage.tradeOffers.loading,
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  me,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersTable);