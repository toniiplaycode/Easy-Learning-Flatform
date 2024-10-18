import React, { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDetailCourse } from "../../reducers/apiCourse";
import {
  formatDate,
  formatTime,
  formatTimeText,
  formatUrlYoutube,
} from "../../utils/common";
import ModalTrailer from "./ModalTrailer";
import { saveUrl, toggleTrailer } from "../../reducers/modalTrailer";
import { addCart } from "../../reducers/apiCart";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { IoEnterOutline } from "react-icons/io5";
import parse from "html-react-parser";
import CourseHomeReview from "./CourseHomeReview";

const CourseHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState();

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  useEffect(() => {
    dispatch(fetchDetailCourse(idCourseUrl));
    const checkEnrolled = enrollmentEachUser?.some(
      (item) => item.course_id === Number(idCourseUrl)
    );
  }, [idCourseUrl]);

  const detailCourse = useSelector((state) => state.apiCourse.detailCourse);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  useEffect(() => {
    if (idCourseUrl && enrollmentEachUser) {
      const checkEnrolled = enrollmentEachUser?.some(
        (item) => item.course_id === Number(idCourseUrl)
      );
      setIsEnrolled(checkEnrolled);
    }
  }, [idCourseUrl, enrollmentEachUser]);

  // sort lecture
  const [sortedDetailCourse, setSortedDetailCourse] = useState(null);
  useEffect(() => {
    if (detailCourse && detailCourse.Sections) {
      // Sort the position, lectures inside each section
      const sortedCourse = {
        ...detailCourse,
        Sections: detailCourse.Sections.slice()
          .sort((a, b) => a.position - b.position)
          .map((section) => ({
            ...section,
            Lectures:
              section.Lectures?.slice().sort(
                (a, b) => a.position - b.position
              ) || [], // Sort lectures by position within each section
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
  const toggleTrailerModal = () => {
    dispatch(
      saveUrl(
        formatUrlYoutube(sortedDetailCourse?.Sections[0].Lectures[0].video_url)
      )
    );
    dispatch(toggleTrailer());
  };

  return (
    <div className="course-home min-vh-100">
      <div className="course-header">
        <ModalTrailer />
        <div className="course-title">
          <h1>{sortedDetailCourse?.title}</h1>
          <ul>
            <li>
              {typeof sortedDetailCourse?.description === "string"
                ? parse(sortedDetailCourse.description)
                : sortedDetailCourse?.description || "No description available"}
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
                Khóa học được tạo {formatDate(sortedDetailCourse?.created_at)}{" "}
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
                  toggleTrailerModal();
                }}
              />
              <p>Xem trước khóa học này</p>
            </div>
          </div>
          <div className="course-info">
            <h3>
              {isEnrolled
                ? "Bạn đã tham gia khóa học này"
                : sortedDetailCourse?.price == 0
                ? "Miễn phí"
                : "₫ " + sortedDetailCourse?.price.toLocaleString()}
            </h3>
            <div className="course-info-btn">
              <div>
                <button
                  className="enroll-button not-bg"
                  onClick={() => {
                    if (isEnrolled) {
                      toast.warning("Bạn đã tham gia khóa học này !");
                    } else {
                      dispatch(addCart(detailCourse.id));
                      navigate(`/my-courses#cart`);
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                  <FiShoppingCart />
                </button>
              </div>
              <button
                className="enroll-button"
                onClick={() => {
                  if (!isEnrolled) {
                    toast.error(
                      "Bạn chưa mua khóa học này ! Hãy thêm vào giỏ hàng và thanh toán",
                      {
                        autoClose: 4000,
                      }
                    );
                  } else {
                    navigate(`/course-page?id=${sortedDetailCourse?.id}`);
                  }
                }}
              >
                Tham gia
                <IoEnterOutline />
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
              Chương {section.position}. {section.title}
              <span>{expandedSections[section.id] ? "-" : "+"}</span>
            </h3>
            {expandedSections[section.id] && (
              <ul>
                {section?.Lectures?.map((lecture) => (
                  <li>
                    <FontAwesomeIcon icon={faCirclePlay} color="#007bff" /> Bài{" "}
                    {lecture.position}. {lecture?.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="course-content">
        <h1 style={{ marginTop: "40px" }}>Các đánh giá của học viên</h1>
        <CourseHomeReview
          reviews={detailCourse?.Reviews}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
};

export default CourseHome;
