import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

import ErrorMessage from './ErrorMessage';
import { hideErrorMessage, hideLoader, showErrorMessage, showLoader, meAsync } from '../redux/actions';

function GetSalaryForm (props) {
  const [state, setState] = useState({
    minutesLeft: 0,
    loading: true,
  });

  useEffect(() => {
    if (props.action) {
      const start = new Date(props.action.created_at);
      const now = new Date();
      let diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
      diff -= props.action.time;

      console.log(diff);

      setState(prev => ({
        ...prev,
        loading: false,
        minutesLeft: diff < 0 ? -diff : 0
      }));
    }
  }, [props]);

  const submitFullTimeHandler = e => {
    e.preventDefault();

    props.hideErrorMessage();
    props.showLoader();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/actions/salary`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      console.log(response);
      props.meAsync();
    }).catch((error) => {
      if (error.response)
        props.showErrorMessage(error.response.data.message);
    });
  };

  const submitPartTimeHandler = e => {
    e.preventDefaul();

  };

  return state.loading ? <div></div> :
    state.minutesLeft === 0 ?
      <form onSubmit={submitFullTimeHandler} className="get-salary-form-container">
        <div className="col">
          <label>You worked for {props.action.time} minutes</label>
          {props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div>}
          <button type="submit">Get salary</button>
        </div>
      </form> :
      <form onSubmit={submitPartTimeHandler} className="get-salary-form-container">
        <div className="col">
          <label className="">{state.minutesLeft} minutes left until the end of the work</label>
          {props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div>}
          <button type="submit" disabled>Pick up early</button>
        </div>
      </form>;
}

const mapStateToProps = (state) => {
  return {
    action: state.auth.user.action,
    errorMessage: state.auth.errorMessage,
  };
};

const mapDispatchToProps = {
  hideErrorMessage,
  showErrorMessage,
  hideLoader,
  showLoader,
  meAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetSalaryForm);