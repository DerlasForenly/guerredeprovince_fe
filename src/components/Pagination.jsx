import { connect } from 'react-redux';

function Pagination ({ currentPage = 1, pagesMeta, setPageFunction }) {

  const next = e => {
    if (currentPage === pagesMeta.lastPage) {
      return
    }

    setPageFunction(++currentPage);
  }

  const previous = e => {
    if (currentPage === 1) {
      return;
    }

    setPageFunction(--currentPage)
  }

  return <div className="pagination">
    {currentPage === pagesMeta?.from ? <button>x</button> : <button onClick={previous}>-</button>}
    <label>{currentPage}</label>
    {currentPage === pagesMeta?.lastPage ? <button>x</button> : <button onClick={next}>+</button>}
  </div>;
}
export default connect(null, null)(Pagination);