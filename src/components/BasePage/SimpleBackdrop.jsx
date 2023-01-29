import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { setLoading } from '../../redux/app/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function SimpleBackdrop({ loading, setLoading}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapDispatchToProps = {
  setLoading,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.app.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleBackdrop);