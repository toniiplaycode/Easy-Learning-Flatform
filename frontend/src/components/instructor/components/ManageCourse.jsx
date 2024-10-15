import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateUpdateCourse from "./components/CreateUpdateCourse";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SectionCourse from "./components/SectionCourse";
import SidebarManageCourse from "./components/SidebarManageCourse";

const ManageCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const detailCourse = location.state?.course;

  return (
    <>
      <button
        className="create-course-btn-back"
        onClick={() => navigate("/instructor")}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>

      <div className="manage-course-container">
        <SidebarManageCourse detailCourse={detailCourse} />
        <Routes>
          <Route
            path="/"
            element={<CreateUpdateCourse detailCourse={detailCourse} />}
          />
          <Route path="/section-course" element={<SectionCourse />} />
        </Routes>
      </div>
    </>
  );
};

export default ManageCourse;
