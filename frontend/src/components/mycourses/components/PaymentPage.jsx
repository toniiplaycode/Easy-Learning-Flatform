import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEnrollmentEachUser } from "../../../reducers/apiEnrollment";
import { addPaymentEachUser } from "../../../reducers/apiPayment";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { addCouponList, cartEachUser, originalPrice, totalPrice, discount } =
    location.state || {};

  const paymentMethods = useSelector(
    (state) => state.apiPaymentMethod.paymentMethods
  );

  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

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

  const handleCompletePayment = () => {
    // Find the selected payment method's ID
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.name.toLowerCase().replace(" ", "_") === paymentMethod
    );

    const paymentMethodId = selectedPaymentMethod
      ? selectedPaymentMethod.id
      : null;

    // Dispatch actions only if paymentMethodId is valid
    if (paymentMethodId) {
      dispatch(addEnrollmentEachUser(listCourseId));
      dispatch(
        addPaymentEachUser({
          course_id: listCourseId,
          amount: listAmount,
          payment_method_id: paymentMethodId,
        })
      );
      navigate("/my-courses#courses");
    } else {
      console.error("Invalid payment method selected");
    }
  };

  return (
    <div className="min-vh-100">
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-methods">
            <h4>Phương thức thanh toán</h4>
            <div className="method-options">
              {paymentMethods?.map((method) => (
                <label key={method.id}>
                  <div className="credit-choose">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.name.toLowerCase().replace(" ", "_")}
                      checked={
                        paymentMethod ===
                        method.name.toLowerCase().replace(" ", "_")
                      }
                      onChange={handlePaymentMethodChange}
                    />
                    <span>{method.name}</span>
                  </div>
                  <div className="credit-icons">
                    <img src={method.img} alt={method.name} />
                  </div>
                </label>
              ))}
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
            onClick={handleCompletePayment}
            disabled={!paymentMethod} // Disable button if no payment method is selected
          >
            Hoàn tất thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
