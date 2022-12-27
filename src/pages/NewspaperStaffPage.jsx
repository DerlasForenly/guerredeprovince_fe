import { connect } from 'react-redux';

const NewspaperStaffPage = () => {
  return <div className="newspaper-staff-page">
    <div className="newspaper-staff-container">

    </div>
  </div>;
};

const mapDispatchToProps = {

};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperStaffPage);