import InputText from './InputText';

function InputSearch ({ className = '', searchUrl }) {
  return <div className={className}>
    <div className={"input-search-container"}>
      <InputText/>
      <button>Search</button>
    </div>
  </div>
}

export default InputSearch;