import { connect } from "react-redux";

import languageImg from "../assets/flag-of-ukraine.jpg"

function Chat(props) {
  return <div className="chat-container">
		<div className="language-info row">
			<label>Ukrainian</label>
			<img src={languageImg} alt="flag"></img>
		</div>
		<div className="messages-container">
			<Message></Message>
			<Message></Message>
			<Message></Message>
			<Message></Message>
		</div>
	</div>
}

export default connect(null, null)(Chat)

function Message(props) {
	return <div></div>
}