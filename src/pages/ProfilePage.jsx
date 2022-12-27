import { connect } from 'react-redux';
import BaseUserPage from './BaseUserPage';

const ProfilePage = ({ user }) => {
  return user ? <BaseUserPage user={user}/> : <div></div>;
};

const mapDispatchToProps = {

};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);