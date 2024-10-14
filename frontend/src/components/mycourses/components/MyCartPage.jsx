import React, { useEffect, useState } from "react";
import MyCartPageItem from "./MyCartPageItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyCartPage = ({ cartEachUser }) => {
  const coupons = useSelector((state) => state.apiCoupon.coupons);

  const [addCouponList, setAddCouponList] = useState([]);
  const [addCouponItem, setAddCouponItem] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0); // Track original price
  const navigate = useNavigate();

  const handleAddCouponList = () => {
    const matchedCoupon = coupons.find(
      (coupon) => coupon.code === addCouponItem
    );

    const couponExists = addCouponList.some(
      (coupon) => coupon.code === matchedCoupon?.code
    );

    if (matchedCoupon && !couponExists) {
      setAddCouponList([...addCouponList, matchedCoupon]);
      setAddCouponItem("");
      toast.success("Mã giảm giá đã được thêm!");
    } else if (couponExists) {
      toast.warning("Mã giảm giá đã được sử dụng!");
    } else {
      toast.warning("Mã giảm giá không hợp lệ!");
    }
  };

  useEffect(() => {
    let calculatedTotalPrice = 0;
    let calculatedOriginalPrice = 0;

    cartEachUser?.forEach((cart) => {
      let coursePrice = cart.Course.price;
      calculatedOriginalPrice += coursePrice;

      const matchingCoupon = addCouponList.find(
        (coupon) => coupon.course_id === cart.Course.id
      );

      if (matchingCoupon) {
        const discountAmount =
          (coursePrice * matchingCoupon.discount_percentage) / 100;
        coursePrice -= discountAmount;
      }

      calculatedTotalPrice += coursePrice;
    });

    setTotalPrice(calculatedTotalPrice);
    setOriginalPrice(calculatedOriginalPrice);
  }, [cartEachUser, addCouponList]);

  if (cartEachUser?.length > 0) {
    return (
      <div className="mycart-container">
        <div className="mycart-container-left">
          {cartEachUser?.map((cart, index) => {
            const matchingCoupon = addCouponList.find(
              (coupon) => coupon.course_id === cart.Course.id
            );

            return (
              <MyCartPageItem
                key={index}
                cart={cart}
                coupon={matchingCoupon ? matchingCoupon : null} // Pass the coupon if it exists
              />
            );
          })}
        </div>

        <div className="mycart-container-right">
          <h3>Tổng</h3>
          <h4>₫ {totalPrice.toLocaleString()}</h4>{" "}
          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/payment", {
                state: {
                  addCouponList: addCouponList,
                  cartEachUser, // Pass cart data
                  originalPrice,
                  totalPrice,
                  discount: originalPrice - totalPrice,
                },
              })
            }
          >
            Thanh Toán
          </button>
          <div className="coupon-section">
            <p>Khuyến mại</p>
            <div className="applied-coupon">
              {addCouponList.length > 0 &&
                addCouponList?.map((coupon, index) => (
                  <div className="coupon-item" key={index}>
                    <span>
                      {coupon.code} - {coupon.discount_percentage}%
                    </span>
                    <span
                      className="remove-coupon"
                      onClick={() => {
                        setAddCouponList(
                          addCouponList.filter((_, idx) => index !== idx)
                        );
                      }}
                    >
                      X
                    </span>
                  </div>
                ))}
            </div>

            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={addCouponItem}
              onChange={(e) => setAddCouponItem(e.target.value)}
            />
            <button className="apply-coupon" onClick={handleAddCouponList}>
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mycourse__empty-container">
        <h3 className="mycourse__empty">Chưa có khóa học trong giỏ hàng ! </h3>
        <img className="mycourse__empty-img" src="imgs/emptybox.png" />

        <button
          className="mycourse__empty-btn"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Trang chủ
        </button>
      </div>
    );
  }
};

export default MyCartPage;
