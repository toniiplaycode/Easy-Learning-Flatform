import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDetailCourse } from "../../reducers/apiCourse";
import { formatDate, formatTime, formatTimeText } from "../../utils/common";
import ModalTrailer from "./ModalTrailer";
import { saveUrl, toggleTrailer } from "../../reducers/modalTrailer";

const CourseHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const params = new URLSearchParams(window.location.search);
  const idCourse = params.get("id");

  useEffect(() => {
    dispatch(fetchDetailCourse(idCourse));
  }, [idCourse]);

  const detailCourse = useSelector((state) => state.apiCourse.detailCourse);

  // sort lecture
  const [sortedDetailCourse, setSortedDetailCourse] = useState(null);
  useEffect(() => {
    if (detailCourse && detailCourse.Sections) {
      // Sort the lectures inside each section
      const sortedCourse = {
        ...detailCourse,
        Sections: detailCourse.Sections.map((section) => ({
          ...section,
          Lectures: section.Lectures?.slice().sort((a, b) => a.id - b.id) || [], // Sort lectures by id or return an empty array
        })),
      };

      setSortedDetailCourse(sortedCourse);
    }
  }, [detailCourse]);

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  //tính số review trung bình
  let avgRating = 0;
  let totalReviews = sortedDetailCourse?.Reviews?.length || 0;

  if (totalReviews > 0) {
    sortedDetailCourse.Reviews.forEach((review) => {
      avgRating += review.rating;
    });
    avgRating = (avgRating / totalReviews).toFixed(2);
  }

  //tính số bài giảng
  let sumLecture = 0;
  let totalLectures = sortedDetailCourse?.Sections?.length || 0;

  if (totalLectures > 0) {
    sortedDetailCourse.Sections.forEach((section) => {
      section.Lectures.forEach((lecture) => {
        sumLecture++;
      });
    });
  }

  //tính tổng thời lượng
  let sumDuration = 0;

  if (totalLectures > 0) {
    sortedDetailCourse.Sections.forEach((section) => {
      section.Lectures.forEach((lecture) => {
        sumDuration += lecture.duration;
      });
    });
  }

  // toggle trailer
  const toggle = () => dispatch(toggleTrailer());

  return (
    <div className="course-home min-vh-100">
      <div className="course-header">
        <ModalTrailer />
        <div className="course-title">
          <h1>{sortedDetailCourse?.title}</h1>
          <ul>
            <li>
              <TiTickOutline
                size={22}
                style={{ display: "inline-block", color: "#5022c3" }}
              />
              {sortedDetailCourse?.description}
            </li>
          </ul>
          <div className="course-details">
            <div className="course-rating-container">
              <p className="highlight-label">Bán chạy nhất</p>
              <div className="course-rating">
                <p>
                  {avgRating}{" "}
                  <AiFillStar
                    size={18}
                    color="#ffa41b"
                    style={{ display: "inline-block" }}
                  />
                </p>
              </div>
              <p>({totalReviews} Học viên)</p>
            </div>
            <p>
              Được tạo bởi <a href="#">{sortedDetailCourse?.User?.name}</a>
            </p>
            <p>
              <span>
                Khóa học được tạo {formatDate(sortedDetailCourse?.createdAt)}{" "}
              </span>
              <span>
                <FontAwesomeIcon icon={faEarthAmericas} />{" "}
                {sortedDetailCourse?.language}
              </span>
            </p>
          </div>
        </div>

        <div className="course-video">
          <div className="video-thumbnail" style={{ position: "relative" }}>
            <img src={sortedDetailCourse?.img} alt="Course Introduction" />
            <div className="video-thumbnail-opacity">
              <FontAwesomeIcon
                className="icon-play"
                icon={faCirclePlay}
                color="#343434"
                size="5x"
                onClick={() => {
                  toggle();
                  saveUrl("Y6aYx_KKM7A");
                }}
              />
            </div>
          </div>
          <div className="course-info">
            <h3>
              {sortedDetailCourse?.price == 0
                ? "Miễn phí"
                : "₫ " + sortedDetailCourse?.price}
            </h3>
            <div className="course-info-btn">
              <div>
                <button className="enroll-button not-bg">
                  Thêm vào giỏ hàng
                </button>
                <button className="enroll-button not-bg">
                  <IoMdHeartEmpty size={22} style={{ display: "inline" }} />
                </button>
              </div>
              <button
                className="enroll-button"
                onClick={() => {
                  navigate(`/course-page?id=${sortedDetailCourse?.id}`);
                }}
              >
                Tham gia
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Nội dung khóa học */}
      <div className="course-content">
        <h1>Nội dung khóa học</h1>
        <p>
          {sortedDetailCourse?.Sections?.length} Chương - {sumLecture} bài học -
          Thời lượng {formatTimeText(sumDuration)}
        </p>

        {sortedDetailCourse?.Sections?.map((section) => (
          <div className="section" onClick={() => toggleSection(section.id)}>
            <h3>
              {section.title}
              <span>{expandedSections[section.id] ? "-" : "+"}</span>
            </h3>
            {expandedSections[section.id] && (
              <ul>
                {section?.Lectures?.map((lecture) => (
                  <li>
                    <FontAwesomeIcon icon={faCirclePlay} /> {lecture?.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHome;
