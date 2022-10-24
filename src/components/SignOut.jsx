import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { hideErrorMessage, hideLoader, showErrorMessage, showLoader, clearUser } from '../redux/actions';

function SignOut (props) {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    props.hideErrorMessage();
    props.showLoader();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/logout`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response.data);
      Cookies.remove('access_token');
      props.hideLoader();
      props.clearUser();
      navigate('/sign-in');
    }).catch((error) => {
      props.showErrorMessage(error.message);
    });
  };

  return <form onSubmit={submitHandler}>
    <button type="submit" className="navigation-button">Sign Out</button>
  </form>;
}

const mapDispatchToProps = {
  hideErrorMessage,
  showErrorMessage,
  hideLoader,
  showLoader,
  clearUser,
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);