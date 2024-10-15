import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirm";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseInstructor = useSelector(
    (state) => state.apiCourse.courseInstructor
  );

  return (
    <div className="course-page-instructor">
      <div className="header-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học cũ"
            className="search-input"
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="sort-dropdown">
          <button className="sort-button">
            Mới nhất
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <button
          className="new-course-button"
          onClick={() => navigate("create-course")}
        >
          Tạo khóa học mới
        </button>
      </div>

      <div className="course-list">
        {courseInstructor && courseInstructor?.length > 0 ? (
          courseInstructor.map((course) => (
            <div className="course-item">
              <div className="course-info">
                <img src={course.img} alt="Course Thumbnail" />
                <div className="course-details">
                  <h3>{course.title}</h3>
                </div>
              </div>
              <div className="course-action">
                <button
                  onClick={() => {
                    navigate(`/instructor/manage-course`, {
                      state: { course },
                    });
                  }}
                >
                  Quản lý
                </button>
                <DeleteConfirmation course_id={course.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="course-list-empty">
            <h3>Chưa có khóa học nào ! </h3>
            <img src="/imgs/emptybox.png" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
