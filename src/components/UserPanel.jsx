import { connect } from "react-redux";
import { Link } from "react-router-dom";

import avatarImg from "../assets/default_avatar.jpg"
import SignOut from "./SignOut";

const UserPanel = (props) => {
	return <div className="user-panel-container row">
		<div className="push-notifications-container">99+</div>
		<Link to="/profile"><img src={avatarImg} alt="avatar" className="user-panel-avatar"></img></Link>

		<div className="user-panel-balance col">
			<label>124 531 543 310 UAH</label>
			<label>135 234 D</label>
		</div>
		<SignOut></SignOut>
  </div>
}

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
