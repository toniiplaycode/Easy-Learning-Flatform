import {
  faChalkboardTeacher,
  faStar,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCourseInstructor } from "../../reducers/apiCourse";
import { fetchInforUserOther } from "../../reducers/apiLoginLogout";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const constructor_id = searchParams.get("construtor_id");

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const courseInstructor = useSelector(
    (state) => state.apiCourse.courseInstructor
  );

  const detailUserOther = useSelector(
    (state) => state.apiLoginLogout.detailUserOther
  );

  useEffect(() => {
    dispatch(fetchCourseInstructor(constructor_id));
    dispatch(fetchInforUserOther(constructor_id));
  }, [constructor_id, dispatch]);

  useEffect(() => {
    if (courseInstructor) {
      setTotalCourses(courseInstructor.length);

      const enrollments = courseInstructor.reduce(
        (total, course) => total + (course.Enrollments?.length || 0),
        0
      );
      setTotalEnrollments(enrollments);

      const reviews = courseInstructor.reduce(
        (total, course) => total + (course.Reviews?.length || 0),
        0
      );
      setTotalReviews(reviews);
    }
  }, [courseInstructor]);

  return (
    <div className="view-profile-container">
      <div className="view-profile-infor">
        <div className="left">
          <img
            src={
              detailUserOther?.avatar
                ? detailUserOther?.avatar
                : "/imgs/user.png"
            }
            alt="Profile"
          />
        </div>
        <div className="right">
          <span>{detailUserOther?.name}</span>
          <span>{detailUserOther?.email}</span>
          <div className="statistical">
            <span>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                style={{ color: "orange" }}
              />{" "}
              {totalCourses} khóa học
            </span>
            <span>
              <FontAwesomeIcon icon={faUserGroup} style={{ color: "orange" }} />{" "}
              {totalEnrollments} học viên
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />{" "}
              {totalReviews} đánh giá
            </span>
          </div>
          <span>{detailUserOther?.bio}</span>
        </div>
      </div>
      <h4>Các khóa học đang giảng dạy</h4>
      <div className="courses-container">
        {courseInstructor?.map((course) => (
          <div
            key={course.id}
            className="course-item"
            onClick={() => navigate(`/course-home?id=${course.id}`)}
          >
            <img src={course.img} alt={course.title} className="course-img" />
            <div className="course-info">
              <h5>{course.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProfile;
