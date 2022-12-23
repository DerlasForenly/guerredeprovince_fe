import { connect } from 'react-redux';

const ProfilePage = (props) => {
  return <div className="profile-page">
    <label className="soon">Soon</label>
  </div>;
};

const mapDispatchToProps = {

};

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);