import { useState } from 'react';
import { connect } from 'react-redux';

function TextInput ({ changeInputHandler, max, label = 'label', name='' }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e)
  }

  return <div className="text-input col">
    <label className="input-label">{label}</label>
    <div className="input-indicator row">
      <input
        autoComplete="off"
        required
        type="text"
        name={name}
        onChange={onChange}
        max={max}
      >
      </input>
      <label className="size-indicator">{currentLength}/{max}</label>
    </div>
  </div>
}

export default connect(null, null)(TextInput);
