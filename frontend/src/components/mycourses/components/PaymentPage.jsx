import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEnrollmentEachUser } from "../../../reducers/apiEnrollment";
import { addPaymentEachUser } from "../../../reducers/apiPayment";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { addCouponList, cartEachUser, originalPrice, totalPrice, discount } =
    location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [listCourseId, setListCourseId] = useState(() => {
    return cartEachUser.map((item) => {
      return item.course_id;
    });
  });
  const [listAmount, setListAmount] = useState(() => {
    return cartEachUser.map((item) => {
      const matchingCoupon = addCouponList.find(
        (coupon) => coupon.course_id === item.Course.id
      );

      if (matchingCoupon) {
        const priceDiscounted =
          item.Course.price -
          item.Course.price * (matchingCoupon.discount_percentage / 100);
        return priceDiscounted;
      } else {
        return item.Course.price;
      }
    });
  });

  // "credit_card", "paypal", "bank_transfer"

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  let data;

  return (
    <div className="min-vh-100">
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-methods">
            <h4>Phương thức thanh toán</h4>
            <div className="method-options">
              <label>
                <div className="credit-choose">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={handlePaymentMethodChange}
                  />
                  <span>Thẻ tín dụng</span>
                </div>
                <div className="credit-icons">
                  <img src="/imgs/visa.png" />
                  <img src="/imgs/masterCard.png" />
                </div>
              </label>
              <label>
                <div className="credit-choose">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={handlePaymentMethodChange}
                  />
                  <span>PayPal</span>
                </div>
                <div className="credit-icons">
                  <img src="/imgs/paypal.png" />
                </div>
              </label>
            </div>
          </div>

          <div className="order-summary">
            <h4>Thông tin khóa học</h4>
            <div className="order-items">
              {cartEachUser?.map((cart, index) => (
                <div key={index} className="order-item">
                  <img src={cart.Course.img} alt={cart.Course.title} />
                  <span className="course-title">{cart.Course.title}</span>
                  <span className="course-price">
                    ₫ {cart.Course.price.toLocaleString()} - giá gốc
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="summary-container">
          <h4>Tóm tắt</h4>
          <div className="summary-details">
            <div className="summary-item">
              <span>Tổng giá gốc:</span>
              <span className="original-price">
                ₫ {originalPrice?.toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span className="discount-label">Giảm:</span>
              <span className="discount-amount">
                ₫ {discount?.toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span>Tổng sau giảm:</span>
              <span className="discounted-price">
                ₫ {totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            className="complete-payment-btn"
            onClick={() => {
              dispatch(addEnrollmentEachUser(listCourseId));
              dispatch(
                addPaymentEachUser(
                  (data = {
                    course_id: listCourseId,
                    amount: listAmount,
                    payment_method: paymentMethod,
                  })
                )
              );
              navigate("/my-courses#courses");
            }}
          >
            Hoàn tất thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
