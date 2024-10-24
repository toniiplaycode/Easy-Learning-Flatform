import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Drawer from "./Drawer";
import { useNavigate } from "react-router-dom";
import { searchCourse } from "../../../../reducers/search";
import { useDispatch } from "react-redux";

const HeaderMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="header-mobile">
      <div class="menu-icon">
        <Drawer />
      </div>

      {isSearch ? (
        <div style={{ position: "relative" }}>
          <IoIosCloseCircleOutline
            size={26}
            style={{ position: "absolute", right: "6px", top: "6px" }}
            onClick={() => setIsSearch(false)}
          />
          <input
            type="text"
            className="form-control headermobile-search"
            placeholder="Tìm kiếm..."
            onChange={(e) => {
              navigate("/search");
              dispatch(searchCourse(e.target.value));
            }}
          />
        </div>
      ) : (
        <div class="logo" onClick={() => navigate("/")}>
          <img src={"/imgs/logo.png"} className="logo" />
        </div>
      )}

      <div
        class="header-icons"
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <FiSearch size={24} onClick={() => setIsSearch(!isSearch)} />
      </div>
    </div>
  );
};

export default HeaderMobile;
