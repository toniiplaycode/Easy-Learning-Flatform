import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CoursePage = () => {
  const [expandedSection, setExpandedSection] = useState(null); // Keep track of which section is expanded

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="course-page min-vh-100">
      <div className="course-page__left">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/SqcY0GlETPk" // Replace with your video ID
          title="Video Title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="course-page__content">
          <h3>Cài đặt Windows Terminal</h3>
          <p>Cập nhật tháng 11 năm 2022</p>
          <p>
            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thẩm thính" xem
            F8 sắp có gì mới nhé!
          </p>
        </div>
      </div>
      <div className="course-page__right">
        <h3>Nội dung khóa học</h3>
        <ul className="course-sections">
          <li className="section" onClick={() => toggleSection(1)}>
            <div className="section-title">
              <span>Giới thiệu</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>1 video | 2:24</span>
            </div>
          </li>
          <li
            className={`section ${expandedSection === 2 ? "expanded" : ""}`}
            onClick={() => toggleSection(2)}
          >
            <div className="section-title">
              <span>Windows Terminal & WSL</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
            {expandedSection === 2 && (
              <ul className="lectures">
                <li className="lecture active">
                  Cài đặt Windows Terminal <p>10:32</p>
                </li>
                <li className="lecture">
                  Ổn tập cài đặt Windows Terminal <p>10:32</p>
                </li>
                <li className="lecture">
                  Cài đặt Ubuntu với WSL 1 <p>10:32</p>
                </li>
              </ul>
            )}
          </li>
          <li
            className={`section ${expandedSection === 3 ? "expanded" : ""}`}
            onClick={() => toggleSection(3)}
          >
            <div className="section-title">
              <span>Các lệnh lunix cơ bản</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
            {expandedSection === 3 && (
              <ul className="lectures">
                <li className="lecture">
                  Giới thiệu lệnh cơ bản <p>10:32</p>
                </li>
                <li className="lecture">
                  Các lệnh hệ thống <p>10:32</p>
                </li>
              </ul>
            )}
          </li>
          <li className="section" onClick={() => toggleSection(4)}>
            <div className="section-title">
              <span>Deploy dự án</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
          </li>
          <li className="section" onClick={() => toggleSection(5)}>
            <div className="section-title">
              <span>Hoàn thành khóa học</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
          </li>
          <li className="section" onClick={() => toggleSection(5)}>
            <div className="section-title">
              <span>Hoàn thành khóa học</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
          </li>
          <li className="section" onClick={() => toggleSection(5)}>
            <div className="section-title">
              <span>Hoàn thành khóa học</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
          </li>
          <li className="section" onClick={() => toggleSection(5)}>
            <div className="section-title">
              <span>Hoàn thành khóa học</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className="section-title">
              <span>3 video | 39:24</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CoursePage;
