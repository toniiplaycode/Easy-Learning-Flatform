import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/common";
import {
  addCoupon,
  deleteCoupon,
  fetchCouponEachCourse,
  updateCoupon,
} from "../../../../reducers/apiCoupon";

const DetailCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = Number(params.get("course_id"));

  const couponEachCourse = useSelector(
    (state) => state.apiCoupon.couponEachCourse
  );

  useEffect(() => {
    dispatch(fetchCouponEachCourse(idCourseUrl));
  }, [idCourseUrl]);

  // useState để lưu giá trị nhập
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false); // Biến để kiểm tra chế độ sửa
  const [editCouponId, setEditCouponId] = useState(null); // Lưu trữ id của mã giảm giá đang chỉnh sửa

  // Hàm validate form
  const validateForm = () => {
    const newErrors = {};

    if (!couponCode) {
      newErrors.couponCode = "Vui lòng nhập mã giảm giá";
    }
    if (
      !discountPercentage ||
      isNaN(discountPercentage) ||
      discountPercentage <= 0 ||
      discountPercentage > 100
    ) {
      newErrors.discountPercentage =
        "Phần trăm giảm giá phải là số và trong khoảng từ 1 đến 100";
    }
    if (!expiryDate) {
      newErrors.expiryDate = "Vui lòng chọn ngày hết hạn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi người dùng thay đổi input để xóa lỗi
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    if (errors.couponCode) {
      setErrors((prevErrors) => ({ ...prevErrors, couponCode: null }));
    }
  };

  const handleDiscountPercentageChange = (e) => {
    setDiscountPercentage(e.target.value);
    if (errors.discountPercentage) {
      setErrors((prevErrors) => ({ ...prevErrors, discountPercentage: null }));
    }
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
    if (errors.expiryDate) {
      setErrors((prevErrors) => ({ ...prevErrors, expiryDate: null }));
    }
  };

  // Hàm xử lý thêm mã giảm giá
  const handleAddCoupon = () => {
    if (validateForm()) {
      const obj = {
        course_id: idCourseUrl,
        code: couponCode,
        discount_percentage: discountPercentage,
        valid_until: expiryDate,
      };

      dispatch(addCoupon(obj));

      setCouponCode("");
      setDiscountPercentage("");
      setExpiryDate("");
    }
  };

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEditCoupon = (coupon) => {
    setCouponCode(coupon.code);
    setDiscountPercentage(coupon.discount_percentage);
    setExpiryDate(coupon.valid_until);
    setEditCouponId(coupon.id); // Lưu id của mã giảm giá đang chỉnh sửa
    setEditMode(true); // Chuyển sang chế độ chỉnh sửa
  };

  // Hàm xử lý cập nhật mã giảm giá
  const handleUpdateCoupon = () => {
    if (validateForm()) {
      const obj = {
        id: editCouponId,
        course_id: idCourseUrl,
        code: couponCode,
        discount_percentage: discountPercentage,
        valid_until: expiryDate,
      };
      dispatch(updateCoupon(obj));
      // Reset lại trạng thái sau khi cập nhật
      setCouponCode("");
      setDiscountPercentage("");
      setExpiryDate("");
      setEditCouponId(null);
      setEditMode(false);
    }
  };

  return (
    <div className="mange-list-page-container">
      <button
        className="manage-btn-back"
        onClick={() => navigate("/instructor/manage-coupon")}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
      <div className="mange-list">
        <div className="header">
          <div className="header-item">Mã giảm giá</div>
          <div className="header-item">Phần trăm giảm giá</div>
          <div className="header-item">Ngày hết hạn</div>
          <div className="header-item"></div>
        </div>

        {couponEachCourse?.length > 0 ? (
          couponEachCourse?.map((coupon) => (
            <div className="mange-item" key={coupon.id}>
              <div className="item">{coupon.code}</div>
              <div className="item">{coupon.discount_percentage} %</div>
              <div className="item">{formatDate(coupon.valid_until)}</div>
              <div className="item">
                <button onClick={() => handleEditCoupon(coupon)}>Sửa</button>
                <button
                  onClick={() => {
                    const obj = {
                      course_id: idCourseUrl,
                      id: coupon.id,
                    };
                    dispatch(deleteCoupon(obj));
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Chưa có mã giảm giá nào !</div>
        )}
      </div>

      <h5>{editMode ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"} </h5>
      <div className="form-group">
        <input
          type="text"
          id="couponCode"
          name="couponCode"
          placeholder="Nhập mã giảm giá"
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
        {errors.couponCode && <p className="error">{errors.couponCode}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          id="discountPercentage"
          name="discountPercentage"
          placeholder="Nhập phần trăm giảm giá"
          value={discountPercentage}
          onChange={handleDiscountPercentageChange}
        />
        {errors.discountPercentage && (
          <p className="error">{errors.discountPercentage}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          placeholder="Nhập ngày hết hạn"
          value={expiryDate}
          onChange={handleExpiryDateChange}
        />
        {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
      </div>

      <button
        className="submit-btn"
        onClick={editMode ? handleUpdateCoupon : handleAddCoupon}
      >
        {editMode ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
      </button>
    </div>
  );
};

export default DetailCoupon;
