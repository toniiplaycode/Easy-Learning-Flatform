import React from "react";

const CourseCard = ({ imageSrc, title, author, rating, reviews, price }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="course-details">
        <h4 className="course-title">{title}</h4>
        <p className="course-author">{author}</p>
        <div className="course-rating">
          <span>{rating}</span>
          <span className="stars">★</span>
          <span className="reviews">({reviews})</span>
        </div>
        <div className="course-price">
          <strong>{price}</strong>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
