import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";

const CourseHome = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="course-page">
      <div className="course-header">
        <div className="course-title">
          <h1>Kiến Thức Nhập Môn IT</h1>
          <p>
            Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem
            các videos tại khoá này trước nhé.
          </p>
          <ul>
            <li>Các kiến thức cơ bản, nền móng của ngành IT</li>
            <li>Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng</li>
            <li>Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng</li>
            <li>Hiểu hơn về cách internet và máy vi tính hoạt động</li>
          </ul>
        </div>

        <div className="course-video">
          <div className="video-thumbnail">
            <img src="imgs/logo.png" alt="Course Introduction" />
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

      <div className="course-content">
        <h2>Nội dung khóa học</h2>
        <p>4 chương - 12 bài học - Thời lượng 03 giờ 26 phút</p>

        {/* Section 1 */}
        <div className="section" onClick={() => toggleSection("section1")}>
          <h3>
            1. Khái niệm kỹ thuật cần biết{" "}
            <span>{expandedSections["section1"] ? "-" : "+"}</span>
          </h3>
          {expandedSections["section1"] && (
            <ul>
              <li>Mô hình Client - Server là gì?</li>
              <li>Domain là gì? Tên miền là gì?</li>
              <li>Mua áo F8 | Đăng ký học Offline</li>
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
