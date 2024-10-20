import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ListCourse from "./ListCourse";
import DetailStudent from "./DetailStudent";

const ManageStudent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="manage-container">
        <Routes>
          <Route path="/" element={<ListCourse />} />
          <Route path="/detail-student" element={<DetailStudent />} />
        </Routes>
      </div>
    </>
  );
};

export default ManageStudent;
