import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredStudents, setFilteredStudents] = useState([]); // State for filtered students

  useEffect(() => {
    dispatch(fetchEnrollmentAllUser(idCourseUrl));
  }, [idCourseUrl, dispatch]);

  const enrollmentAllUser = useSelector(
    (state) => state.apiEnrollment.enrollmentAllUser
  );

  // Filter students based on the search term
  useEffect(() => {
    if (enrollmentAllUser) {
      const filtered = enrollmentAllUser.filter(
        (student) =>
          student.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.User.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, enrollmentAllUser]);

  return (
    <div className="mange-list-page-container">
      <button
        className="manage-btn-back"
        onClick={() => navigate("/instructor/manage-student")}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      <div className="mange-list">
        <div className="header">
          <div className="header-item">Gmail</div>
          <div className="header-item">Tên học viên</div>
          <div className="header-item">Ngày tham gia</div>
          <div className="header-item">Đánh giá</div>
          <div className="header-item">Bình luận</div>
          <div className="header-item">Xóa tài khoản khỏi khóa học</div>
        </div>

        {filteredStudents?.length > 0 ? (
          filteredStudents.map((student) => {
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
                <div className="item">
                  <DeleteConfirm
                    delete_user_enrollment={delete_user_enrollment}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>Không tìm thấy học viên nào!</div>
        )}
      </div>
    </div>
  );
};

export default DetailStudent;
