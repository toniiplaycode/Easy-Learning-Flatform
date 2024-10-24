import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courses = useSelector((state) => state.apiCourse.courses);
  const searchValue = useSelector((state) => state.search.searchValue);
  const categories = useSelector((state) => state.apiCategory.categories);

  const [searchResults, setSearchResults] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); // State for sorting option
  const itemsPerPage = 5; // Define how many results per page
  const totalPages = Math.ceil(searchResults.length / itemsPerPage); // Calculate total pages based on search results

  // Function to get query parameter from the URL
  const getCategoryFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category_id");
  };

  // Calculate the average rating for a course
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Fixed to 1 decimal
  };

  // Calculate the total lecture duration if it's available
  const calculateTotalDuration = (lectures) => {
    if (!lectures || lectures.length === 0) return null;
    const totalDuration = lectures.reduce(
      (sum, lecture) => sum + lecture.duration,
      0
    );
    return totalDuration; // Assuming duration is in minutes
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

    // Sort the results based on the selected sorting option
    let sortedResults = [...filteredResults];
    if (sortOption === "Xếp hạng cao nhất") {
      sortedResults.sort((a, b) => b.averageRating - a.averageRating); // Assuming you have an averageRating field
    } else if (sortOption === "Phổ biến nhất") {
      sortedResults.sort((a, b) => b.popularity - a.popularity); // Assuming you have a popularity field
    } else if (sortOption === "Mới nhất") {
      sortedResults.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "Giá thấp nhất") {
      sortedResults.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Giá cao nhất") {
      sortedResults.sort((a, b) => b.price - a.price);
    }

    setSearchResults(sortedResults);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchValue, courses, location.search, sortOption]); // Add sortOption as a dependency

  // Handle changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sorting option change
  const handleSortChange = (option) => {
    setSortOption(option);
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
              {sortOption ? sortOption : "Sắp xếp theo"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleSortChange("Xếp hạng cao nhất")}
              >
                Xếp hạng cao nhất
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Phổ biến nhất")}>
                Phổ biến nhất
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Mới nhất")}>
                Mới nhất
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Giá thấp nhất")}>
                Giá thấp nhất
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("Giá cao nhất")}>
                Giá cao nhất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {getCategoryFromUrl() && <div>Thể loại: {categoryName}</div>}
      </div>

      <div className="search-results">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result) => {
            const averageRating = calculateAverageRating(result.Reviews);
            const totalDuration = calculateTotalDuration(result.Lectures); // Assuming result.Lectures exists

            return (
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
                  <p>
                    {typeof result.description === "string"
                      ? parse(result.description)
                      : result.description || "No description available"}
                  </p>
                  <p className="result-author">{result.User.name}</p>
                  <div className="result-rating">
                    <span>{averageRating ? averageRating : "0"}</span>
                    <span className="stars">★</span>
                    <span className="reviews">
                      ({result.Reviews?.length} đánh giá)
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 style={{ textAlign: "center" }}>
            Không tìm thấy khóa học bạn tìm !
          </h3>
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
