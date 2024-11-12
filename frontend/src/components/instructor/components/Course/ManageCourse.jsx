import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateUpdateCourse from "./CreateUpdateCourse";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SectionCourse from "./SectionCourse";
import SidebarManageCourse from "./SidebarManageCourse";
import LectureCourse from "./LectureCourse";

const ManageCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const detailCourse = location.state?.course;

  return (
    <>
      {/* <button
        className="manage-btn-back"
        onClick={() => navigate("/instructor")}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button> */}

      <div className="manage-container">
        <SidebarManageCourse detailCourse={detailCourse} />
        <Routes>
          <Route
            path="/"
            element={<CreateUpdateCourse detailCourse={detailCourse} />}
          />
          <Route path="/section-course" element={<SectionCourse />} />
          <Route path="/lecture-course" element={<LectureCourse />} />
        </Routes>
      </div>
    </>
  );
};

export default ManageCourse;
