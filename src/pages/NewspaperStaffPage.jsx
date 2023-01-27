import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadStaff } from '../redux/newspaper/actions';
import StaffList from '../components/StaffPage/StaffList';

const NewspaperStaffPage = ({ user, loadStaff }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === false || user.newspaper_id === null) {
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/newspapers/${user.newspaper_id}/staff`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      loadStaff(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);

    });
  }, [loadStaff, user])

  return <div className="page row">
    <StaffList/>
  </div>;
};

const mapDispatchToProps = {
  loadStaff,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    staff: state.newspaper.staff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperStaffPage);
