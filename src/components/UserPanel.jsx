import { connect } from "react-redux";
import { Link } from "react-router-dom";

import avatarImg from "../assets/default_avatar.jpg"

const UserPanel = (props) => {
	return <div className="user-panel-container">
		<Link to="/profile"><img src={avatarImg} alt="avatar" className="user-panel-avatar vertical-center"></img></Link>
  </div>
}

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
