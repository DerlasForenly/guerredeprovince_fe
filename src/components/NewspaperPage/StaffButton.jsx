import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function StaffButton ({ user, newspaper }) {
  return <Link to={`/newspaper/${newspaper.id}/staff`}>
    <button>Staff</button>
  </Link>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, null)(StaffButton);