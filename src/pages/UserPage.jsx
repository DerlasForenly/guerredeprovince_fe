import { connect } from 'react-redux';
import BaseUserPage from './BaseUserPage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadUser } from '../redux/user/actions';

const UserPage = ({ user, loadUser }) => {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/users/${id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      loadUser(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id, loadUser]);

  if (loading) {
    return <div></div>;
  } else {
    return <BaseUserPage user={user} />;
  }
};

const mapDispatchToProps = {
  loadUser,
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);