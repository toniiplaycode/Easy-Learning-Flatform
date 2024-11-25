import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBook,
  faUser,
  faTag,
  faCertificate,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../DeleteConfirm";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseInstructor = useSelector(
    (state) => state.apiCourse.courseInstructor
  );

  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Calculate statistics dynamically
  const statisticsData = {
    courses: courseInstructor.length, // Total courses
    students: courseInstructor.reduce(
      (sum, course) => sum + course.Enrollments.length,
      0
    ), // Total students across all courses
    discountCodes: courseInstructor.reduce(
      (sum, course) => sum + (course.Coupons?.length || 0),
      0
    ), // Total discount codes
    certificates: courseInstructor.reduce(
      (sum, course) => sum + course.Enrollments.length, // Assuming each enrollment could result in a certificate
      0
    ), // Total certificates issued
    ratings: courseInstructor.reduce(
      (sum, course) => sum + (course.Reviews?.length || 0),
      0
    ), // Total reviews
  };

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter courses based on search term
  const filteredCourses = courseInstructor.filter((course) =>
    course.title.toLowerCase().includes(searchTerm)
  );

  // Count statistics for a course
  const getCourseStatistics = (course) => {
    const totalSections = course.Sections?.length || 0;
    const totalLectures = course.Sections
      ? course.Sections.reduce(
          (sum, section) => sum + (section.Lectures?.length || 0),
          0
        )
      : 0;

    return { totalSections, totalLectures };
  };

  return (
    <div className="course-page-instructor">
      {/* Header Actions */}
      <div className="header-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học"
            className="search-input"
            value={searchTerm} // Bind search term to input
            onChange={handleSearch} // Handle input changes
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

      {/* Summary Statistics */}
      <div className="statistics-summary">
        <div className="stat-item">
          <FontAwesomeIcon icon={faBook} className="stat-icon" />
          <span>Khóa học: {statisticsData.courses}</span>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faUser} className="stat-icon" />
          <span>Học viên: {statisticsData.students}</span>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faStar} className="stat-icon" />
          <span>Lượt đánh giá: {statisticsData.ratings}</span>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faTag} className="stat-icon" />
          <span>Mã giảm giá: {statisticsData.discountCodes}</span>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faCertificate} className="stat-icon" />
          <span>Chứng chỉ cấp: {statisticsData.certificates}</span>
        </div>
      </div>

      {/* Course List */}
      <div className="course-list">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const { totalSections, totalLectures } =
              getCourseStatistics(course);
            return (
              <div className="course-item" key={course.id}>
                <div className="course-info">
                  <img src={course.img} alt="Course Thumbnail" />
                  <div className="course-details">
                    <h3>{course.title}</h3>
                    <span>Số chương: {totalSections}</span>
                    <br />
                    <span>Số bài giảng: {totalLectures}</span>
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
            );
          })
        ) : (
          <div className="course-list-empty">
            <h3>Chưa có khóa học nào!</h3>
            <img src="/imgs/emptybox.png" alt="No courses" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
