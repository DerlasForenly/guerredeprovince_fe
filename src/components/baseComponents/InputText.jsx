import { useState } from 'react';
import { connect } from 'react-redux';

function TextInput ({
                      changeInputHandler,
                      max = 0,
                      label = null,
                      name = null,
                      className = '',
                    }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e);
  };

  return <div className={className}>
    <div className="text-input-container col">
      {label ? <label className="input-label">{label}</label> : <div />}
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
        {max === 0 ? <div /> : <label className="size-indicator">{currentLength}/{max}</label>}
      </div>
    </div>
  </div>;
}

export default connect(null, null)(TextInput);
