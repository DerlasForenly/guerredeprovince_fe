import { connect } from 'react-redux';

import UpperNavigationPanel from './UpperNavigationPanel';
import UserPanel from './UserPanel';
import SignOut from '../components/SignOut';

function Headers ({ user }) {
  if (user) {
    return <div className="navigation row">
      <div className="logo-container"></div>
      <UpperNavigationPanel></UpperNavigationPanel>
      <UserPanel></UserPanel>
      <SignOut></SignOut>
    </div>;
  } else {
    return <div></div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Headers);