import React from "react";

const HoverProfile = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item">hồ sơ của bạn</div>
      </div>
    </>
  );
};

export default HoverProfile;
