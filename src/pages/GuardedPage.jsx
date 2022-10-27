import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import { me, hideLoader, showLoader, clearUser } from '../redux/actions';

import loadingGif from '../assets/loading.gif';

function GuardedPage ({ showLoader, hideLoader, me, loading, element, clearUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    showLoader();
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/auth/me`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);

      me(response.data);
      hideLoader();
    }).catch((error) => {
      hideLoader();
      clearUser();
      navigate('/sign-in');
    });
  }, [me, hideLoader, showLoader, navigate, clearUser]);

  return loading ? <div className="page"><img src={loadingGif} alt="loading-gif"/></div> :
    <div>{element}</div>;
}

const mapDispatchToProps = {
  hideLoader,
  showLoader,
  me,
  clearUser,
};

const mapStateToProps = state => {
  return {
    loading: state.app.loading,
    stability: state.app.stability
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuardedPage);
