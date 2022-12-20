import { connect } from 'react-redux';

import okGif from '../assets/ok2.gif';

function Ok({ message }) {
  return <div className="ok-container col">
    <img src={okGif} alt="ok-gif"></img>
    <label>{message}</label>
  </div>
}

export default connect(null, null)(Ok);