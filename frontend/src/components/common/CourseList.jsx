import React from "react";
import Slider from "react-slick";
import CourseCard from "./components/CourseCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom Arrow component for Previous button
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

// Custom Arrow component for Next button
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

function CourseList() {
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
      <CourseCard
        imageSrc="imgs/profile.png"
        title="Notion with Snow"
        author="Snow Dang Tuyet"
        rating="4,7"
        reviews="283"
        price="₫ 399.000"
      />

      <CourseCard
        imageSrc="imgs/logo.png"
        title="AWS Cloud for beginner (Vietnamese)"
        author="Linh Nguyen"
        rating="4,8"
        reviews="718"
        price="₫ 1.699.000"
        popular={true}
      />

      <CourseCard
        imageSrc="imgs/logo.png"
        title="Canva 101 - Làm chủ kỹ năng thiết kế Canva cho người mới"
        author="Skill Sharing School, Le Phuong Thanh"
        rating="4,7"
        reviews="33"
        price="₫ 749.000"
        trending={true}
      />

      <CourseCard
        imageSrc="imgs/logo.png"
        title="Notion with Snow"
        author="Snow Dang Tuyet"
        rating="4,7"
        reviews="283"
        price="₫ 399.000"
      />

      <CourseCard
        imageSrc="imgs/logo.png"
        title="AWS Cloud for beginner (Vietnamese)"
        author="Linh Nguyen"
        rating="4,8"
        reviews="718"
        price="₫ 1.699.000"
        popular={true}
      />

      <CourseCard
        imageSrc="imgs/logo.png"
        title="Canva 101 - Làm chủ kỹ năng thiết kế Canva cho người mới"
        author="Skill Sharing School, Le Phuong Thanh"
        rating="4,7"
        reviews="33"
        price="₫ 749.000"
        trending={true}
      />
    </Slider>
  );
}

export default CourseList;
