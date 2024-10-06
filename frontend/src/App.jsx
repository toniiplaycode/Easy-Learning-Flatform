import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Footer from "./components/home/components/Footer";
import Header from "./components/home/components/Header";
import Home from "./components/home/Home";
import LoginForm from "./components/auth/loginForm";
import NotFound from "./components/NotFound";
import CourseHome from "./components/course/CourseHome";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/courses" element={<CourseHome />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
