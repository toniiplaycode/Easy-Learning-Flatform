import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { putUpdateUser } from "../../reducers/apiUpdateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const InforUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  useEffect(() => {
    if (Object.keys(inforUser).length == 0) navigate("/");
  }, [inforUser]);

  const [isDisable, setisDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(inforUser.name || "");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(inforUser.bio || "");

  return (
    <div className="profile-devide container">
      <div className="row">
        <div className="profile-info col-xl-4 col-12">
          <p className="profile-title">Thông tin tài khoản</p>
          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            {inforUser.role === "student" ? (
              <>
                <FontAwesomeIcon icon={faUser} /> Tài khoản học viên
              </>
            ) : inforUser.role === "instructor" ? (
              <>
                <FontAwesomeIcon icon={faChalkboardUser} /> Tài khoản giảng viên
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUserTie} /> Tài khoản quản lý
              </>
            )}
          </p>
          <p>{inforUser.email}</p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Tên đầy đủ
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Tên của bạn"
              onChange={(e) => {
                setisDisable(false);
                setName(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Đổi mật khẩu mới
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu mới của bạn"
              onChange={(e) => {
                setisDisable(false);
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Tiểu sử của bạn
            </label>
            <textarea
              type="text"
              className="form-control pb-5"
              value={bio}
              placeholder="Giáo viên dạy toán, giảng viên CNTT,..."
              onChange={(e) => {
                setisDisable(false);
                setBio(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <Button
              isLoading={isLoading}
              className="btn btn-primary w-100"
              loadingText="Đang cập nhật"
              colorScheme="#007bff"
              disabled={isDisable}
              onClick={() => {
                dispatch(
                  putUpdateUser({ id: inforUser.id, name, password, bio })
                );
              }}
            >
              Cập nhật
            </Button>
          </div>
        </div>

        <div className="profile-courses col-xl-8 col-12">
          <p className="profile-title">Các khóa học đã tham gia</p>
          <div className="courses-list">
            {enrollmentEachUser.length > 0 ? (
              enrollmentEachUser?.map((enroll) => (
                <div
                  className="course-item"
                  onClick={() =>
                    navigate(`/course-home?id=${enroll.Course.id}`)
                  }
                >
                  <img
                    src={enroll.Course.img}
                    alt="React Course"
                    className="course-img"
                  />
                  <div className="course-info">
                    <h3>{enroll.Course.title}</h3>
                    <p>
                      {typeof enroll.Course.description === "string"
                        ? parse(enroll.Course.description)
                        : enroll.Course.description ||
                          "No description available"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h3>Bạn chưa tham gia khóa học nào !</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforUser;
