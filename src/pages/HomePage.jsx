import { connect } from 'react-redux';

import country1Img from '../assets/country1.jpg';
import country2Img from '../assets/country2.jpg';
import avatarImg from '../assets/default_avatar.jpg';
import flagImg from '../assets/flag-of-ukraine.jpg';

const HomePage = () => {
  return <div className="home-page">

  </div>;
};

export default connect(null, null)(HomePage);

// eslint-disable-next-line no-unused-vars
function TopWar (props) {
  return <div className="top-war-container">
    <div className="countries-container row">
      <img src={country1Img} alt="cont1"></img>
      <div className="col">
        <label className="header">Top War</label>
        <label>VS</label>
      </div>
      <img src={country2Img} alt="cont2"></img>
    </div>
    <button className="show-details">Show details</button>
  </div>;
}

// eslint-disable-next-line no-unused-vars
function TopArticle (props) {
  return <div className="top-article-container row">
    <div className="info-container col">
      <div className="container-title row">
        <label className="header">Top Article in</label>
        <img src={flagImg} alt="flag"></img>
      </div>
      <label className="article-name">Як приборкати клоуна за 400 американських гривень</label>
      <label className="nickname">[WMI] Derlas Forenly</label>
    </div>
    <img src={avatarImg} alt="avatar" className="top-article-img"></img>
  </div>;
}

// eslint-disable-next-line no-unused-vars
function Details (props) {
  return <div className="details-container">
  </div>;
}