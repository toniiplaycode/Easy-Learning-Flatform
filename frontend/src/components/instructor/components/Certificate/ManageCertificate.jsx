import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCertificate,
  fetchCertificateAllCourse,
} from "../../../../reducers/apiCertificate";
import { formatDate } from "../../../../utils/common";
import Certificate from "./Certificate";
import DeleteConfirm from "../DeleteConfirm";

const ManageCertificate = () => {
  const targetElementRef = useRef(null);
  const dispatch = useDispatch();
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const certificateAllCourse = useSelector(
    (state) => state.apiCertificate.certificateAllCourse
  );

  const [idCertificateView, setIdCertificateView] = useState(null);

  useEffect(() => {
    const instructor_id = inforUser.id;
    dispatch(fetchCertificateAllCourse(instructor_id));
  }, [inforUser]);

  return (
    <div className="mange-list-page-container">
      <h3 ref={targetElementRef}>Cấp chứng chỉ cho học viên</h3>
      <Certificate idCertificateView={idCertificateView} />

      <h5>Các chứng chỉ đã cấp</h5>
      <div className="mange-list">
        <div className="header">
          <div className="header-item">Gmail</div>
          <div className="header-item">Học viên</div>
          <div className="header-item">Khóa học</div>
          <div className="header-item">Ngày cấp</div>
          <div className="header-item"></div>
        </div>

        {certificateAllCourse?.length > 0 ? (
          certificateAllCourse?.map((certificate) => (
            <div className="mange-item" key={certificate.id}>
              <div className="item">{certificate.User.email}</div>
              <div className="item">{certificate.User.name}</div>
              <div className="item">{certificate.Course.title}</div>
              <div className="item">{formatDate(certificate.created_at)}</div>
              <div className="item">
                <button
                  onClick={() => {
                    targetElementRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIdCertificateView(certificate.id);
                  }}
                >
                  Xem
                </button>
                <DeleteConfirm
                  delete_certificate={{
                    id: certificate.id,
                    instructor_id: inforUser.id,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div>Chưa có học viên nào đạt được chứng chỉ !</div>
        )}
      </div>
    </div>
  );
};

export default ManageCertificate;