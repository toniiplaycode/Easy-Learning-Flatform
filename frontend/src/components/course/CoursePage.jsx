import {
  faAngleDown,
  faAngleUp,
  faCertificate,
  faCheckCircle,
  faLock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { fetchDetailCourse } from "../../reducers/apiCourse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatTime, formatUrlYoutube } from "../../utils/common";
import ProgressBar from "../common/ProgressBar";
import { updateEnrollmentCompletedProgress } from "../../reducers/apiEnrollment";
import {
  addCertificate,
  fetchCertificateEachUser,
} from "../../reducers/apiCertificate";

const CoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [currentSection, setCurrentSection] = useState();
  const [currentLecture, setCurrentLecture] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const [activeLecture, setActiveLecture] = useState();
  const [sumLectures, setSumLectures] = useState(0);
  const [sortedDetailCourse, setSortedDetailCourse] = useState(null);
  const [enrollmentCurrent, setEnrollmentCurrent] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  useEffect(() => {
    // Kiểm tra quyền truy cập
    const isEnrolled = enrollmentEachUser?.some(
      (item) => item.course_id === Number(idCourseUrl)
    );

    const enrollment = enrollmentEachUser?.find(
      (item) => item.course_id === Number(idCourseUrl)
    );

    setEnrollmentCurrent(enrollment);

    if (!isEnrolled) {
      navigate(`/course-home?id=${idCourseUrl}`);
    } else {
      dispatch(fetchDetailCourse(idCourseUrl));
    }
  }, [idCourseUrl]);

  let detailCourse = useSelector((state) => state.apiCourse.detailCourse);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  let certificateEachUser = useSelector(
    (state) => state.apiCertificate.certificateEachUser
  );

  useEffect(() => {
    dispatch(fetchCertificateEachUser(inforUser.id));
  }, certificateEachUser);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Load trạng thái từ localStorage theo user_id
  useEffect(() => {
    const savedCompletedLectures = localStorage.getItem(
      `completedLectures_${idCourseUrl}_${inforUser.id}`
    );
    if (savedCompletedLectures) {
      setCompletedLectures(JSON.parse(savedCompletedLectures));
    }
  }, [idCourseUrl, inforUser.id]);

  // Lưu trạng thái vào localStorage theo user_id
  useEffect(() => {
    if (completedLectures.length > 0) {
      localStorage.setItem(
        `completedLectures_${idCourseUrl}_${inforUser.id}`,
        JSON.stringify(completedLectures)
      );
    }

    // Nếu đã hoàn thành tất cả bài giảng, cập nhật progress lên 100%
    if (
      completedLectures.length === sumLectures &&
      sumLectures > 0 &&
      enrollmentCurrent?.progress != 100
    ) {
      dispatch(
        updateEnrollmentCompletedProgress({
          enrollmentId: enrollmentCurrent.id,
        })
      );

      handleAddCertificate();
    }
  }, [completedLectures, sumLectures, dispatch, idCourseUrl, inforUser.id]);

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

      let sum = 0;
      sortedCourse.Sections.forEach((section) => {
        sum += section.Lectures.length;
      });
      setSumLectures(sum);

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
    if (currentLecture) {
      setCurrentVideo(formatUrlYoutube(currentLecture.video_url));
    }
  }, [currentLecture]);

  // Tạo player YouTube và lắng nghe sự kiện
  useEffect(() => {
    if (currentVideo && window.YT) {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: currentVideo,
        events: {
          onReady: (event) => {
            console.log("Player is ready!");
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (
                currentLecture &&
                !completedLectures.includes(currentLecture.id)
              ) {
                setCompletedLectures((prev) => {
                  if (!prev.includes(currentLecture.id)) {
                    return [...prev, currentLecture.id];
                  }
                  return prev;
                });
              }
            }
          },
        },
      });
    }
  }, [currentVideo]);

  const handleAddCertificate = async () => {
    if (!inforUser?.id || !idCourseUrl) return;

    const newCertificate = {
      user_id: inforUser.id,
      course_id: Number(idCourseUrl),
    };

    dispatch(addCertificate(newCertificate));
  };

  return (
    <div>
      <div className="course-page-header">
        <h3>{sortedDetailCourse?.title}</h3>
        <ProgressBar
          completedLessons={
            enrollmentCurrent?.progress == 100
              ? sumLectures
              : completedLectures.length
          }
          totalLessons={sumLectures}
        />
      </div>
      <div className="course-page min-vh-100">
        <div className="course-page__left">
          <div
            id="youtube-player"
            style={{ width: "100%", height: "650px" }}
          ></div>
          <div className="course-page__content">
            <h3>{currentLecture?.title}</h3>
            <p className="content-description">{currentLecture?.description}</p>
          </div>
        </div>
        <div className="course-page__right">
          <h3>Nội dung khóa học</h3>
          <ul className="course-sections">
            {sortedDetailCourse?.Sections?.map((section) => {
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
                  key={section.id}
                >
                  <div className="section-title">
                    <span>
                      Chương {section.position}. {section.title}
                    </span>
                    {expandedSection === section.id ? (
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
                      {section?.Lectures.map((lecture, index) => {
                        // Tìm bài giảng cuối cùng của chương trước (nếu có)
                        const previousLecture =
                          index > 0
                            ? section.Lectures[index - 1]
                            : sortedDetailCourse.Sections[
                                sortedDetailCourse.Sections.findIndex(
                                  (s) => s.id === section.id
                                ) - 1
                              ]?.Lectures?.slice(-1)[0];

                        // Kiểm tra trạng thái mở khóa
                        const isUnlocked =
                          enrollmentCurrent?.progress == 100 || // Nếu progress = 100, mở khóa tất cả
                          completedLectures.includes(lecture.id) || // Đã hoàn thành
                          lecture.id === currentLecture?.id || // Đang được xem
                          (previousLecture &&
                            completedLectures.includes(previousLecture.id)); // Bài trước đó đã hoàn thành

                        return (
                          <li
                            className={`lecture ${
                              lecture.id === activeLecture && "active"
                            } ${isUnlocked ? "" : "locked"}`}
                            onClick={(e) => {
                              if (isUnlocked) {
                                setCurrentLecture(lecture);
                                setActiveLecture(lecture.id);
                                setCurrentVideo(
                                  formatUrlYoutube(lecture.video_url)
                                );
                              }
                              e.stopPropagation();
                            }}
                            key={lecture.id}
                          >
                            {enrollmentCurrent?.progress == 100 ? (
                              // Nếu toàn bộ khóa học đã hoàn thành, hiển thị faCheckCircle màu xanh lá
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{ color: "green" }}
                              />
                            ) : completedLectures.includes(lecture.id) ? (
                              // Nếu bài đã hoàn thành, hiển thị faCheckCircle màu xanh lá
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{ color: "green" }}
                              />
                            ) : isUnlocked ? (
                              // Nếu bài được mở khóa nhưng chưa hoàn thành, hiển thị faCheckCircle màu xám
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{ color: "gray" }}
                              />
                            ) : (
                              // Nếu bài bị khóa, hiển thị faLock
                              <FontAwesomeIcon
                                icon={faLock}
                                style={{ color: "gray" }}
                              />
                            )}
                            &nbsp; &nbsp;
                            <span>
                              Bài {lecture.position}. {lecture.title}
                            </span>
                            <p className="lecture-child">
                              {formatTime(lecture.duration)}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Hiện nút "Xem chứng chỉ" chỉ khi khóa học có chứng chỉ */}
          {certificateEachUser.some(
            (cert) => cert.course_id === Number(idCourseUrl)
          ) && (
            <button
              className="btn-common"
              onClick={() => {
                const currentCertificate = certificateEachUser.find(
                  (cert) => cert.course_id == Number(idCourseUrl)
                );

                if (currentCertificate) {
                  navigate("/profile/certificate/detail-certificate", {
                    state: {
                      id: currentCertificate.id, // Pass the certificate ID dynamically
                    },
                  });
                } else {
                  toast.error("No certificate available for this course.");
                }
              }}
            >
              <FontAwesomeIcon icon={faCertificate} /> &nbsp; Xem chứng chỉ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
