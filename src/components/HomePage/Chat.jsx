import { connect } from 'react-redux';
import ChatInput from 'src/components/HomePage/ChatInput';

import languageImg from 'src/assets/flag-of-ukraine.jpg';
import defaultAvatar from 'src/assets/default_avatar.jpg';

function Chat (props) {
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
    <ChatInput></ChatInput>
  </div>;
}

export default connect(null, null)(Chat);

function Message (props) {
  return <div className="chat-message-container row">
    <img src={defaultAvatar} alt="avatar"></img>
    <p>Helloworldu</p>
  </div>;
}