import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import okGif from '../../assets/ok2.gif';

const SignUp = (props) => {
  const [state, setState] = useState({
    nickname: '',
    password: '',
    password_confirmation: '',
    email: '',
    errorMessage: '',
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

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
      setSuccess(true);
      setLoading(false);
    }).catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.error);
      setLoading(false);
    });
  };

  return <form onSubmit={submitHandler} className="auth-form">
    {success ?
      <div className="col">
        <img src={okGif} alt="ok-gif" />
        <label>User has been created.</label>
        <label>Go to <Link to="/sign-in">sign in</Link> page and use this credentials.</label>
      </div> :
      <div className="input-section">
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
        <label>{error}</label>
        <button type="submit" disabled={loading}>Sign Up</button>
        <label>Or use an account <Link to="/sign-in">here</Link></label>
      </div>
    }
  </form>;
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);