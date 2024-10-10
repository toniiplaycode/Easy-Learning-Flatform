import React from "react";
import SlideShow from "./components/SlideShow";
import CourseList from "../common/CourseList";
import InfiniteScroll from "./components/InfiniteScroll";
import Testimonial from "./components/Testimonial";
import { useSelector } from "react-redux";

const Home = () => {
  const courses = useSelector((state) => state.apiCourse.courses);

  return (
    <>
      <SlideShow />
      <div className="container-paddingX">
        <p
          style={{
            margin: "40px 0 -30px 0",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          Các khóa học phổ biến
        </p>
        <CourseList courses={courses} category={"fee"} />
        <p
          style={{
            margin: "40px 0 -30px 0",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          <span>Các khóa học miễn phí</span>
        </p>
        {/* <p>Xem thêm</p> */}
        <CourseList courses={courses} category={"free"} />
      </div>
      <p
        style={{
          margin: "40px 0 30px 0",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Tích hợp với các công cụ yêu thích của bạn để học dễ dàng
      </p>
      <InfiniteScroll />
      <p
        style={{
          margin: "10px 0 30px 0",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Những học viên đã học hỏi được điều gì ?
      </p>
      <div className="container-paddingX">
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
