import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import avatarImg from '../assets/default_avatar.jpg';

const UserPanel = ({ user }) => {
  return <div className="user-panel-container row">
    <div className="push-notifications-container">99+</div>
    <Link to="/profile">
      <img
        src={`${process.env.REACT_APP_API}/${user?.avatar}`}
        alt="avatar"
        className="user-panel-avatar"
      />
    </Link>
    <div className="user-panel-balance col">
      <label>{ user?.gold } G</label>
      <label>{ user?.diamonds } D</label>
    </div>
  </div>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
