import { useState } from 'react';
import { connect } from 'react-redux';

import regionImg from '../assets/default_region_avatar.png';

function OverviewShortRegion (props) {
  const [currentPage, setCurrentPage] = useState(<Region></Region>);

  const pageNames = [
    'Region',
    'Country',
    'World',
  ];

  const pageComponents = [
    <Region></Region>,
    <Country></Country>,
    <World></World>
  ];

  const onLeft = e => {

  };

  const onRight = e => {

  };

  return <div className="overview-short-region-container">
    {currentPage}
    <div className="navigation-container row">
      <label onClick={onRight} className="left-label">{pageNames[2]}</label>
      <div className="navigation-indicators-container row">
        <div className="point"></div>
        <div className="point"></div>
        <div className="point"></div>
      </div>
      <label onClick={onRight} className="right-label">{pageNames[1]}</label>
    </div>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    regionId: state.auth.user.current_region_id
  };
};

export default connect(mapStateToProps, null)(OverviewShortRegion);

function Region () {
  return <div className="row">
    <img src={regionImg} alt="region"></img>
    <div className="title-panel col">
      <label className="region-name">Черкасська область</label>
      <label className="region-country">Holy Ukrainian Reich</label>
    </div>
  </div>;
}

function Country () {
  return <div className="row">
    <img src={regionImg} alt="region"></img>
    <div className="title-panel col">
      <label className="region-name">Черкасська область</label>
      <label className="region-country">Holy Ukrainian Reich</label>
    </div>
  </div>;
}

function World () {
  return <div className="row">
    <img src={regionImg} alt="region"></img>
    <div className="title-panel col">
      <label className="region-name">Черкасська область</label>
      <label className="region-country">Holy Ukrainian Reich</label>
    </div>
  </div>;
}