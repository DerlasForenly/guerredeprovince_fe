import { connect } from 'react-redux';

import paginationArrowIcon from '../../assets/pagination-arrow.png';

function Pagination ({ pagesMeta, setPageFunction }) {
  const next = e => {
    if (pagesMeta.currentPage === pagesMeta.lastPage) {
      return
    }

    setPageFunction(pagesMeta.currentPage + 1);
  }

  const previous = e => {
    if (pagesMeta.currentPage === 1) {
      return;
    }

    setPageFunction(pagesMeta.currentPage - 1)
  }

  return <div className="pagination">
    <div className="arrow-container">
      <img
        src={paginationArrowIcon}
        alt="pagination-arrow-icon"
        className="left-arrow"
        onClick={previous}
      />
    </div>
    <label>{pagesMeta.currentPage}</label>
    <div className="arrow-container">
      <img
        src={paginationArrowIcon}
        alt="pagination-arrow-icon"
        className="right-arrow"
        onClick={next}
      />
    </div>
  </div>;
}
export default connect(null, null)(Pagination);