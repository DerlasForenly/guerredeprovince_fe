import { connect } from 'react-redux';

const ErrorMessage = (props) => {
  return <label className="error-message">{props.message}</label>;
};

export default connect(null, null)(ErrorMessage);
