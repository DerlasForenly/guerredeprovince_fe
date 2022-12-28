import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadStaff } from '../redux/newspaper/actions';
import StaffList from '../components/StaffPage/StaffList';
import InputSearch from '../components/baseComponents/InputSearch';

const NewspaperStaffPage = ({ user, loadStaff }) => {
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

  return <div className="newspaper-staff-page row">
    <div className="newspaper-staff-container">
      <StaffList/>
    </div>
    <HireStaff/>
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

function HireStaff() {
  return <div className="newspaper-staff-container">
    <div className={"container-header"}>
      <label className={"text-label"}>Hire user</label>
    </div>
    <InputSearch/>
    <HireSearchResult/>
  </div>
}

function HireSearchResult({ searchResult = [1,2,3]}) {
  return <div>
    {searchResult.map((item, index) => {
      return <HireSearchUser user={item} key={index}/>
    })}
  </div>
}

function HireSearchUser() {
  return <div>
    <img
      alt={"avatar"}
    />
    <label>Nickname</label>
  </div>
}
