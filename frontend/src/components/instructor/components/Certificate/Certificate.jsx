import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import { fetchEnrollmentAllCourse } from "../../../../reducers/apiEnrollment";
import {
  addCertificate,
  FetchdetailCertificate,
} from "../../../../reducers/apiCertificate";
import { formatDate } from "../../../../utils/common";

const Certificate = ({ idCertificateView, isViewUserSide }) => {
  const dispatch = useDispatch();
  const certificateRef = useRef(null); // Reference for download
  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const enrollmentAllCourse = useSelector(
    (state) => state.apiEnrollment.enrollmentAllCourse
  );

  let detailCertificate = useSelector(
    (state) => state.apiCertificate.detailCertificate
  );

  useEffect(() => {
    if (idCertificateView) {
      dispatch(FetchdetailCertificate(idCertificateView));
    }
  }, [dispatch, idCertificateView]);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [userId, setUserId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (Object.keys(detailCertificate).length > 0) {
      setIsView(true);
    }
  }, [detailCertificate]);

  useEffect(() => {
    const instructor_id = inforUser.id;
    dispatch(fetchEnrollmentAllCourse(instructor_id));
  }, [inforUser]);

  const handleSelectionChange = (e) => {
    const selectedId = e.target.value;
    const selected = enrollmentAllCourse.find(
      (enrollment) => enrollment.id === parseInt(selectedId)
    );
    setSelectedEnrollment(selected);
    setUserId(selected.User.id);
    setCourseId(selected.Course.id);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAddCertificate = async () => {
    if (!userId || !courseId) return;

    const newCertificate = {
      instructor_id: inforUser.id,
      user_id: userId,
      course_id: courseId,
    };

    dispatch(addCertificate(newCertificate));
    setSelectedEnrollment(null);
  };

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div
      className="certificate-container"
      ref={certificateRef}
      style={isViewUserSide && { marginTop: "60px" }}
    >
      <div className="certificate-content">
        <div className="certificate-header">
          <h1>CERTIFICATE</h1>
          <p>OF APPRECIATION</p>
          <img src="/imgs/badge.png" alt="Badge" />
        </div>

        <div className="certificate-body">
          <p className="present-text">THIS CERTIFICATE IS PRESENTED TO</p>

          {(Object.keys(detailCertificate).length === 0 ||
            isView === false) && (
            <div className="certificate-container-add">
              <select
                className="styled-select"
                onChange={handleSelectionChange}
                value={selectedEnrollment?.id || ""}
              >
                <option value="" disabled>
                  Chọn học viên và khóa học
                </option>
                {enrollmentAllCourse?.map((enrollment) => (
                  <option key={enrollment.id} value={enrollment.id}>
                    {enrollment.User.email} - {enrollment.User.name} -{" "}
                    {enrollment.Course.title}
                  </option>
                ))}
              </select>
              <button onClick={handleAddCertificate}>Cấp</button>
            </div>
          )}

          {Object.keys(detailCertificate).length > 0 && isView ? (
            <>
              <h2 className="recipient-name">{detailCertificate.User.name}</h2>
              <p>Has successfully completed the course</p>
              <p className="certificate-description">
                {detailCertificate.Course.title}
              </p>
            </>
          ) : (
            selectedEnrollment && (
              <>
                <h2 className="recipient-name">
                  {selectedEnrollment.User.name}
                </h2>
                <p>Has successfully completed the course</p>
                <p className="certificate-description">
                  {selectedEnrollment.Course.title}
                </p>
              </>
            )
          )}
        </div>

        <div className="certificate-footer">
          <div>
            <img src="/imgs/logo.png" alt="Logo" />
          </div>
          <div>
            <img
              src="/imgs/badge1.png"
              style={{ width: "200px" }}
              alt="Badge 1"
            />
          </div>
          <div className="signatures">
            <p>
              Can Tho,{" "}
              {isView
                ? formatDate(detailCertificate.created_at)
                : getCurrentDate()}
            </p>
          </div>
        </div>
      </div>

      {isView && isViewUserSide && (
        <button
          className="btn-download-certificate"
          onClick={handleDownloadCertificate}
        >
          Tải xuống chứng chỉ
        </button>
      )}

      {isView && !isViewUserSide && (
        <button
          className="btn-add-certificate"
          onClick={() => {
            setIsView(false);
          }}
        >
          Cấp thêm chứng chỉ
        </button>
      )}
    </div>
  );
};

export default Certificate;
