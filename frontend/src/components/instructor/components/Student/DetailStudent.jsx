import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEnrollmentAllUser } from "../../../../reducers/apiEnrollment";
import { formatDate } from "../../../../utils/common";
import { AiFillStar } from "react-icons/ai";
import DeleteConfirm from "../DeleteConfirm";

const DetailStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = Number(params.get("course_id"));

  useEffect(() => {
    dispatch(fetchEnrollmentAllUser(idCourseUrl));
  }, [idCourseUrl, dispatch]);

  const enrollmentAllUser = useSelector(
    (state) => state.apiEnrollment.enrollmentAllUser
  );

  return (
    <div className="mange-list-page-container">
      <button
        className="manage-btn-back"
        onClick={() => navigate("/instructor/manage-student")}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
      <div className="mange-list">
        <div className="header">
          <div className="header-item">Gmail</div>
          <div className="header-item">Tên học viên</div>
          <div className="header-item">Ngày tham gia</div>
          <div className="header-item">Đánh giá</div>
          <div className="header-item">Bình luận</div>
          <div className="header-item" style={{ maxWidth: "55px" }}></div>
        </div>

        {enrollmentAllUser?.length > 0 ? (
          enrollmentAllUser?.map((student) => {
            const delete_user_enrollment = {
              id_enrollment: student.id,
              course_id: student.course_id,
            };
            return (
              <div className="mange-item" key={student.id}>
                <div className="item">{student.User.email}</div>
                <div className="item">{student.User.name}</div>
                <div className="item">{formatDate(student.created_at)}</div>
                <div className="item">
                  {student?.User?.Reviews.length > 0 ? (
                    [...Array(student?.User?.Reviews[0]?.rating)].map(
                      (_, index) => (
                        <AiFillStar
                          key={index}
                          size={18}
                          color="#ffa41b"
                          style={{ display: "inline-block" }}
                        />
                      )
                    )
                  ) : (
                    <div>...</div>
                  )}
                </div>
                <div className="item">
                  {student.User.Reviews.length > 0
                    ? student.User.Reviews[0].comment
                    : "..."}
                </div>
                <div
                  className="item"
                  style={{
                    maxWidth: "40px",
                    marginLeft: "-20px",
                  }}
                >
                  <DeleteConfirm
                    delete_user_enrollment={delete_user_enrollment}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>Chưa có học viên nào</div>
        )}
      </div>
    </div>
  );
};

export default DetailStudent;
