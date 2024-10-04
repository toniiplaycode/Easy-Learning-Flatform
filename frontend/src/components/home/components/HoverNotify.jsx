import React from "react";

const HoverNotify = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item">Thông báo của bạn</div>
      </div>
    </>
  );
};

export default HoverNotify;
