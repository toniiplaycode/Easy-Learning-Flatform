import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const ListCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseInstructor = useSelector(
    (state) => state.apiCourse.courseInstructor
  );

  return (
    <div className="student-page-instructor">
      <div className="course-list">
        {courseInstructor && courseInstructor?.length > 0 ? (
          courseInstructor.map((course) => {
            let avgRating = 0;

            // Tính tổng rating bằng reduce
            const totalReviews = course.Reviews.length;

            if (totalReviews > 0) {
              const totalRating = course.Reviews.reduce(
                (acc, review) => acc + review.rating,
                0
              );
              avgRating = (totalRating / totalReviews).toFixed(1);
            } else {
              avgRating = 0;
            }

            return (
              <div className="course-item" key={course.id}>
                <div className="course-info">
                  <img src={course.img} alt="Course Thumbnail" />
                  <div className="course-details">
                    <h3>{course.title}</h3>
                    <span>
                      <FontAwesomeIcon icon={faUsers} /> có{" "}
                      {course.Enrollments.length} học viên
                    </span>
                    <span>
                      <AiFillStar
                        size={18}
                        color="#ffa41b"
                        style={{ display: "inline-block" }}
                      />{" "}
                      {avgRating} ({totalReviews} đánh giá)
                    </span>
                  </div>
                </div>
                <div className="course-action">
                  <button
                    onClick={() => {
                      navigate(
                        `/instructor/manage-student/detail-student?course_id=${course.id}`
                      );
                    }}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="list-empty">
            <h3>Chưa có khóa học nào ! </h3>
            <img src="/imgs/emptybox.png" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCourse;
