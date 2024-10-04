import React from "react";

const HoverCart = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item">Giỏ hàng của bạn</div>
      </div>
    </>
  );
};

export default HoverCart;
