import React, { useEffect } from "react";
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

const InstructorPage = () => {
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    dispatch(fetchCourseInstructor());
  }, [inforUser]);

  return (
    <div className="instructor-main-page">
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
      <Footer />
    </div>
  );
};

export default InstructorPage;
