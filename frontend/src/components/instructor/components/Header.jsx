import React from "react";
import { useNavigate } from "react-router-dom";
import HoverProfileInstructor from "./HoverProfileInstructor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  return (
    <div className="header-pc" style={{ display: "block" }}>
      <div className="instructor-header container_header">
        <p onClick={() => navigate("/")}>
          Chuyển sang học viên{" "}
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{ fontSize: "1.2rem" }}
          />
        </p>
        <div className="header-hover">
          <img src={inforUser.avatar ? inforUser.avatar : "/imgs/user.png"} />
          <HoverProfileInstructor right={true} />
        </div>
      </div>
    </div>
  );
};

export default Header;
