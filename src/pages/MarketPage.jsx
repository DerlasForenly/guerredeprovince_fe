import { connect, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Title from '../components/baseComponents/Title';
import { LinearProgress, Stack, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import * as React from 'react';
import OffersTable from '../components/MarketPage/OffersTable';
import { loadTradeOffers, loadUserStorage } from '../redux/storage/actions';
import MyOffersTable from '../components/MarketPage/MyOffersTable';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const MarketPage = ({ user, storage, storageLoading, tradeOffersLoading, tradeOffers }) => {
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const [bank, setBank] = useState(0);

  useEffect(() => {
    if (tradeOffers.length) {
      let total = 0;

      tradeOffers.forEach((offer, index) => {
        if (offer.user.id === user.id) {
          total += offer.price * offer.quantity
        }
      })

      setBank(total);
    }
  }, [tradeOffers, user.id]);

  useEffect(() => {
    if (user) {
      dispatch(loadUserStorage(user.id)).finally(() => {});
      dispatch(loadTradeOffers()).finally(() => {});
    }
  }, [dispatch, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (storageLoading || tradeOffersLoading) {
    return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}></Container>
  }

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Stack spacing={2}>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Title>Market</Title>
          <Button size={'small'} variant={'outlined'}>
            <Link to={'/market/create-offer'}>
              Create new offer
            </Link>
          </Button>
        </Stack>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={'World'} value={'1'} />
                <Tab label={'My'} value={'2'} />
              </TabList>
              <Typography component={'h2'} variant={'body1'}>Your offers for: {bank} money</Typography>
            </Stack>
          </Box>
          <TabPanel value={'1'} sx={{ p: 1 }}>
            <OffersTable />
          </TabPanel>
          <TabPanel value={'2'} sx={{ p: 1 }}>
            <MyOffersTable />
          </TabPanel>
        </TabContext>
      </Paper>
      <Paper sx={{ p: 2, height: 'fit-content', width: '100%' }}>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <Title>Storage</Title>
          <Button size={'small'} variant={'outlined'}>
              Increase
          </Button>
        </Stack>
        <Grid container>
          {
            storage.map((element, index) => {
              let percentageLabel = parseFloat((element.quantity / element.size * 100).toFixed(2));
              if (percentageLabel === 0 && element.quantity > 0) {
                percentageLabel = '<1';
              }

              return <Stack key={index} width={'210px'} sx={{ m: 2 }}>
                <Typography component={'h2'} variant={'body1'}>{element?.name}:</Typography>
                <LinearProgress variant="determinate" value={67} sx={{ height: '15px' }}/>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography component={'h2'} variant={'body2'}>{element?.quantity}</Typography>
                  <Typography component={'h2'} variant={'body2'}>{percentageLabel}%</Typography>
                  <Typography component={'h2'} variant={'body2'}>Max: {element.size}</Typography>
                </Stack>
              </Stack>
            })
          }
        </Grid>
      </Paper>
    </Stack>
  </Container>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  storage: state.storage.storage.data,
  storageLoading: state.storage.storage.loading,
  tradeOffers: state.storage.tradeOffers.data,
  tradeOffersLoading: state.storage.tradeOffers.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);