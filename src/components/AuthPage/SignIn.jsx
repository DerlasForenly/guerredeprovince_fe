import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import {
  signIn,
} from '../../redux/auth/actions';

import {
  hideLoader,
  showLoader
} from '../../redux/app/actions';

const SignIn = (props) => {
  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.showLoader();
    setError('');
    setLoading(true);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/auth/login`,
      data: {
        email: state.email,
        password: state.password,
      }
    }).then((response) => {
      Cookies.set('access_token', response.data.access_token);
      props.signIn(response.data);
      setLoading(false);
      navigate('/home');
    }).catch((error) => {
      setError(error.response.data.error);
      setLoading(false);
    });
  };

  return <form onSubmit={submitHandler} className="auth-form">
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
    <label>{error}</label>
    <button type="submit" disabled={loading}>Sign In</button>
    <label>Or create a new account <Link to="/sign-up">here</Link></label>
  </form>;
};

const mapDispatchToProps = {
  signIn,
  hideLoader,
  showLoader,
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
