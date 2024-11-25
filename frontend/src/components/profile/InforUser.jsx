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
    if (Object.keys(inforUser).length === 0) navigate("/");
  }, [inforUser, navigate]);

  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(inforUser.name || "");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(inforUser.bio || "");
  const [avatar, setAvatar] = useState(inforUser.avatar || ""); // For storing the uploaded avatar URL
  const [previewImage, setPreviewImage] = useState(null); // For displaying the selected image preview

  // Function to handle Cloudinary upload
  const postCloudinary = (pic) => {
    setIsLoading(true);
    if (!pic) {
      alert("No file selected");
      setIsLoading(false);
      return;
    }

    if (["image/jpg", "image/jpeg", "image/png"].includes(pic.type)) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app"); // Replace with your Cloudinary preset
      data.append("cloud_name", "dj8ae1gpq"); // Replace with your Cloudinary name

      fetch("https://api.cloudinary.com/v1_1/dj8ae1gpq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          setIsLoading(false);
          setIsDisable(false); // Enable the update button
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error uploading image:", error);
        });
    } else {
      setIsLoading(false);
      alert("Please select a valid image format (jpg, jpeg, or png).");
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Display preview when new image is selected
      postCloudinary(file); // Upload to Cloudinary
      setIsDisable(false); // Enable the button after selecting the file
    }
  };

  return (
    <div className="profile-devide container">
      <div className="row">
        <div className="profile-info col-xl-4 col-12">
          <p className="profile-title">Thông tin tài khoản</p>
          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            {inforUser.role === "student" || inforUser.role === "pending" ? (
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

          {/* Avatar Preview */}
          <div className="avatar-preview mb-3">
            {previewImage && (
              <img
                src={previewImage}
                alt="Avatar Preview"
                className="avatar-img"
              />
            )}
          </div>

          {/* Upload Avatar */}
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Cập nhật ảnh đại diện
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

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
                setIsDisable(false);
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
                setIsDisable(false);
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
                setIsDisable(false);
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
                  putUpdateUser({
                    id: inforUser.id,
                    name,
                    password,
                    bio,
                    avatar,
                  })
                );
                setPreviewImage(null); // Reset preview after update
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
                  key={enroll.Course.id}
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
