import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="instructor-header">
      <p onClick={() => navigate("/")}>Chuyển sang học viên</p>
      <img src="/imgs/profile.png" />
    </div>
  );
};

export default Header;
