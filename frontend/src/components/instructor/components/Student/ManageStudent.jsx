import React from "react";
import { Route, Routes } from "react-router-dom";
import ListCourse from "./ListCourse";
import DetailStudent from "./DetailStudent";

const ManageStudent = () => {
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
