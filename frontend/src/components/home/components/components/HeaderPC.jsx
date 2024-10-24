import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import HoverCategory from "./HoverCategory";
import HoverProfile from "./HoverProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchCourse } from "../../../../reducers/search";
import Badge from "@mui/material/Badge";

const HeaderPC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  let cartEachUser = useSelector((state) => state.apiCart.cartEachUser);

  return (
    <div className="header-pc">
      <div className="container_header">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={"/imgs/logo.png"} className="logo" />
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
            <div
              className="header-hover"
              onClick={() => navigate(`/instructor`)}
            >
              Chuyển sang giảng viên
            </div>
            <div
              className="header-hover"
              onClick={() => navigate(`/my-courses#courses`)}
            >
              <Badge badgeContent={enrollmentEachUser?.length} color="primary">
                Khóa học của tôi &nbsp;
              </Badge>
            </div>
            <div className="header-hover">
              <Badge badgeContent={cartEachUser?.length} color="primary">
                <FiShoppingCart
                  size={22}
                  onClick={() => navigate(`/my-courses#cart`)}
                />
                &nbsp;
              </Badge>
            </div>
            <div className="header_your-profile">
              <div className="header-hover">
                <img
                  src="/imgs/user.png"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderPC;
