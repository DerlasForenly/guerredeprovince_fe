import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SignUp = (props) => {
	return <form className="auth-form">
		<label>You can't create an account now, so go <Link to="/sign-in">back</Link></label>
	</form>
}

export default connect(null, null)(SignUp)