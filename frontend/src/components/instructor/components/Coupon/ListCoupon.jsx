import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCourseWithCoupon } from "../../../../reducers/apiCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faTicketSimple,
} from "@fortawesome/free-solid-svg-icons";

const ListCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    dispatch(fetchAllCourseWithCoupon(inforUser.id));
  }, []);

  const courseCoupon = useSelector((state) => state.apiCourse.courseCoupon);

  return (
    <div className="student-page-instructor">
      {courseCoupon?.length > 0 ? (
        courseCoupon?.map((course) => {
          return (
            <div className="course-list">
              <div className="course-item">
                <div className="course-info">
                  <img src={course.img} alt="Course Thumbnail" />
                  <div className="course-details">
                    <h3>{course.title}</h3>
                    <span>
                      <FontAwesomeIcon
                        icon={faTicketSimple}
                        style={{ color: "orange" }}
                      />{" "}
                      {course.Coupons.length > 0
                        ? `có ${course.Coupons.length} mã`
                        : `chưa có mã nào`}
                    </span>
                  </div>
                </div>
                <div className="course-action">
                  <button
                    onClick={() => {
                      navigate(
                        `/instructor/manage-coupon/detail-coupon?course_id=${course.id}`
                      );
                    }}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="list-empty">
          <h3>Chưa có mã giảm giá nào ! </h3>
          <img src="/imgs/emptybox.png" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ListCoupon;
