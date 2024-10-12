import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courses = useSelector((state) => state.apiCourse.courses);
  const searchValue = useSelector((state) => state.search.searchValue);
  const categories = useSelector((state) => state.apiCategory.categories);

  const [searchResults, setSearchResults] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define how many results per page
  const totalPages = Math.ceil(searchResults.length / itemsPerPage); // Calculate total pages based on search results

  // Function to get query parameter from the URL
  const getCategoryFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category_id");
  };

  // Filter the courses based on the search term and category_id from the URL
  useEffect(() => {
    const category_id = getCategoryFromUrl();

    categories?.forEach((item) => {
      if (item.id == getCategoryFromUrl()) {
        setCategoryName(item.name);
      }
    });

    const filteredResults = courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesCategory = category_id
        ? course.category_id == category_id
        : true;
      return matchesSearch && matchesCategory;
    });

    setSearchResults(filteredResults);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchValue, courses, location.search]);

  // Handle changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice the search results based on the current page
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="search-page min-vh-100">
      <div className="search-page-header">
        <div>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Sắp xếp theo
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Xếp hạng cao nhất</Dropdown.Item>
              <Dropdown.Item href="#">Phổ biến nhất</Dropdown.Item>
              <Dropdown.Item href="#">Mới nhất</Dropdown.Item>
              <Dropdown.Item href="#">Giá thấp nhất</Dropdown.Item>
              <Dropdown.Item href="#">Giá cao nhất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {getCategoryFromUrl() && <div>Thể loại: {categoryName}</div>}
      </div>

      <div className="search-results">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result) => (
            <div
              className="search-result-item"
              key={result.id}
              onClick={() => {
                navigate(`/course-home?id=${result.id}`);
              }}
            >
              <div className="result-left">
                <img
                  src={result.img}
                  alt={result.title}
                  className="result-image"
                />
                <p className="result-price">
                  {result.price > 0
                    ? `₫ ${result.price.toLocaleString()}`
                    : "Miễn phí"}
                </p>
              </div>
              <div className="result-info">
                <h3>{result.title}</h3>
                <p>{result.description}</p>
                <p className="result-author">{result.User.name}</p>
                <div className="result-rating">
                  <span>{4.8}</span>
                  <span className="stars">★</span>
                  <span className="reviews">(154)</span>
                </div>
                <p>4 chương - 12 bài học - 03 giờ 26 phút</p>
              </div>
            </div>
          ))
        ) : (
          <h3>Không tìm thấy khóa học bạn tìm !</h3>
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
