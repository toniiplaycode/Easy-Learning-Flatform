import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putUpdateUser } from "../../reducers/apiUpdateUser";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  useEffect(() => {
    if (Object.keys(inforUser).length == 0) navigate("/");
  }, [inforUser]);

  const [isDisable, setisDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(inforUser.name || "");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(inforUser.bio || "");

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="imgs/bannerProfile.png"
          alt="Profile Background"
          className="profile-header-img d-none d-md-block"
        />

        <img
          src="imgs/bannerProfileMobile.png"
          alt="Profile Background"
          className="profile-header-img d-block d-md-none"
        />

        <div className="profile-avatar">
          <img
            src={inforUser.avatar ? inforUser.avatar : "imgs/profile.png"}
            alt="Profile Avatar"
            className="avatar-img"
          />
        </div>
        <p className="profile-name">{inforUser.name}</p>
      </div>

      <div className="profile-devide container">
        <div className="row">
          <div className="profile-info col-xl-4 col-12">
            <p className="profile-title">Thông tin tài khoản</p>
            <p style={{ color: "#007bff" }}>
              {inforUser.role === "student"
                ? "Tài khoản học viên"
                : inforUser.role === "instructor"
                ? "Tài khoản người hướng dẫn"
                : "Tài khoản quản lý"}
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
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu của bạn"
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
                  dispath(
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
              <div className="course-item">
                <img
                  src="imgs/logo.png"
                  alt="React Course"
                  className="course-img"
                />
                <div className="course-info">
                  <h3>Xây Dựng Website với ReactJS</h3>
                  <p>
                    Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa
                    học này là bạn có thể làm hầu hết các dự án thường gặp với
                    ReactJS.
                  </p>
                </div>
              </div>
              <div className="course-item">
                <img
                  src="imgs/logo.png"
                  alt="NodeJS Course"
                  className="course-img"
                />
                <div className="course-info">
                  <h3>Node & ExpressJS</h3>
                  <p>
                    Học Back-end với Node & ExpressJS framework, hiểu các khái
                    niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                  </p>
                </div>
              </div>
              <div className="course-item">
                <img
                  src="imgs/logo.png"
                  alt="Ubuntu Course"
                  className="course-img"
                />
                <div className="course-info">
                  <h3>Làm việc với Terminal & Ubuntu</h3>
                  <p>
                    Sở hữu một Terminal hiện đại, mạnh mẽ trong tầm tay và học
                    cách làm việc với Ubuntu là một bước quan trọng để trở thành
                    một Web Developer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
