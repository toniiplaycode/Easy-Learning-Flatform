import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarManageCourse = ({ detailCourse }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this to use location in the component

  const [course, setCourse] = useState(detailCourse);

  const handleNavigation = (path) => {
    navigate(path, { state: { course } });
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <div className="sidebar-manage-course">
      <div
        className={`${
          location.pathname === "/instructor/manage-course" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/instructor/manage-course")}
      >
        Khóa học
      </div>
      <div
        className={`${
          location.pathname === "/instructor/manage-course/section-course"
            ? "active"
            : ""
        }`}
        onClick={() =>
          handleNavigation("/instructor/manage-course/section-course")
        }
      >
        Chương
      </div>
      <div
        className={`${
          location.pathname === "/instructor/manage-course/lecture-course"
            ? "active"
            : ""
        }`}
        onClick={() =>
          handleNavigation("/instructor/manage-course/lecture-course")
        }
      >
        Bài giảng
      </div>
    </div>
  );
};

export default SidebarManageCourse;
