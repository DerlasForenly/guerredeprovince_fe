import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { clearUser, me } from '../../redux/auth/actions';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MyOffersTable ({ user, tradeOffers }) {
  const [myTradeOffers, setMyTradeOffers] = useState([]);

  useEffect(() => {
    setMyTradeOffers(tradeOffers.filter(offer => offer.user.id === user.id))
  }, [tradeOffers, user.id]);

  if (myTradeOffers.length === 0) {
    return <Typography variant={'body2'} component={'h2'}>
      You do not have any active buy/sell offer
    </Typography>
  }

  return (
    <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Resource</TableCell>
          <TableCell align="right">Type</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Total</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          myTradeOffers.map((offer, index) => (
            <TableRow
              key={offer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{offer.resource.name}</TableCell>
              <TableCell align="right">{offer.is_buying ? 'Buying' : 'Selling'}</TableCell>
              <TableCell align="right">{offer.quantity}</TableCell>
              <TableCell align="right">{offer.price}</TableCell>
              <TableCell align="right">{offer.price * offer.quantity}</TableCell>
              <TableCell align="right">
                <Button>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOffersTable);