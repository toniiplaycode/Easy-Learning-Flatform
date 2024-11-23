import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../common/ProgressBar";

const MyCoursePage = ({ enrollmentEachUser }) => {
  const navigate = useNavigate();
  const [completionData, setCompletionData] = useState({});

  useEffect(() => {
    const updatedCompletionData = {};
    enrollmentEachUser?.forEach((enroll) => {
      let sumLecture = 0;

      enroll?.Course?.Sections?.forEach((section) => {
        sumLecture += section.Lectures.length;
      });

      if (enroll.progress == 100) {
        updatedCompletionData[enroll.Course.id] = sumLecture;
        return;
      }

      const completedLectures = JSON.parse(
        localStorage.getItem(
          `completedLectures_${enroll.Course.id}_${enroll.user_id}`
        ) || "[]"
      );

      updatedCompletionData[enroll.Course.id] = completedLectures.length;
    });
    setCompletionData(updatedCompletionData);
  }, [enrollmentEachUser]);

  return (
    <>
      {enrollmentEachUser.length > 0 ? (
        enrollmentEachUser?.map((enroll) => {
          let sumLecture = 0;

          enroll?.Course?.Sections?.forEach((section) => {
            sumLecture += section.Lectures.length;
          });

          const completedLessons = completionData[enroll.Course.id] || 0; // Lấy số bài đã hoàn thành

          return (
            <div
              className="mycourse__card"
              onClick={() => navigate(`/course-home?id=${enroll.Course.id}`)}
              key={enroll.Course.id}
            >
              <img src={enroll.Course.img} className="mycourse__card-img" />
              <div className="mycourse__card-info">
                <h3 className="mycourse__card-title">{enroll.Course.title}</h3>
                <p className="mycourse__card-author">
                  Giảng viên{" "}
                  <span style={{ color: "#007bff" }}>
                    {enroll.Course.User.name}
                  </span>
                </p>
                <div className="mycourse__progress-bar">
                  <div
                    className="mycourse__progress"
                    style={{
                      width: `${(completedLessons / sumLecture) * 100}%`,
                    }}
                  ></div>
                </div>
                <ProgressBar
                  completedLessons={completedLessons}
                  totalLessons={sumLecture}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="mycourse__empty-container">
          <h3 className="mycourse__empty">Bạn chưa tham gia khóa học nào ! </h3>
          <img className="mycourse__empty-img" src="/imgs/emptybox.png" />

          <button
            className="mycourse__empty-btn"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Trang chủ
          </button>
        </div>
      )}
    </>
  );
};

export default MyCoursePage;
