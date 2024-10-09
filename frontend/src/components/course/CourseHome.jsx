import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

const CourseHome = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="course-home min-vh-100">
      <div className="course-header">
        <div className="course-title">
          <h1>Kiến Thức Nhập Môn IT</h1>
          <p>
            Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem
            các videos tại khoá này trước nhé.
          </p>
          <ul>
            <li>
              <TiTickOutline
                size={22}
                style={{ display: "inline-block", color: "#5022c3" }}
              />
              Các kiến thức cơ bản, nền móng của ngành IT
            </li>
            <li>
              <TiTickOutline
                size={22}
                style={{ display: "inline-block", color: "#5022c3" }}
              />
              Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng
            </li>
            <li>
              <TiTickOutline
                size={22}
                style={{ display: "inline-block", color: "#5022c3" }}
              />
              Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng
            </li>
            <li>
              <TiTickOutline
                size={22}
                style={{ display: "inline-block", color: "#5022c3" }}
              />
              Hiểu hơn về cách internet và máy vi tính hoạt động
            </li>
          </ul>
        </div>

        <div className="course-video">
          <div className="video-thumbnail" style={{ position: "relative" }}>
            <img src="imgs/bannerProfile.png" alt="Course Introduction" />
            <div className="video-thumbnail-opacity">
              <FontAwesomeIcon
                className="icon-play"
                icon={faCirclePlay}
                size="5x"
              />
            </div>
          </div>
          <div className="course-info">
            <h3>Miễn phí</h3>
            <div className="course-info-btn">
              <div>
                <button className="enroll-button not-bg">
                  Thêm vào giỏ hàng
                </button>
                <button className="enroll-button not-bg">
                  <IoMdHeartEmpty size={22} style={{ display: "inline" }} />
                </button>
              </div>
              <button className="enroll-button">Đăng Ký Học</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add the new course rating section here */}
      <div className="course-details">
        <div className="course-rating-container">
          <p className="highlight-label">Bán chạy nhất</p>
          <div className="course-rating">
            <p>
              4.6{" "}
              <AiFillStar
                size={18}
                color="#ffa41b"
                style={{ display: "inline-block" }}
              />
            </p>
            <p>1.528 học viên</p>
          </div>
          <p>(303 xếp hạng)</p>
        </div>
        <p>
          Được tạo bởi <a href="#">Nguyen Duc Hoang</a>
        </p>
        <p>
          <span>Lần cập nhật gần đây nhất 2/2024 </span>
          <span>
            <FontAwesomeIcon icon={faEarthAmericas} /> Vietnamese
          </span>
        </p>
      </div>

      {/* Section: Nội dung khóa học */}
      <div className="course-content">
        <h1>Nội dung khóa học</h1>
        <p>4 chương - 12 bài học - Thời lượng 03 giờ 26 phút</p>

        {/* Section 1 */}
        <div className="section" onClick={() => toggleSection("section1")}>
          <h3>
            1. Khái niệm kỹ thuật cần biết{" "}
            <span>{expandedSections["section1"] ? "-" : "+"}</span>
          </h3>
          {expandedSections["section1"] && (
            <ul>
              <li>
                <FontAwesomeIcon icon={faCirclePlay} /> Mô hình Client - Server
                là gì?
              </li>
              <li>
                <FontAwesomeIcon icon={faCirclePlay} /> Domain là gì? Tên miền
                là gì?
              </li>
              <li>
                <FontAwesomeIcon icon={faCirclePlay} /> Mua áo F8 | Đăng ký học
                Offline
              </li>
            </ul>
          )}
        </div>

        {/* Section 2 */}
        <div className="section" onClick={() => toggleSection("section2")}>
          <h3>
            2. Môi trường, con người IT{" "}
            <span>{expandedSections["section2"] ? "-" : "+"}</span>
          </h3>
          {expandedSections["section2"] && (
            <ul>
              <li>Bài học 1</li>
              <li>Bài học 2</li>
              <li>Bài học 3</li>
            </ul>
          )}
        </div>

        {/* Section 3 */}
        <div className="section" onClick={() => toggleSection("section3")}>
          <h3>
            3. Phương pháp, định hướng{" "}
            <span>{expandedSections["section3"] ? "-" : "+"}</span>
          </h3>
          {expandedSections["section3"] && (
            <ul>
              <li>Bài học 1</li>
              <li>Bài học 2</li>
              <li>Bài học 3</li>
            </ul>
          )}
        </div>

        {/* Section 4 */}
        <div className="section" onClick={() => toggleSection("section4")}>
          <h3>
            4. Hoàn thành khóa học{" "}
            <span>{expandedSections["section4"] ? "-" : "+"}</span>
          </h3>
          {expandedSections["section4"] && (
            <ul>
              <li>Bài học 1</li>
              <li>Bài học 2</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
