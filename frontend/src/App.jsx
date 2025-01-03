import { Routes, Route, useLocation } from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Footer from "./components/home/components/Footer";
import Header from "./components/home/components/Header";
import Home from "./components/home/Home";
import NotFound from "./components/NotFound";
import CourseHome from "./components/course/CourseHome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyCourse from "./components/mycourses/MyCourse";
import UserProfile from "./components/profile/UserProfile";
import SearchPage from "./components/common/SearchPage";
import CoursePage from "./components/course/CoursePage";
import PaymentPage from "./components/mycourses/components/PaymentPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrollmentEachUser } from "./reducers/apiEnrollment";
import InstructorPage from "./components/instructor/InstructorPage";
import LoginForm from "./components/auth/LoginForm";
import AdminPage from "./components/admin/AdminPage";
import PaymentSuccessPaypalPage from "./components/mycourses/components/PaymentSuccessPaypalPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Access the current location (URL)

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    if (Object.keys(inforUser).length > 0) {
      dispatch(fetchEnrollmentEachUser());
    }
  }, [inforUser]);

  const isInstructorRoute = location.pathname.startsWith("/instructor");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {!isInstructorRoute && !isAdminRoute && <Header />}

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/course-home" element={<CourseHome />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/my-courses" element={<MyCourse />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* xử lý phản hồi của Paypal */}
        <Route path="/payment-success" element={<PaymentSuccessPaypalPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/*" element={<UserProfile />} />
        <Route path="/instructor/*" element={<InstructorPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>

      {!isInstructorRoute && !isAdminRoute && <Footer />}
    </>
  );
}

export default App;
