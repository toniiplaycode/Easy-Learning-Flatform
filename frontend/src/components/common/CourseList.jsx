import React from "react";
import Slider from "react-slick";
import CourseCard from "./components/CourseCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PreviousArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#d1d1d1", // Darker background for modern look
        color: "#fff",
        borderRadius: "50%",
        zIndex: 1,
        left: "-35px",
        cursor: "pointer", // Make it look clickable
      }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#d1d1d1", // Darker background for modern look
        color: "#fff",
        borderRadius: "50%",
        right: "-35px",
        cursor: "pointer", // Make it look clickable
      }}
      onClick={onClick}
    />
  );
};

const CourseList = ({ courses }) => {
  console.log(courses);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <PreviousArrow />, // Custom Prev Arrow
    nextArrow: <NextArrow />, // Custom Next Arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {courses.map((item, index) => {
        let avgRating = 0;
        item.Reviews.map((review, idx) => {
          avgRating += review.rating;
        });
        return (
          <CourseCard
            key={index}
            imageSrc={item.img}
            title={item.title}
            author={item.User.name}
            rating={
              item.Reviews.length > 0
                ? (avgRating / item.Reviews.length).toFixed(2)
                : 0
            }
            reviews={item.Reviews.length}
            price={item.price}
          />
        );
      })}
    </Slider>
  );
};

export default CourseList;
