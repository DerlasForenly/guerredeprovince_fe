import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import newspaperSign from '../assets/newspaper.png';
import loadingGif from '../assets/loading.gif';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Newspaper from '../components/Newspaper';
import { loadNewspaper } from '../redux/newspaper/actions';

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
    return <div className="newspaper-and-navigation-container row">
      <div className="newspaper-short-info-container row">
        <img src={loadingGif} className="newspaper-avatar" alt="newspaper-avatar" />
      </div>
      <Actions></Actions>
    </div>;
  } else {
    return <div className="newspaper-and-navigation-container row">
      {newspaperNotFound ? <Free></Free> : newspaper ? <Newspaper></Newspaper> : <div></div>}
      <Actions></Actions>
    </div>;
  }
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
  return <div>
    <Link to="/news/article/create">
      <button>Create an article</button>
    </Link>
    <Link to="/news/subscriptions">
      <button>My subscriptions</button>
    </Link>
  </div>;
}

function Free () {
  return <div className="newspaper-short-info-container row">
    {/*<img src={newspaperSign} className="newspaper-icon" />*/}
    {/*<div className="help-text col">*/}
    {/*  <label>You do not have any position at any newspaper.</label>*/}
    {/*  <button>Create a newspaper</button>*/}
    {/*</div>*/}
    <img src={newspaperSign} className="newspaper-icon" alt="newspaper-icon" />
    <Link to="/newspaper/create">
      <button>Create a newspaper</button>
    </Link>
  </div>;
}
