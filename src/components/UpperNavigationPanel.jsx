import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UpperNavigationPanel = (props) => {
  return <div className="upper-navigation-container">
    <Link to="/home">
      <button className="navigation-button vertical-center">Overview</button>
    </Link>
    <Link to="/news">
      <button className="navigation-button vertical-center">News</button>
    </Link>
    <Link to="/world">
      <button className="navigation-button vertical-center">World</button>
    </Link>
    <Link to="/region">
      <button className="navigation-button vertical-center">Region</button>
    </Link>
    <Link to="/market">
      <button className="navigation-button vertical-center">Market</button>
    </Link>
    <Link to="/party">
      <button className="navigation-button vertical-center">Party</button>
    </Link>
    <Link to="/job">
      <button className="navigation-button vertical-center">Job</button>
    </Link>
    <Link to="/wars">
      <button className="navigation-button vertical-center">Wars</button>
    </Link>
  </div>;
};

export default connect(null, null)(UpperNavigationPanel);