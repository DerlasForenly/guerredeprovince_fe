import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import {
  signIn,
  hideErrorMessage,
  showErrorMessage,
} from '../../redux/auth/actions';

import {
  hideLoader,
  showLoader
} from '../../redux/app/actions';

import ErrorMessage from '../../components/ErrorMessage';

const SignIn = (props) => {
  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const navigate = useNavigate();

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
      url: `${process.env.REACT_APP_API}/api/auth/login`,
      data: {
        email: state.email,
        password: state.password,
      }
    }).then((response) => {
      console.log(response.data);
      Cookies.set('access_token', response.data.access_token);
      props.signIn(response.data);
      props.hideLoader();

      navigate('/home');
    }).catch((error) => {
      props.showErrorMessage(error.message);
    });
  };

  return <form onSubmit={submitHandler} className="auth-form col">
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
    {props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div>}
    <button type="submit">Sign In</button>
    <label>Or create a new account <Link to="/sign-up">here</Link></label>
  </form>;
};

const mapDispatchToProps = {
  signIn,
  hideErrorMessage,
  showErrorMessage,
  hideLoader,
  showLoader,
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);