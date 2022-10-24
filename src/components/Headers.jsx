import { connect } from 'react-redux';

import UpperNavigationPanel from './UpperNavigationPanel';
import UserPanel from './UserPanel';

function Headers (props) {
  return props.user ? <div className="navigation row">
    <div className="logo-container"></div>
    <UpperNavigationPanel></UpperNavigationPanel>
    <UserPanel></UserPanel>
  </div> : <div></div>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Headers);