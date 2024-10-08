import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Footer from "./components/home/components/Footer";
import Header from "./components/home/components/Header";
import Home from "./components/home/Home";
import LoginForm from "./components/auth/loginForm";
import NotFound from "./components/NotFound";
import CourseHome from "./components/course/CourseHome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyCourse from "./components/mycourses/MyCourse";
import UserProfile from "./components/profile/UserProfile";
import SearchPage from "./components/common/SearchPage";
import CoursePage from "./components/course/CoursePage";

function App() {
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

      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/course-home" element={<CourseHome />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/my-courses" element={<MyCourse />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
