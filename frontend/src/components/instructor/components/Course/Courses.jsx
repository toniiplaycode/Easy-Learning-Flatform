import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../DeleteConfirm";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseInstructor = useSelector(
    (state) => state.apiCourse.courseInstructor
  );

  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái lưu từ khóa tìm kiếm

  // Xử lý thay đổi từ ô input tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Lọc khóa học dựa trên từ khóa tìm kiếm
  const filteredCourses = courseInstructor.filter((course) =>
    course.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="course-page-instructor">
      <div className="header-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học"
            className="search-input"
            value={searchTerm} // Gán giá trị tìm kiếm từ state
            onChange={handleSearch} // Bắt sự kiện onChange để xử lý khi người dùng nhập từ khóa
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
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
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="course-item" key={course.id}>
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
                <DeleteConfirm course_id={course.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="course-list-empty">
            <h3>Chưa có khóa học nào !</h3>
            <img src="/imgs/emptybox.png" alt="No courses" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
