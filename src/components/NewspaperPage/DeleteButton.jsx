import { connect } from 'react-redux';

function DeleteButton ({ user, newspaper }) {
  const onClick = e => {

  }

  return <button onClick={onClick}>Delete</button>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, null)(DeleteButton);