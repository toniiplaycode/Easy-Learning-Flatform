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

  console.log(certificateEachUser);

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
          <div>Chưa có chứng chỉ nào !</div>
        )}
      </div>
    </div>
  );
};

export default CertificateUser;