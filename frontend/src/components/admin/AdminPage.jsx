import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginAdmin from "./LoginAdmin";

const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
      </Routes>
    </>
  );
};

export default AdminPage;
