import React from "react";
import { AiFillStar } from "react-icons/ai";
import { formatTimeText } from "../../../utils/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../../reducers/apiCart";

const MyCartPageItem = ({ cart, coupon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let avgRating = 0;
  let sumLecture = 0;
  let sumDuration = 0;

  const sortedDetailCourse = cart.Course; // Access the Course data in the cart

  // Tính số review trung bình
  let totalReviews = sortedDetailCourse?.Reviews?.length || 0;

  if (totalReviews > 0) {
    sortedDetailCourse.Reviews.forEach((review) => {
      avgRating += review.rating;
    });
    avgRating = (avgRating / totalReviews).toFixed(1);
  }

  // Tính số bài giảng
  sortedDetailCourse?.Sections?.forEach((section) => {
    section.Lectures.forEach(() => {
      sumLecture++; // Increment lecture count
    });
  });

  // Tính tổng thời lượng
  sortedDetailCourse?.Sections?.forEach((section) => {
    section.Lectures.forEach((lecture) => {
      sumDuration += lecture.duration; // Add lecture duration
    });
  });

  return (
    <div
      className="mycart-left-item"
      onClick={() => {
        navigate(`/course-home?id=${cart.Course.id}`);
      }}
    >
      <div className="mycart-item">
        <div className="mycart-img">
          <img src={cart.Course.img} alt="Product" />
        </div>
        <div className="mycart-content">
          <h3>{cart.Course.title}</h3>
          <p>{cart.Course.User.name}</p>
          <div className="badge">Lựa chọn tốt nhất</div>
          <div className="rating">
            <span>{avgRating}</span>
            <span className="stars">
              <AiFillStar
                size={18}
                color="#ffa41b"
                style={{ display: "inline-block" }}
              />
            </span>
            <span>({totalReviews})</span>
          </div>
          <p>
            {formatTimeText(sumDuration)} • {sumLecture} bài giảng
          </p>
        </div>
        <div className="mycart-action">
          <div className="price">
            {coupon && (
              <p className="current-price">
                ₫{" "}
                {(
                  cart.Course.price -
                  cart.Course.price * (coupon.discount_percentage / 100)
                ).toLocaleString()}
              </p>
            )}
            <p className={`current-price ${coupon && "discounted"}`}>
              ₫ {cart.Course.price.toLocaleString()}
            </p>
          </div>
          <div className="actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteCart(cart.id));
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartPageItem;
