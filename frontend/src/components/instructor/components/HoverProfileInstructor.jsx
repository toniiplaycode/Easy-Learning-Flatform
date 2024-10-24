import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../reducers/apiLoginLogout";

const HoverProfileInstructor = ({ right }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item" onClick={() => navigate("/profile")}>
          Hồ sơ của bạn
        </div>
        <div
          className="header-hover-item"
          onClick={() => {
            navigate("/");
            dispatch(handleLogout());
          }}
        >
          Đăng xuất
        </div>
      </div>
    </>
  );
};

export default HoverProfileInstructor;
