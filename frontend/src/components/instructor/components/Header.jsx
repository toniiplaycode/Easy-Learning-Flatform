import React from "react";
import { useNavigate } from "react-router-dom";
import HoverProfileInstructor from "./HoverProfileInstructor";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-pc">
      <div className="instructor-header container_header">
        <p onClick={() => navigate("/")}>Chuyển sang học viên</p>
        <div className="header-hover">
          <img src="/imgs/user.png" />
          <HoverProfileInstructor right={true} />
        </div>
      </div>
    </div>
  );
};

export default Header;
