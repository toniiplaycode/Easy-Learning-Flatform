import React from "react";
import HeaderPC from "./components/HeaderPC";
import HeaderMobile from "./components/HeaderMobile";

const Header = () => {
  const isLogged = false;

  return (
    <>
      <div className="container_header-top">
        Học các kỹ năng đáp ứng nhu cầu tương lai theo lịch trình của bạn
      </div>
      <HeaderPC isLogged={isLogged} />
      <HeaderMobile />
    </>
  );
};

export default Header;
