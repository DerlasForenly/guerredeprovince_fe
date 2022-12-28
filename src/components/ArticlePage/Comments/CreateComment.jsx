import { connect } from 'react-redux';
import { useState } from 'react';
import InputTextarea from '../../../components/baseComponents/InputTextarea';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loadComments } from '../../../redux/comments/actions';

function CreateComment ({ article, loadComments }) {
  const [state, setState] = useState({
    content: '',
  })

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = event => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      },
      data: state,
    }).then((response) => {
      setState({
        content: '',
      });
      event.target.reset();

      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API}/api/articles/${article.id}/comments`,
        headers: {
          Authorization: `Bearer` + Cookies.get('access_token')
        }
      }).then((response) => {
        loadComments(response.data);
      }).catch((error) => {
        console.error(error);
      });

    }).catch((error) => {
      console.error(error);
    });
  }

  return <form className="create-comment-form" onSubmit={onSubmit}>
    <InputTextarea
      name={"content"}
      max={300}
      changeInputHandler={changeInputHandler}
      className={"content-input"}
    />
    <button type="submit">Send</button>
  </form>
}

const mapDispatchToProps = {
  loadComments,
};

const mapStateToProps = state => {
  return {
    article: state.article.article
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);