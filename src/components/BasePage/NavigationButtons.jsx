import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationButtons = (props) => {
  return <div className={"navigation-buttons-container"}>
    <Home/>
    <News/>
    <World/>
    <Region/>
    <Market/>
    <Party/>
    <Job/>
    <Wars/>
  </div>;
};

export default connect(null, null)(NavigationButtons);

function World () {
  return <Link to="/world">
    <button>World</button>
  </Link>
}

function Market () {
  return <Link to="/market">
    <button>Market</button>
  </Link>
}

function Region () {
  return <Link to="/region">
    <button>Region</button>
  </Link>
}

function Home () {
  return <Link to="/home">
    <button>Overview</button>
  </Link>
}

function News () {
  return <Link to="/news">
    <button>News</button>
  </Link>
}

function Job () {
  return <Link to="/job">
    <button>Job</button>
  </Link>
}

function Party () {
  return <Link to="/party">
    <button>Party</button>
  </Link>
}

function Wars () {
  return <Link to="/wars">
    <button>Wars</button>
  </Link>
}