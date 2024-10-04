import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { PiBellRinging } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import HoverCategory from "./components/HoverCategory";
import HoverCourse from "./components/HoverCourse";
import HoverWishlist from "./components/HoverWishlist";
import HoverCart from "./components/HoverCart";
import HoverNotify from "./components/HoverNotify";
import HoverProfile from "./components/HoverProfile";

const Header = () => {
  const isLogged = true;

  return (
    <>
      <div className="container_header-top">
        Học các kỹ năng đáp ứng nhu cầu tương lai theo lịch trình của bạn
      </div>
      <div className="header-pc">
        <div className="container_header">
          <div>
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
                <button class="btn btn-outline">Đăng nhập</button>
                <button class="btn btn-primary">Đăng ký</button>
                <button class="btn btn-icon">
                  <TbWorld size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        {isLogged && (
          <div className="container_header-category">
            <div class="header-category-item">Phát triển</div>
            <div class="header-category-item">Kinh doanh</div>
            <div class="header-category-item">Tài chính & Kế toán</div>
            <div class="header-category-item">CNTT & Phần mềm</div>
            <div class="header-category-item">Năng suất văn phòng</div>
            <div class="header-category-item">Phát triển cá nhân</div>
            <div class="header-category-item">Thiết kế</div>
            <div class="header-category-item">Marketing</div>
            <div class="header-category-item">Sức khỏe & Thể dục</div>
            <div class="header-category-item">Âm nhạc</div>
          </div>
        )}
      </div>
      <div className="header-mobile">
        <div class="menu-icon">
          <IoMenu size={24} />
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
    </>
  );
};

export default Header;
