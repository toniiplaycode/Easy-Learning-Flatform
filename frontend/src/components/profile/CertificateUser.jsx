import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCertificateEachUser } from "../../reducers/apiCertificate";

const CertificateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    dispatch(fetchCertificateEachUser(inforUser.id));
  }, [inforUser]);

  let certificateEachUser = useSelector(
    (state) => state.apiCertificate.certificateEachUser
  );

  return (
    <div className="profile-courses-certificate">
      <div className="courses-list">
        {certificateEachUser?.length > 0 ? (
          certificateEachUser?.map((certificate) => (
            <div
              className="course-item"
              onClick={() => navigate(`/course-home?id=${enroll.Course.id}`)}
            >
              <img
                src={certificate.Course.img}
                alt="React Course"
                className="course-img"
              />
              <div className="course-info">
                <h3>{certificate.Course.title}</h3>
                <button
                  onClick={() =>
                    navigate("/profile/certificate/detail-certificate", {
                      state: {
                        id: certificate.id,
                      },
                    })
                  }
                >
                  Xem chứng chỉ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="mycourse__empty-container">
            <h3 className="mycourse__empty">Chưa có chứng chỉ nào ! </h3>
            <img className="mycourse__empty-img" src="/imgs/emptybox.png" />

            <button
              className="mycourse__empty-btn"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateUser;
