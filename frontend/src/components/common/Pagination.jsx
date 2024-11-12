import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pages.push(
          <div
            key={i}
            className={`page-number ${i === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </div>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <div key={i} className="dots">
            ...
          </div>
        );
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div
        className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </div>

      {renderPageNumbers()}

      <div
        className={`arrow ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default Pagination;
