import React from 'react';

const Pagination = ({ currentPage, totalPages, pageSize, paginate }) => {
  const maxPageButtons = 5; // Max number of buttons to show before collapsing

  // Function to generate page numbers with ellipses
  const generatePages = () => {
    let pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) pages.push(1, '...');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages) pages.push('...', totalPages);

    return pages;
  };

  return (
    <> 
    <span>Total Pages: {totalPages}</span>
    <ul className="pagination flex justify-center">
      {/* First Button */}
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => paginate(1)} disabled={currentPage === 1}>
          First
        </button>
      </li>

      {/* Previous Button */}
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
      </li>

      {/* Page Numbers */}
      {generatePages().map((page, index) => (
        <li
          key={index}
          className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
        >
          {page === '...' ? (
            <span className="page-link d-none"></span>
          ) : (
            <button className="page-link" onClick={() => paginate(page)}>
              {page}
            </button>
          )}
        </li>
      ))}

      {/* Next Button */}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </li>

      {/* Last Button */}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button>
      </li>
    </ul>
    </>
  );
};

export default Pagination;
