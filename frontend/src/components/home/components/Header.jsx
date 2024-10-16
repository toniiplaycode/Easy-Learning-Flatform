import React from "react";
import HeaderPC from "./components/HeaderPC";
import HeaderMobile from "./components/HeaderMobile";

const Header = () => {
  return (
    <div className="header-sticky sticky-top">
      <div className="container_header-top">
        Khám phá tri thức và khai sáng tương lai với nhiều khóa học chất lượng
      </div>
      <HeaderPC />
      <HeaderMobile />
    </div>
  );
};

export default Header;
