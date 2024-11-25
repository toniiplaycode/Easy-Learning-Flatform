import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import AdminUser from "./AdminUser";
import AdminPayment from "./AdminPayment";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getUrl = location.pathname;

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  return (
    <>
      <div className="header-pc">
        <div className="instructor-header container_header admin">
          <div className="navigate">
            <span
              className={getUrl == "/admin" && "active"}
              onClick={() => navigate("")}
            >
              Quản lý tài khoản
            </span>
            <span
              className={getUrl == "/admin/payment" && "active"}
              onClick={() => navigate("payment")}
            >
              Quản lý phương thức thanh toán
            </span>
          </div>
          <div>
            <p onClick={() => navigate("/")}>Về trang chủ</p>
            <div className="header-hover">
              <img
                src={inforUser.avatar ? inforUser.avatar : "/imgs/user.png"}
              />
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<AdminUser />} />
        <Route path="/payment" element={<AdminPayment />} />
      </Routes>
    </>
  );
};

export default AdminHome;
