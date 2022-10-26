import { connect } from 'react-redux';

function Pagination (props) {
  return <div className="pagination">
    <button>-</button>
    <label>1</label>
    <button>+</button>
  </div>;
}

export default connect(null, null)(Pagination);