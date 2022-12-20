import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ErrorMessage from '../components/ErrorMessage';

import loadingGif from '../assets/ok.gif';
import { Link } from 'react-router-dom';

const CreateArticlePage = (props) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    newspaperId: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = event => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage('');

    const data = {
      title: state.title,
      content: state.content,
    };

    if (parseInt(state.newspaperId) !== 0) {
      data.newspaper_id = parseInt(state.newspaperId);
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/articles/`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: data,
    }).then((response) => {
      setLoading(false);
      setSuccess(true);
      setState({
        title: '',
        content: '',
        newspaperId: 0,
      });
      event.target.reset();
    }).catch((error) => {
      setErrorMessage(error.message);
      setLoading(false);
    });
  };

  return <div className="create-article-page row">
    <form onSubmit={submitHandler} className="create-article-container col">
      <BackAndHelp></BackAndHelp>
      <TextInput changeInputHandler={changeInputHandler} max={80}></TextInput>
      <TextareaContent changeInputHandler={changeInputHandler} max={4000}></TextareaContent>
      <div className="settings row">
        <div className="col">
          <Author></Author>
          <Language></Language>
        </div>
        <State></State>
        <button type="submit" disabled={loading}>Create</button>
      </div>
    </form>
  </div>
};

export default connect(null, null)(CreateArticlePage);

function Loading ({ active }) {
  return active ? <div className="loading">
    <label>Wait...</label>
    <img src={loadingGif} alt="loading-gif"></img>
  </div> : <div></div>
}

function TextareaContent ({ changeInputHandler, max }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e)
  }

  return <div className="textarea-content col">
    <label className="input-label">Content</label>
    <div className="textarea-input col">
      <textarea
        required
        name="content"
        onChange={onChange}
      >
      </textarea>
      <label className="size-indicator">{currentLength}/{max}</label>
    </div>
  </div>
}

function BackAndHelp () {
  return <div className="back-more row">
    <Link to="/news">
      <button className="back-button">Back</button>
    </Link>
    <Link to="/news">
      <button className="back-button">Help</button>
    </Link>
  </div>
}

function TextInput ({ changeInputHandler, max }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e)
  }

  return <div className="text-input col">
    <label className="input-label">Title</label>
    <div className="input-indicator row">
      <input
        required
        type="text"
        name="title"
        onChange={onChange}
        max={max}
      >
      </input>
      <label className="size-indicator">{currentLength}/{max}</label>
    </div>
  </div>
}

function Author () {
  return <div className="author col">
    <label className="select-label">On behalf of the</label>
    <select
      name="newspaperId"
      defaultValue={0}
    >
      <option value={0}>Me</option>
      <option value={1}>Газета доброї волі на кожен день</option>
    </select>
  </div>
}

function Language () {
  return <div className="language col">
    <label className="select-label">Language</label>
    <select
      name="languageId"
      defaultValue={0}
    >
      <option value={0}>Ukrainian</option>
      <option value={1}>English</option>
      <option value={1}>Japanese</option>
    </select>
  </div>
}

function State () {
  return <div>
    {/*{errorMessage ? <ErrorMessage message={errorMessage}></ErrorMessage> : <div></div>}*/}
    {/*{success ? <ErrorMessage message="good job, man"></ErrorMessage> : <div></div>}*/}
    {/*<Loading active={loading}></Loading>*/}
  </div>
}