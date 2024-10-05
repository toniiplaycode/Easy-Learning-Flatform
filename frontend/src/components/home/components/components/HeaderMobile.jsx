import React from "react";
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import Drawer from "./Drawer";

const HeaderMobile = () => {
  return (
    <div className="header-mobile">
      <div class="menu-icon">
        <Drawer />
      </div>

      <div class="logo">
        <img src={"imgs/logo.png"} className="logo" />
      </div>

      <div
        class="header-icons"
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <FiSearch size={24} />
        <FiShoppingCart size={24} />
      </div>
    </div>
  );
};

export default HeaderMobile;
