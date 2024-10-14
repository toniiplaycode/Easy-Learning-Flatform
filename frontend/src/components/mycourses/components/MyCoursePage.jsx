import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../common/ProgressBar";

const MyCoursePage = ({ enrollmentEachUser }) => {
  const navigate = useNavigate();

  return (
    <>
      {enrollmentEachUser.length > 0 ? (
        enrollmentEachUser?.map((enroll) => {
          let sumLecture = 0;

          enroll?.Course?.Sections?.forEach((section) => {
            sumLecture += section.Lectures.length;
          });

          return (
            <div
              className="mycourse__card"
              onClick={() => navigate(`/course-home?id=${enroll.Course.id}`)}
            >
              <img src={enroll.Course.img} className="mycourse__card-img" />
              <div className="mycourse__card-info">
                <h3 className="mycourse__card-title">{enroll.Course.title}</h3>
                <p className="mycourse__card-author">
                  {enroll.Course.User.name}
                </p>
                <div className="mycourse__progress-bar">
                  <div
                    className="mycourse__progress"
                    style={{ width: "14%" }}
                  ></div>
                </div>
                <ProgressBar completedLessons={0} totalLessons={sumLecture} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="mycourse__empty-container">
          <h3 className="mycourse__empty">Bạn chưa tham gia khóa học nào ! </h3>
          <img className="mycourse__empty-img" src="imgs/emptybox.png" />

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
