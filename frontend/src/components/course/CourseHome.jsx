import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDetailCourse } from "../../reducers/apiCourse";
import {
  formatDate,
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
import { addEnrollmentEachUser } from "../../reducers/apiEnrollment";

const CourseHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const detailCourse = useSelector((state) => state.apiCourse.detailCourse);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  useEffect(() => {
    dispatch(fetchDetailCourse(idCourseUrl));
  }, [idCourseUrl]);

  useEffect(() => {
    if (idCourseUrl && enrollmentEachUser) {
      const checkEnrolled = enrollmentEachUser?.some(
        (item) => item.course_id === Number(idCourseUrl)
      );
      setIsEnrolled(checkEnrolled);
    }
  }, [idCourseUrl, enrollmentEachUser]);

  // Sắp xếp bài giảng
  const [sortedDetailCourse, setSortedDetailCourse] = useState(null);
  useEffect(() => {
    if (detailCourse && detailCourse.Sections) {
      const sortedCourse = {
        ...detailCourse,
        Sections: detailCourse.Sections.slice()
          .sort((a, b) => a.position - b.position)
          .map((section) => ({
            ...section,
            Lectures:
              section.Lectures?.slice().sort(
                (a, b) => a.position - b.position
              ) || [],
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

  // Tính số review trung bình
  let avgRating = 0;
  let totalReviews = sortedDetailCourse?.Reviews?.length || 0;

  if (totalReviews > 0) {
    sortedDetailCourse.Reviews.forEach((review) => {
      avgRating += review.rating;
    });
    avgRating = (avgRating / totalReviews).toFixed(1);
  }

  // Tính tổng số bài giảng
  let sumLecture = 0;
  let totalLectures = sortedDetailCourse?.Sections?.length || 0;

  if (totalLectures > 0) {
    sortedDetailCourse.Sections.forEach((section) => {
      section.Lectures.forEach(() => {
        sumLecture++;
      });
    });
  }

  // Tính tổng thời lượng
  let sumDuration = 0;
  if (totalLectures > 0) {
    sortedDetailCourse.Sections.forEach((section) => {
      section.Lectures.forEach((lecture) => {
        sumDuration += lecture.duration;
      });
    });
  }

  // Toggle trailer
  const toggleTrailerModal = () => {
    dispatch(
      saveUrl(
        formatUrlYoutube(
          sortedDetailCourse?.Sections[0]?.Lectures[0]?.video_url
        )
      )
    );
    dispatch(toggleTrailer());
  };

  // Tham gia khóa học miễn phí
  const addEnrollmentCourseFree = () => {
    if (Object.keys(inforUser).length === 0) {
      navigate(`/login`);
      return;
    }
    dispatch(addEnrollmentEachUser([sortedDetailCourse?.id])).then(() => {
      navigate(`/course-page?id=${sortedDetailCourse?.id}`);
    });
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
              <p className="highlight-label">Lựa chọn tốt nhất</p>
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
              <p>({totalReviews} đánh giá)</p>
            </div>
            <p>
              Được tạo bởi{" "}
              <a
                href="#"
                onClick={() =>
                  navigate(
                    `/profile?construtor_id=${sortedDetailCourse?.User?.id}`,
                    {
                      state: { isViewProfile: true },
                    }
                  )
                }
              >
                {sortedDetailCourse?.User?.name}
              </a>
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
                onClick={toggleTrailerModal}
              />
              <p>Xem trước khóa học này</p>
            </div>
          </div>
          <div className="course-info">
            <h3>
              {isEnrolled
                ? "Bạn đã tham gia khóa học này"
                : sortedDetailCourse?.price === 0
                ? "Miễn phí"
                : "₫ " + sortedDetailCourse?.price.toLocaleString()}
            </h3>
            <div className="course-info-btn">
              {sortedDetailCourse?.price > 0 && !isEnrolled && (
                <button
                  className="enroll-button not-bg"
                  onClick={() => {
                    if (Object.keys(inforUser).length === 0) {
                      navigate(`/login`);
                      return;
                    }
                    dispatch(addCart(detailCourse.id));
                    navigate(`/my-courses#cart`);
                  }}
                >
                  Thêm vào giỏ hàng
                  <FiShoppingCart />
                </button>
              )}
              <button
                className="enroll-button"
                onClick={() => {
                  if (isEnrolled || sortedDetailCourse?.price === 0) {
                    addEnrollmentCourseFree();
                  } else {
                    toast.error(
                      "Bạn chưa mua khóa học này! Hãy thêm vào giỏ hàng và thanh toán",
                      {
                        autoClose: 4000,
                      }
                    );
                  }
                }}
              >
                {!isEnrolled && sortedDetailCourse?.price === 0
                  ? "Tham gia miễn phí"
                  : !isEnrolled && sortedDetailCourse?.price !== 0
                  ? "Tham gia"
                  : ""}
                {isEnrolled && "Xem khóa học"}
                <IoEnterOutline />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="course-content">
        <h1>Nội dung khóa học</h1>
        <p>
          {sortedDetailCourse?.Sections?.length} Chương - {sumLecture} bài học -{" "}
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
