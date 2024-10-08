import { Button, IconButton, Stack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      // Show first, last, current page, and dots for skipped pages
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pages.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            isDisabled={i === currentPage}
            variant={i === currentPage ? "solid" : "outline"}
          >
            {i}
          </Button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<Text key={i}>...</Text>);
      }
    }
    return pages;
  };

  return (
    <Stack direction="row" spacing={2} align="center" justify="center" mt={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        aria-label="Previous"
      />

      {renderPageNumbers()}

      <IconButton
        icon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        aria-label="Next"
      />
    </Stack>
  );
};

export default Pagination;
