import { useEffect, useState } from "react";
import ProgressBar from "../common/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEnrollmentEachUser } from "../../reducers/apiEnrollment";

const MyCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // Default active tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Set the active tab based on click
  };

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    dispatch(fetchEnrollmentEachUser(inforUser.id));
  }, [inforUser.id]);

  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  return (
    <div className="mycourse min-vh-100">
      <header className="mycourse__header" />

      <nav className="mycourse__tabs">
        <ul className="mycourse__tabs-list">
          <li
            className={`mycourse__tab ${
              activeTab === 1 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            Khóa học của tôi
          </li>
          <li
            className={`mycourse__tab ${
              activeTab === 2 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            Mong muốn
          </li>
          <li
            className={`mycourse__tab ${
              activeTab === 3 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Giỏ hàng
          </li>
        </ul>
      </nav>

      <section className="mycourse__content">
        {enrollmentEachUser?.map((enroll) => (
          <div
            className="mycourse__card"
            onClick={() => navigate(`/course-home?id=${enroll.Course.id}`)}
          >
            <img src={enroll.Course.img} className="mycourse__card-img" />
            <div className="mycourse__card-info">
              <h3 className="mycourse__card-title">{enroll.Course.title}</h3>
              <p className="mycourse__card-author">{enroll.Course.User.name}</p>
              <div className="mycourse__progress-bar">
                <div
                  className="mycourse__progress"
                  style={{ width: "14%" }}
                ></div>
              </div>
              <ProgressBar completedLessons={2} totalLessons={4} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyCourse;
