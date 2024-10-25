import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Courses from "./components/Course/Courses";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInstructor } from "../../reducers/apiCourse";
import Footer from "../home/components/Footer";
import ManageCourse from "./components/Course/ManageCourse";
import CreateUpdateCourse from "./components/Course/CreateUpdateCourse";
import ManageStudent from "./components/Student/ManageStudent";
import ManageCertificate from "./components/Certificate/ManageCertificate";
import ManageCoupon from "./components/Coupon/ManageCoupon";
import ManagePayment from "./components/Payment/ManagePayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { putUpdateUser } from "../../reducers/apiUpdateUser";

const InstructorPage = () => {
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const categories = useSelector((state) => state.apiCategory.categories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id);
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    dispatch(fetchCourseInstructor());
  }, [inforUser]);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="instructor-main-page">
      {inforUser.role == "student" || inforUser.role == "admin" ? (
        <div className="min-vh-100">
          <Header />
          <div className="beinstructor-container">
            {steps == 1 ? (
              <div className="step1">
                <h1 key={steps}>
                  Bạn muốn trở thành giảng viên của EASY LEARNING ?
                </h1>
                <button onClick={() => setSteps(steps + 1)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ) : steps == 2 ? (
              <div className="step2">
                <h1 key={steps}>Bạn dạy về lĩnh vực nào?</h1>
                <select
                  value={selectedCategory}
                  onChange={handleChange}
                  className="category-select"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => setSteps(steps + 1)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ) : (
              <div className="stepfinal">
                <h1 key={steps} className="congratulations-message">
                  Bạn đã là giảng viên của EASY LEARNING !
                </h1>
                <button
                  onClick={() => {
                    dispatch(
                      putUpdateUser({ id: inforUser.id, role: "instructor" })
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-vh-100">
          <Sidebar />
          <div className="instructor-page-right">
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Courses />} />
              <Route path="/create-course" element={<CreateUpdateCourse />} />
              <Route path="/manage-course/*" element={<ManageCourse />} />
              <Route path="/manage-student/*" element={<ManageStudent />} />
              <Route path="/manage-coupon/*" element={<ManageCoupon />} />
              <Route
                path="/manage-certificate/*"
                element={<ManageCertificate />}
              />
              <Route path="/manage-payment/*" element={<ManagePayment />} />
            </Routes>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default InstructorPage;
