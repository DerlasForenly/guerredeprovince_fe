import { connect } from "react-redux";

const ErrorMessage = (props) => {
	return <label>{props.message}</label>
}

export default connect(null, null)(ErrorMessage)
