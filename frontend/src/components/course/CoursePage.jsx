import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchDetailCourse } from "../../reducers/apiCourse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatTime, formatUrlYoutube } from "../../utils/common";
import ProgressBar from "../common/ProgressBar";

const CoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  let detailCourse = useSelector((state) => state.apiCourse.detailCourse);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  useEffect(() => {
    // check user enrollment course
    const isEnrolled = enrollmentEachUser?.some(
      (item) => item.course_id === Number(idCourseUrl)
    );
    if (!isEnrolled) {
      navigate(`/course-home?id=${idCourseUrl}`);
    } else {
      dispatch(fetchDetailCourse(idCourseUrl));
    }
  }, [idCourseUrl]);

  const [currentSection, setCurrentSection] = useState();
  const [currentLecture, setCurrentLecture] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const [activeLecture, setActiveLecture] = useState();
  const [sumLectures, setSumLectures] = useState(0);

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

      // calculate total lectures
      let sum = 0;
      sortedCourse.Sections.forEach((section) => {
        sum += section.Lectures.length;
      });
      setSumLectures(sum);

      // Set the initial section, lecture, and video if there is data
      if (sortedCourse.Sections.length > 0) {
        const firstSection = sortedCourse.Sections[0];
        const firstLecture = firstSection.Lectures?.[0];

        setCurrentSection(firstSection);
        setCurrentLecture(firstLecture);
        setExpandedSection(firstSection.id);
        setActiveLecture(firstLecture.id);

        if (firstLecture) {
          setCurrentVideo(formatUrlYoutube(firstLecture.video_url));
        }
      }
    }
  }, [detailCourse]);

  useEffect(() => {
    if (currentLecture)
      setCurrentVideo(formatUrlYoutube(currentLecture.video_url));
  }, [currentLecture]);

  return (
    <div>
      <div className="course-page-header">
        <h3>{sortedDetailCourse?.title}</h3>
        <ProgressBar completedLessons={0} totalLessons={sumLectures} />
      </div>
      <div className="course-page min-vh-100">
        <div className="course-page__left">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${currentVideo}`}
            title="Video Title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="course-page__content">
            <h3>{currentLecture?.title}</h3>
            <p>Cập nhật tháng 10 năm 2024</p>
            <p>{currentLecture?.description}</p>
          </div>
        </div>
        <div className="course-page__right">
          <h3>Nội dung khóa học</h3>
          <ul className="course-sections">
            {sortedDetailCourse?.Sections?.map((section) => {
              //tính tổng thời lượng
              let sumDuration = 0;

              section.Lectures.forEach((lecture) => {
                sumDuration += lecture.duration;
              });

              return (
                <li
                  className={`section ${
                    expandedSection === section.id ? "expanded" : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="section-title">
                    <span>{section.title}</span>
                    {expandedSection == section.id ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )}
                  </div>
                  <div className="section-title">
                    <span className="section-title-child">
                      {section?.Lectures?.length} video |{" "}
                      {formatTime(sumDuration)}
                    </span>
                  </div>
                  {expandedSection === section.id && (
                    <ul className="lectures">
                      {section?.Lectures.map((lecture) => (
                        <li
                          className={`lecture ${
                            lecture.id == activeLecture && "active"
                          }`}
                          onClick={(e) => {
                            setCurrentLecture(lecture);
                            setActiveLecture(lecture.id);
                            e.stopPropagation();
                          }}
                        >
                          {lecture.title}{" "}
                          <p className="lecture-child">
                            {formatTime(lecture.duration)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
