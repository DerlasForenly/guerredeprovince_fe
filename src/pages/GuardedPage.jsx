import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import { me, clearUser } from '../redux/auth/actions';

function GuardedPage ({ me, element, clearUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/auth/me`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      me(response.data);
    }).catch((error) => {
      clearUser();
      navigate('/sign-in');
    });
  }, [me, navigate, clearUser]);

  return <div>{element}</div>;
}

const mapDispatchToProps = {
  me,
  clearUser,
};

const mapStateToProps = state => {
  return {
    loading: state.app.loading,
    stability: state.app.stability,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuardedPage);
