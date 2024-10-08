import React, { useState } from "react";
import Pagination from "./Pagination";
import { Text } from "@chakra-ui/react";
import { Dropdown, ButtonGroup } from "react-bootstrap";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: "Xây Dựng Website với ReactJS",
      description: "Khóa học ReactJS từ cơ bản tới nâng cao...",
      image: "imgs/banner1.png",
    },
    {
      id: 2,
      title: "Node & ExpressJS",
      description: "Học Back-end với Node & ExpressJS framework...",
      image: "imgs/logo.png",
    },
    {
      id: 3,
      title: 'App "Đừng Chạm Tay Lên Mặt"',
      description: "Xây dựng ứng dụng đưa ra cảnh báo...",
      image: "imgs/logo.png",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example total number of pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-page">
      <div className="search-page-header">
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

        <div className="search-header">
          <p>Tìm kiếm: ReactJS</p>
          {/* <p>Thể loại: CNTT</p> */}
        </div>
      </div>

      <div className="search-results">
        {searchResults.map((result) => (
          <div className="search-result-item" key={result.id}>
            <div>
              <img
                src={result.image}
                alt={result.title}
                className="result-image"
              />
              <p className="result-price">199.000</p>
            </div>
            <div className="result-info">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <p className="result-author">Le Thanh Toan</p>
              <div className="result-rating">
                <span>{4.8}</span>
                <span className="stars">★</span>
                <span className="reviews">(154)</span>
              </div>
              <p>4 chương - 12 bài học - 03 giờ 26 phút</p>
            </div>
          </div>
        ))}
      </div>

      <Text fontSize="xl">Displaying results for page {currentPage}</Text>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
