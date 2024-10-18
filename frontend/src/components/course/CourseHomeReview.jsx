import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { formatDate } from "../../utils/common";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addReview, updateReview } from "../../reducers/apiReview";

const CourseHomeReview = ({ reviews, isEnrolled }) => {
  const dispatch = useDispatch();
  const [valueRating, setValueRating] = useState(3);
  const [comment, setComment] = useState("");
  const [idReviewUpdate, setIdReviewUpdate] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  const postReview = () => {
    if (comment.trim().length == 0) {
      toast.warning("Nội dung đánh giá không được trống !");
      return;
    }

    const obj = {
      course_id: reviews[0].course_id,
      comment: comment,
      rating: valueRating,
    };

    dispatch(addReview(obj));

    setComment("");
    setValueRating(3); // 3 số rating là mặc định
  };

  const putReview = () => {
    const obj = {
      course_id: reviews[0].course_id,
      id: idReviewUpdate,
      comment,
      rating: valueRating,
    };

    dispatch(updateReview(obj));
    setIsUpdate(false);
    setComment("");
    setValueRating(3); // 3 số rating là mặc định
  };

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review) => (
          <div className="coure-home-review-item">
            <div>
              <div className="review-item-infor">
                <div className="review-item-infor-left">
                  <img
                    src={
                      review?.User?.avatar
                        ? review?.User?.avatar
                        : "imgs/user.png"
                    }
                  />
                </div>
                <div className="review-item-infor-right">
                  <span>
                    {formatDate(review?.created_at)} - {review?.User?.name}
                  </span>
                  <span>
                    {[...Array(review?.rating)].map((_, index) => (
                      <AiFillStar
                        key={index}
                        size={18}
                        color="#ffa41b"
                        style={{ display: "inline-block" }}
                      />
                    ))}
                  </span>
                </div>
              </div>
              <div className="review-item-content">{review?.comment}</div>
            </div>
            {inforUser.id == review?.User?.id && (
              <div
                className="review-item-edit"
                onClick={() => {
                  setIdReviewUpdate(review.id);
                  setValueRating(review.rating);
                  setComment(review.comment);
                  setIsUpdate(true);
                }}
              >
                Sửa
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="not-review">Chưa có đánh giá nào !</div>
      )}

      {isEnrolled && (
        <div className="coure-home-review-add">
          <p>Thêm đánh giá của bạn</p>
          <Rating
            name="simple-controlled"
            value={valueRating}
            onChange={(event, newValue) => {
              setValueRating(newValue);
            }}
          />
          <textarea
            style={{
              width: "100%",
            }}
            className="input-common"
            placeholder="Thêm đánh giá của bạn về khóa học"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="btn-common"
            onClick={() => {
              if (isUpdate) putReview();
              else postReview();
            }}
          >
            {isUpdate ? "Cập nhật" : "Đánh giá"}
          </button>
        </div>
      )}
    </>
  );
};

export default CourseHomeReview;
