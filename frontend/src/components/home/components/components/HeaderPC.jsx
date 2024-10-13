import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import HoverCategory from "./HoverCategory";
import HoverCourse from "./HoverCourse";
import HoverCart from "./HoverCart";
import HoverProfile from "./HoverProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchCourse } from "../../../../reducers/search";

const HeaderPC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

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
          <input
            type="text"
            placeholder="Tìm kiếm nội dung bất kỳ"
            onChange={(e) => {
              navigate("/search");
              dispatch(searchCourse(e.target.value));
            }}
          />
          <span class="search-icon">
            <IoSearchOutline size={22} />
          </span>
        </div>
        {Object.keys(inforUser).length > 0 ? (
          <>
            <div className="header-hover">Giảng viên</div>
            <div
              className="header-hover"
              onClick={() => navigate(`/my-courses#courses`)}
            >
              Khóa học của tôi <HoverCourse right={true} />
            </div>
            <div className="header-hover">
              <FiShoppingCart
                size={22}
                onClick={() => navigate(`/my-courses#cart`)}
              />
              <HoverCart right={true} />
            </div>
            <div className="header_your-profile">
              <div className="header-hover">
                <img
                  src="imgs/profile.png"
                  onClick={() => navigate("/profile")}
                />
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
