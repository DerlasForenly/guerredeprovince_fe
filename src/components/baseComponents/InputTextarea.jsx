import { useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function InputTextarea ({
                          changeInputHandler,
                          max,
                          label = null,
                          name = null,
                          className = '',
                          fs = 15,
                          mr = 0,
                          ml = 0,
                          mt = 0,
                          mb = 0,
                        }) {
  const [currentLength, setCurrentLength] = useState(0);

  const onChange = e => {
    setCurrentLength(e.target.value.length);
    changeInputHandler(e);
  };

  return <div className={className}>
    <div className={'textarea-input-container'}>
      <div className="input-label">{label}</div>
      <div className="textarea-input">
        <TextareaAutosize
          style={{ fontSize: fs, height: 0 }}
          required
          name={name}
          onChange={onChange}
        >
        </TextareaAutosize>
        <label className="size-indicator">{currentLength}/{max}</label>
      </div>
    </div>
  </div>;
}

export default connect(null, null)(InputTextarea);