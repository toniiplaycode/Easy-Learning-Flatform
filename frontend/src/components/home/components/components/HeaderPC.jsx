import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { PiBellRinging } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import HoverCategory from "./HoverCategory";
import HoverCourse from "./HoverCourse";
import HoverWishlist from "./HoverWishlist";
import HoverCart from "./HoverCart";
import HoverNotify from "./HoverNotify";
import HoverProfile from "./HoverProfile";
import { useNavigate } from "react-router-dom";

const HeaderPC = ({ isLogged }) => {
  const navigate = useNavigate();

  return (
    <div className="header-pc">
      <div className="container_header">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={"imgs/logo.png"} className="logo" />
        </div>
        <div className="header-hover">
          Thể loại
          <HoverCategory right={false} />
        </div>
        <div class="header_search">
          <input type="text" placeholder="Tìm kiếm nội dung bất kỳ" />
          <span class="search-icon">
            <IoSearchOutline size={22} />
          </span>
        </div>
        {isLogged ? (
          <>
            <div className="header-hover">Giảng viên</div>
            <div className="header-hover">
              Học tập
              <HoverCourse right={true} />
            </div>
            <div className="header-hover">
              <IoMdHeartEmpty size={22} />
              <HoverWishlist right={true} />
            </div>
            <div className="header-hover">
              <FiShoppingCart size={22} />
              <HoverCart right={true} />
            </div>
            <div className="header-hover">
              <PiBellRinging size={22} />
              <HoverNotify right={true} />
            </div>
            <div className="header_your-profile">
              <div className="header-hover">
                <img src="imgs/profile.png" />
                <HoverProfile right={true} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="header-hover">Giảng dạy trên easy learning</div>
            <div className="header_button-container">
              <button
                class="btn btn-outline"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <button
                class="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Đăng ký
              </button>
              <button class="btn btn-icon">
                <TbWorld size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderPC;
