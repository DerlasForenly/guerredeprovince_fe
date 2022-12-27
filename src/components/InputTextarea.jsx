import { useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function InputTextarea ({ changeInputHandler, max, label = null, name = null }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e)
  }

  return <div className="textarea-input-container col">
    <div className="input-label">{label}</div>
    <div className="textarea-input col">
      <TextareaAutosize
        required
        name={name}
        onChange={onChange}
      >
      </TextareaAutosize>
      <label className="size-indicator">{currentLength}/{max}</label>
    </div>
  </div>
}

export default connect(null, null)(InputTextarea);