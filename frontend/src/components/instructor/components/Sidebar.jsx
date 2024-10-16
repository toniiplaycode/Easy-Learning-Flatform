import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUsers,
  faCertificate,
  faTicketSimple,
  faChartSimple,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const getUrl = location.pathname;

  return (
    <div
      className={`sidebar-instructor-container ${isSidebarOpen ? "open" : ""}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="sidebar">
        <div className="logo">
          <img src="/imgs/favicon.png" alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li
            className={`${
              (getUrl === "/instructor" ||
                getUrl === "/instructor/create-course" ||
                getUrl === "/instructor/manage-course" ||
                getUrl === "/instructor/manage-course/section-course" ||
                getUrl === "/instructor/manage-course/lecture-course") &&
              "active"
            } `}
            onClick={() => {
              navigate("/instructor");
            }}
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span>Khóa học</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUsers} />
            <span>Học viên</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faComments} />
            <span>Đánh giá</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faTicketSimple} />
            <span>Mã giảm giá</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faCertificate} />
            <span>Chứng chỉ</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartSimple} />
            <span>Doanh thu</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
