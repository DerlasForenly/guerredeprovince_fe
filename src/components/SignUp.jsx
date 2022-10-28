import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';
import { hideErrorMessage, hideLoader, showErrorMessage, showLoader } from '../redux/actions';

import okGif from '../assets/ok2.gif';

const SignUp = (props) => {
  const [state, setState] = useState({
    nickname: '',
    password: '',
    password_confirmation: '',
    email: '',
    errorMessage: '',
  });

  const [success, setSuccess] = useState(false);

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.hideErrorMessage();
    props.showLoader();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/register`,
      data: {
        nickname: state.nickname,
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation,
      }
    }).then((response) => {
      console.log(response.data);
      props.hideLoader();
      setSuccess(true);
    }).catch((error) => {
      props.showErrorMessage(error.message);
    });
  };

  return <form onSubmit={submitHandler} className="auth-form col">
    {/*<label>You can't create an account now, so go <Link to="/sign-in">back</Link></label>*/}
    {success ?
      <div className="col">
        <img src={okGif} alt="ok-gif"/>
        <label>User has been created.</label>
        <label>Go to <Link to="/sign-in">sign in</Link> page and use this credentials.</label>
      </div> :
      <div className="col">
        <input
          required
          type="nickname"
          placeholder="nickname"
          name="nickname"
          onChange={changeInputHandler}
        ></input>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={changeInputHandler}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={changeInputHandler}
        ></input>
        <input
          required
          type="password"
          placeholder="confirm password"
          name="password_confirmation"
          onChange={changeInputHandler}
        ></input>
        {props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div>}
        <button type="submit">Sign Up</button>
        <label>Or use an account <Link to="/sign-in">here</Link></label>
      </div>
    }
  </form>;
};

const mapDispatchToProps = {
  hideErrorMessage,
  showErrorMessage,
  hideLoader,
  showLoader,
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);