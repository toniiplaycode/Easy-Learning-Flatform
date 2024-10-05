import React from "react";
import Header from "./components/Header";
import SlideShow from "./components/SlideShow";
import CourseList from "../common/CourseList";
import CourseCard from "../common/components/CourseCard";
import InfiniteScroll from "./components/InfiniteScroll";

const Home = () => {
  return (
    <>
      <Header />
      <SlideShow />
      <div className="container-paddingX">
        <p
          style={{
            margin: "30px 0 -30px 0",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          Các khóa học phổ biến
        </p>
        <CourseList />
        <p
          style={{
            margin: "30px 0 -30px 0",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          <span>Các khóa học miễn phí</span>
        </p>
        {/* <p>Xem thêm</p> */}
        <CourseList />
      </div>
      <p
        style={{
          margin: "30px 0 30px 0",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Tích hợp với các công cụ yêu thích của bạn để học dễ dàng
      </p>
      <InfiniteScroll />
    </>
  );
};

export default Home;
