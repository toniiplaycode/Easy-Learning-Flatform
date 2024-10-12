import { useEffect, useState } from "react";
import ProgressBar from "../common/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEnrollmentEachUser } from "../../reducers/apiEnrollment";
import MyCoursePage from "./components/MyCoursePage";
import MyCartPage from "./components/MyCartPage";
import { fetchCartEachUser } from "../../reducers/apiCart";

const MyCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUrl = window.location.hash;

  const [activeTab, setActiveTab] = useState(getUrl);

  useEffect(() => {
    setActiveTab(getUrl);
  }, [getUrl]);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );
  let cartEachUser = useSelector((state) => state.apiCart.cartEachUser);

  useEffect(() => {
    dispatch(fetchEnrollmentEachUser());
    dispatch(fetchCartEachUser());
  }, [inforUser, cartEachUser]);

  return (
    <div className="mycourse min-vh-100">
      <header className="mycourse__header" />

      <nav className="mycourse__tabs">
        <ul className="mycourse__tabs-list">
          <li
            className={`mycourse__tab ${
              activeTab === "#courses" ? "mycourse__tab--active" : ""
            }`}
            onClick={() => {
              setActiveTab("#courses");
              navigate("#courses");
            }}
          >
            Khóa học của tôi
          </li>
          <li
            className={`mycourse__tab ${
              activeTab === "#cart" ? "mycourse__tab--active" : ""
            }`}
            onClick={() => {
              setActiveTab("#cart");
              navigate("#cart");
            }}
          >
            Giỏ hàng
          </li>
        </ul>
      </nav>

      <section className="mycourse__content">
        {activeTab == "#courses" ? (
          <MyCoursePage enrollmentEachUser={enrollmentEachUser} />
        ) : (
          <MyCartPage cartEachUser={cartEachUser} />
        )}
      </section>
    </div>
  );
};

export default MyCourse;
