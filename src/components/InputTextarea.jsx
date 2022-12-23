import { useState } from 'react';
import { connect } from 'react-redux';

function InputTextarea ({ changeInputHandler, max, label = 'label', name = '' }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e)
  }

  return <div className="textarea-content col">
    <label className="input-label">{label}</label>
    <div className="textarea-input col">
      <textarea
        required
        name={name}
        onChange={onChange}
      >
      </textarea>
      <label className="size-indicator">{currentLength}/{max}</label>
    </div>
  </div>
}

export default connect(null, null)(InputTextarea);