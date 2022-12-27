import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function EditButton ({ user, newspaper }) {
  return <Link to={`/newspaper/${newspaper.id}/edit`}>
    <button>Edit</button>
  </Link>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, null)(EditButton);