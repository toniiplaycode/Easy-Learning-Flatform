import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirm from "../instructor/components/DeleteConfirm";
import { addPaymentMethod } from "../../reducers/apiPaymentMethod";

const AdminPayment = () => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector(
    (state) => state.apiPaymentMethod.paymentMethods
  );

  const [name, setName] = useState("");
  const [img, setImg] = useState(""); // URL of uploaded image
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cloudinary image upload function
  const postCloudinary = (pic) => {
    setLoading(true);
    if (!pic) {
      alert("No file selected");
      setLoading(false);
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
          setImg(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    } else {
      alert("Please select a valid image format (jpg, jpeg, or png).");
      setLoading(false);
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Vui lòng nhập tên phương thức thanh toán";
    if (!img) newErrors.img = "Vui lòng tải lên một hình ảnh";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    if (validateForm()) {
      dispatch(addPaymentMethod({ name, img }));
      setName("");
      setImg("");
    }
  };

  return (
    <div className="mange-list-page-container" style={{ marginTop: "80px" }}>
      <div className="mange-list">
        <div className="header" style={{ display: "flex" }}>
          <div className="header-item">Phương thức</div>
          <div className="header-item">Ảnh</div>
          <div className="header-item">Xóa</div>
        </div>
        {paymentMethods?.length > 0 &&
          paymentMethods.map((paymentMethod) => (
            <div
              className="mange-item"
              style={{ display: "flex" }}
              key={paymentMethod.id}
            >
              <div className="item">{paymentMethod.name}</div>
              <div className="item">
                <img
                  src={paymentMethod.img}
                  alt={paymentMethod.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginLeft: "-10px",
                  }}
                />
              </div>
              <div className="item" style={{ marginLeft: "-30px" }}>
                <DeleteConfirm delete_payment_method={paymentMethod.id} />
              </div>
            </div>
          ))}
      </div>

      {/* Form to add new payment method */}
      <h5>Thêm phương thức thanh toán</h5>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nhập tên phương thức thanh toán"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => postCloudinary(e.target.files[0])}
        />
        {loading ? (
          <p>Đang tải ảnh...</p>
        ) : (
          img && (
            <img
              src={img}
              alt="Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )
        )}
        {errors.img && <p className="error">{errors.img}</p>}
      </div>

      <button
        className="submit-btn"
        onClick={handleAddPaymentMethod}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Thêm phương thức thanh toán
      </button>
    </div>
  );
};

export default AdminPayment;
