import React from "react";

const HoverWishlist = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item">Khóa học bạn đã thich</div>
      </div>
    </>
  );
};

export default HoverWishlist;
