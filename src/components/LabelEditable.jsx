import { useState } from 'react';

function LabelEditable ({ content }) {
  const [editing, setEditing] = useState(false);

  return <div className="label-editable__root">
    <label>{content}</label>
  </div>
}

export default LabelEditable;