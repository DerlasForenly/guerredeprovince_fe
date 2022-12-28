import { connect } from 'react-redux';

import NavigationButtons from './NavigationButtons';
import UserPanel from './UserPanel';

function Headers ({ user }) {
  return <div className="navigation">
    <Logo/>
    <NavigationButtons/>
    <UserPanel/>
  </div>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Headers);

function Logo () {
  return <div></div>
}