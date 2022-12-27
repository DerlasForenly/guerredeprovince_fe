import { connect } from 'react-redux';

function Pagination ({ pagesMeta, setPageFunction }) {
  const next = e => {
    if (pagesMeta.currentPage === pagesMeta.lastPage) {
      return
    }

    let newPage = pagesMeta.currentPage + 1;

    setPageFunction(newPage);
  }

  const previous = e => {
    if (pagesMeta.currentPage === 1) {
      return;
    }

    let newPage = pagesMeta.currentPage - 1;

    setPageFunction(newPage)
  }

  return <div className="pagination">
    {pagesMeta.currentPage === pagesMeta.from ? <button>x</button> : <button onClick={previous}>-</button>}
    <label>{pagesMeta.currentPage}</label>
    {pagesMeta.currentPage === pagesMeta.lastPage ? <button>x</button> : <button onClick={next}>+</button>}
  </div>;
}
export default connect(null, null)(Pagination);