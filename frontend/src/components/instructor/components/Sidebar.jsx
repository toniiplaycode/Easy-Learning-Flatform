import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faComments,
  faChartBar,
  faTools,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
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
          <img src="imgs/favicon.png" alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li className={`${getUrl === "/instructor" && "active"} `}>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span>Khóa học</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faComments} />
            <span>Giao tiếp</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartBar} />
            <span>Hiệu suất</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faTools} />
            <span>Công cụ</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Tài nguyên</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
