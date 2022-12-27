import { connect } from 'react-redux';
import UpdateAvatar from '../components/ProfilePage/UpdateAvatar';

/**
 * @param user {id, avatar, nickname}
 * @param currentUser {id, nickname, avatar}
 * @param previewFile
 *
 * @returns {JSX.Element}
 *
 * @constructor
 */
const BaseUserPage = ({ user, currentUser, previewFile }) => {
  const avatarImg = () => {
    if (previewFile) {
      return URL.createObjectURL(previewFile);
    }

    return `${process.env.REACT_APP_API}/${user.avatar}`;
  }

  return <div className="profile-page">
    <div className="profile-container row">
      <div className="first-col col">
        <img
          src={avatarImg()}
          alt="user-avatar"
          className="user-avatar"
        />
        {
          currentUser.id === user.id ?
            <UpdateAvatar/> :
            <div></div>
        }
      </div>
      <div className="col">
        <label className="nickname">{user?.nickname}</label>
      </div>
    </div>
  </div>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    previewFile: state.user.avatarForm.previewFile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseUserPage);


