import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarManageCourse = ({ detailCourse }) => {
  const navigate = useNavigate();

  const [course, setCourse] = useState(detailCourse);

  return (
    <div className="sidebar-manage-course">
      <div
        className={`${
          location.pathname == "/instructor/manage-course" && "active"
        }`}
        onClick={() => {
          navigate("/instructor/manage-course", {
            state: { course },
          });
        }}
      >
        Khóa học
      </div>
      <div
        className={`${
          location.pathname == "/instructor/manage-course/section-course" &&
          "active"
        }`}
        onClick={() =>
          navigate("/instructor/manage-course/section-course", {
            state: { course },
          })
        }
      >
        Chương
      </div>
      <div
        className={`${
          location.pathname == "/instructor/manage-course/lecture-course" &&
          "active"
        }`}
        onClick={() => navigate("/instructor/manage-course/lecture-course")}
      >
        Bài giảng
      </div>
    </div>
  );
};

export default SidebarManageCourse;
