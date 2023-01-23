import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import newspaperSign from '../../assets/newspaper.png';
import loadingGif from '../../assets/loading.gif';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Newspaper from './Newspaper';
import { loadNewspaper } from '../../redux/newspaper/actions';

const NewspaperShortInfo = ({ user = false, newspaper, loadNewspaper }) => {
  const [newspaperNotFound, setNewspaperNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (user === false) {
      return;
    }

    if (user.newspaper_id === null) {
      setLoading(false);
      setNewspaperNotFound(true);
      return;
    }

    setLoading(true);

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/api/newspapers/${user.newspaper_id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token')
      }
    }).then((response) => {
      loadNewspaper(response.data);
      setNewspaperNotFound(false);
      setLoading(false);
    }).catch((error) => {
      setNewspaperNotFound(true);
      setLoading(false);
    });

  }, [loadNewspaper, user]);

  if (loading) {
    return <div className="container row">
      <Actions></Actions>
    </div>;
  }

  return <div className="container row">
    {newspaperNotFound ? <Free></Free> : newspaper ? <Newspaper></Newspaper> : <div></div>}
    <Actions></Actions>
  </div>;
};

const mapDispatchToProps = {
  loadNewspaper
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    newspaper: state.newspaper.newspaper,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperShortInfo);

function Actions () {
  return <div className={"row"}>
    <Link to="/news/article/create">
      <button className={"medium-gray-button"}>Create an article</button>
    </Link>
    <Link to="/news/subscriptions">
      <button className={"medium-gray-button"}>My subscriptions</button>
    </Link>
  </div>;
}

function Free () {
  return <div className="newspaper-short-info-container row">
    <img src={newspaperSign} className="newspaper-icon" alt="newspaper-icon" />
    <Link to="/newspaper/create">
      <button className={"medium-gray-button"}>Create a newspaper</button>
    </Link>
  </div>;
}
