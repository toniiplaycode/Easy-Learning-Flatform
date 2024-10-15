import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse } from "../../../../reducers/apiCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateUpdateCourse = ({ detailCourse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getUrl = location.pathname;
  const categories = useSelector((state) => state.apiCategory.categories);
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  //------------update course--------------
  const [courseData, setCourseData] = useState({
    title: detailCourse?.title || "",
    description: detailCourse?.description || "",
    instructor_id: inforUser.id,
    price: detailCourse?.price || 0,
    level: detailCourse?.level || "beginner",
    language: detailCourse?.language || "English",
    category_id: detailCourse?.category_id || null,
    img: detailCourse?.img || "",
  });

  //------------create course--------------
  const [errors, setErrors] = useState({});
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
      name === "price" || name === "category_id" ? Number(value) : value;

    setCourseData({
      ...courseData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageUrl(URL.createObjectURL(file)); // Set preview URL

      await postCloudinary(file);

      setErrors({
        ...errors,
        img: "",
      });
    }
  };

  const postCloudinary = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      return;
    }

    if (
      pic.type === "image/jpg" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app"); // trùng với name của upload presets trên cloudinary
      data.append("cloud_name", "dj8ae1gpq"); // trùng với name của clound name trên cloudinary
      fetch("https://api.cloudinary.com/v1_1/dj8ae1gpq/image/upload", {
        method: "post",
        body: data,
      }) // thêm /image/upload
        .then((res) => res.json())
        .then((data) => {
          setCourseData({
            ...courseData,
            img: data.url.toString(),
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      return;
    }
  };

  const handleDescriptionChange = (value) => {
    setCourseData({
      ...courseData,
      description: value,
    });

    setErrors({
      ...errors,
      description: "",
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!courseData.title || courseData.title.length < 5) {
      validationErrors.title = "Tiêu đề phải dài ít nhất 5 ký tự.";
    }
    if (!courseData.description || courseData.description.length < 10) {
      validationErrors.description = "Mô tả phải dài ít nhất 10 ký tự.";
    }
    if (!courseData.category_id) {
      validationErrors.category_id = "Vui lòng chọn thể loại.";
    }
    if (Number(courseData.price) < 0) {
      validationErrors.price = "Giá phải không được âm.";
    }
    if (!courseData.level) {
      validationErrors.level = "Vui lòng chọn cấp độ khóa học.";
    }
    if (!courseData.language) {
      validationErrors.language = "Vui lòng chọn ngôn ngữ khóa học.";
    }
    if (!courseData.img) {
      validationErrors.img = "Vui lòng tải lên hình ảnh.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (detailCourse) {
      dispatch(updateCourse({ ...courseData, id: detailCourse.id }));
      navigate("/instructor");
    } else if (validate()) {
      dispatch(addCourse(courseData));
      navigate("/instructor");
    }
  };

  return (
    <>
      {getUrl === "/instructor/create-course" && (
        <button
          className="create-course-btn-back"
          onClick={() => navigate("/instructor")}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
        </button>
      )}
      <div className="create-update-course-container">
        <h2>{detailCourse ? "Quản lý khóa học" : "Tạo khóa học mới"} </h2>
        <div className="create-update-course-form">
          {detailCourse && (
            <div className="form-group">
              <label htmlFor="img">Hình khóa học hiện tại</label>
              <div className="image-preview">
                <img src={detailCourse.img} alt="Course Preview" />
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id="title"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề khóa học"
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <ReactQuill
              className="form-group-quill"
              value={courseData.description}
              onChange={handleDescriptionChange}
              placeholder="Nhập mô tả khóa học của bạn"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Thể loại</label>
            <select
              id="category_id"
              name="category_id"
              value={courseData.category_id}
              onChange={handleChange}
            >
              <option value="">Chọn thể loại khóa học</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="error">{errors.category_id}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá (₫)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              placeholder="Nhập giá"
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="level">Cấp độ</label>
            <select
              id="level"
              name="level"
              value={courseData.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.level && <p className="error">{errors.level}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="language">Ngôn ngữ khóa học</label>
            <select
              id="language"
              name="language"
              value={courseData.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
            {errors.language && <p className="error">{errors.language}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="img">Chọn hình khóa học</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImageUrl && (
              <div className="image-preview">
                {loading && (
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                <img src={selectedImageUrl} alt="Course Preview" />
              </div>
            )}
            {errors.img && <p className="error">{errors.img}</p>}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            {detailCourse ? "Cập nhật khóa học" : "Tạo khóa học"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateCourse;
