import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function ChatInput (props) {
  return <div className="chat-input row">
    <TextareaAutosize></TextareaAutosize>
    <button>Send</button>
  </div>;
}

export default connect(null, null)(ChatInput);