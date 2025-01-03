import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import InforUser from "./InforUser";
import CertificateUser from "./CertificateUser";
import CetificateDetail from "./CetificateDetail";
import ViewProfile from "./ViewProfile";
import { useState } from "react";
import MyCoupon from "./MyCoupon";

const UserProfile = () => {
  const navigate = useNavigate();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const location = useLocation();
  const getUrl = location.pathname;

  const [isView, setIsView] = useState(location.state?.isViewProfile || false);

  return (
    <div className="profile-page min-vh-100">
      <div className="profile-header">
        <img
          src="/imgs/bannerProfile.png"
          alt="Profile Background"
          className="profile-header-img d-none d-md-block"
        />

        <img
          src="/imgs/bannerProfileMobile.png"
          alt="Profile Background"
          className="profile-header-img d-block d-md-none"
        />

        {!isView && (
          <>
            <div className="profile-avatar">
              <img
                src={inforUser.avatar ? inforUser.avatar : "/imgs/user.png"}
                alt="Profile Avatar"
                className="avatar-img"
              />
            </div>
            <p className="profile-name">{inforUser.name}</p>
          </>
        )}
      </div>

      <div className="profile-navbar">
        {!isView ? (
          <>
            <span
              onClick={() => navigate("/profile")}
              className={getUrl == "/profile" && "active"}
            >
              Tài khoản và khóa học{" "}
            </span>

            <span
              onClick={() => navigate("/profile/mycoupon")}
              className={getUrl == "/profile/mycoupon" && "active"}
            >
              Mã giảm giá của tôi{" "}
            </span>

            <span
              onClick={() => navigate("/profile/certificate")}
              className={getUrl == "/profile/certificate" && "active"}
            >
              Các chứng chỉ{" "}
            </span>
          </>
        ) : (
          <ViewProfile />
        )}
      </div>

      {!isView && (
        <Routes>
          <Route path="/" element={<InforUser />} />
          <Route path="/certificate" element={<CertificateUser />} />
          <Route path="/mycoupon" element={<MyCoupon />} />
          <Route
            path="/certificate/detail-certificate"
            element={<CetificateDetail />}
          />
        </Routes>
      )}
    </div>
  );
};

export default UserProfile;
