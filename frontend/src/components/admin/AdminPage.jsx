import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginAdmin from "./LoginAdmin";
import AdminHome from "./AdminHome";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrollmentEachUser } from "../../reducers/apiEnrollment";

const AdminPage = () => {
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    if (Object.keys(inforUser).length > 0) {
      dispatch(fetchEnrollmentEachUser());
    }
  }, [inforUser, dispatch]);

  return (
    <>
      <Routes>
        {inforUser?.role == "admin" ? (
          <Route path="/" element={<AdminHome />} />
        ) : (
          <Route path="/" element={<LoginAdmin />} />
        )}
      </Routes>
    </>
  );
};

export default AdminPage;
