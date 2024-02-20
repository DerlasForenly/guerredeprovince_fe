import { connect, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Title from '../components/baseComponents/Title';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useRef, useState } from 'react';
import { LinearProgress, Stack } from '@mui/material';
import { loadLawTypes } from '../redux/country/actions';

import ChangeCountryEmblem from '../components/ParliamentPage/ChangeCountryEmblem';
import ChangeCountryName from '../components/ParliamentPage/ChangeCountryName';
import StartPresidentElection from '../components/ParliamentPage/StartPresidentElection';

const CreateLawPage = ({ user, lawTypes, loading }) => {
  const lawTypeIdInput = useRef();
  const dispatch = useDispatch();
  const [slot, setSlot] = useState(<ChangeCountryName lawTypeId={1} />);

  useEffect(() => {
    if (user) {
      dispatch(loadLawTypes()).finally(() => {});
    }
  }, [dispatch, user]);

  const onChangeHandler = e => {
    const switcher = {
      1: <ChangeCountryName lawTypeId={e.target.value} />,
      2: <ChangeCountryEmblem lawTypeId={e.target.value} />,
      3: <StartPresidentElection lawTypeId={e.target.value} />,
    }[e.target.value];

    setSlot(switcher ?? switcher);
  };

  if (loading) {
    return <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <LinearProgress />
      </Paper>
    </Container>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Title>New law project</Title>
          <TextField
            variant={'standard'}
            sx={{ width: '100%' }}
            name={'lawTypeId'}
            inputRef={lawTypeIdInput}
            required
            select
            label="Law type"
            defaultValue={1}
            disabled={loading}
            onChange={onChangeHandler}
          >
            {
              lawTypes.map((type, index) => {
                return <MenuItem key={index} value={parseInt(type.id)}>{type.name}</MenuItem>;
              })
            }
          </TextField>
        </Paper>
        {slot}
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    country: state.country.country.data,
    lawTypes: state.country.lawTypes.data,
    loading: state.country.lawTypes.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLawPage);