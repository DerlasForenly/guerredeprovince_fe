import { connect } from 'react-redux';

import FactoryCard from '../components/FactoryCard';
import ShortStorage from '../components/ShortStorage';

const JobPage = (props) => {
  return <div className="job-page">
    <label className="soon">Soon</label>
  </div>

  return <div className="row">
    {props.user.job ? <FactoryCard></FactoryCard> : <div></div>}
    <ShortStorage></ShortStorage>
  </div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(JobPage);

