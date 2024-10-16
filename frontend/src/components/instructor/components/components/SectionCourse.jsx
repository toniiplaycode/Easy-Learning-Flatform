import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DeleteConfirmation from "../DeleteConfirm";
import {
  addSection,
  fetchSectionEachCourse,
  updateSection,
} from "../../../../reducers/apiSection";
import { toast } from "react-toastify";

const SectionCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const detailCourse = location.state?.course;

  const sectionEachCourse = useSelector(
    (state) => state.apiSection.sectionEachCourse
  );

  useEffect(() => {
    dispatch(fetchSectionEachCourse(detailCourse.id));
  }, [detailCourse]);

  const [sectionData, setSectionData] = useState({
    title: "",
    course_id: detailCourse.id || "",
  });
  const [validate, setValidate] = useState();

  const [isUpdateTitle, setIsUpdateTitle] = useState(null);
  const [isUpdatePosition, setIsUpdatePosition] = useState(null);
  const [sectionDataUpdate, setSectionDataUpdate] = useState({});

  const handlePutTitle = (section) => {
    setIsUpdateTitle(section.id);
    setSectionDataUpdate({
      ...sectionDataUpdate,
      course_id: detailCourse.id,
      id: section.id,
      title: section.title,
    });
  };

  const handlePutPosition = (section) => {
    setIsUpdatePosition(section.id);
    setSectionDataUpdate({
      ...sectionDataUpdate,
      course_id: detailCourse.id,
      id: section.id,
      position: section.position,
    });
  };

  const putSection = () => {
    if (sectionDataUpdate.title) {
      if (sectionDataUpdate.title.trim().length == 0) {
        toast.error("Tiêu đề không để trống !");
        return;
      }
    } else if (!sectionDataUpdate.position) {
      toast.error("Vị trí chương không để trống !");
      return;
    }

    dispatch(updateSection(sectionDataUpdate));
    setSectionDataUpdate({});
    setIsUpdateTitle(null);
    setIsUpdatePosition(null);
  };

  return (
    <div className="section-course-container">
      <h2>Quản lý chương khóa học</h2>
      <h5>Các chương hiện tại</h5>
      <div className="section-course-img">
        <img src={detailCourse?.img} />
      </div>
      <div className="section-course-current">
        {sectionEachCourse
          ?.slice() // Create a shallow copy to avoid mutation
          .sort((a, b) => a.position - b.position) // Sort by position
          .map((section) => (
            <div className="section-course-item" key={section.id}>
              <div className="section-course-item-left">
                {isUpdatePosition == section.id ? (
                  <>
                    Chương
                    <input
                      className="input-common"
                      style={{ width: "50px", margin: "0 5px" }}
                      value={sectionDataUpdate.position}
                      onChange={(e) => {
                        setSectionDataUpdate({
                          ...sectionDataUpdate,
                          position: e.target.value,
                        });
                      }}
                    />
                  </>
                ) : (
                  <span>Chương {section.position}.</span>
                )}
                {isUpdateTitle === section.id ? (
                  <input
                    className="input-common"
                    style={{ width: "70%" }}
                    value={sectionDataUpdate.title}
                    onChange={(e) => {
                      setSectionDataUpdate({
                        ...sectionDataUpdate,
                        title: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <span>{section.title}</span>
                )}
              </div>
              <div className="section-course-item-right">
                {isUpdateTitle == section?.id ? (
                  <button onClick={() => putSection()}>Cập nhật tiêu đề</button>
                ) : (
                  <button onClick={() => handlePutTitle(section)}>
                    Đổi tiêu đề
                  </button>
                )}

                {isUpdatePosition == section.id ? (
                  <button onClick={() => putSection()}>Cập nhật chương</button>
                ) : (
                  <button
                    onClick={() => {
                      handlePutPosition(section);
                    }}
                  >
                    Đổi vị trí chương
                  </button>
                )}

                <DeleteConfirmation
                  detail_section={{
                    course_id: detailCourse.id,
                    id: section.id,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      <h5>Thêm chương khóa học</h5>
      <div className="form-group">
        <input
          type="text"
          id="title"
          name="title"
          value={sectionData.title}
          placeholder="Nhập tiêu đề chương"
          onChange={(e) => {
            setValidate(false);
            setSectionData({
              ...sectionData,
              title: e.target.value,
              position: sectionEachCourse.length + 1,
            });
          }}
        />
        {validate && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Tiêu đề không để trống
          </p>
        )}
      </div>
      <button
        className="submit-btn"
        onClick={() => {
          if (sectionData.title.trim().length === 0) {
            setValidate(true);
          } else {
            dispatch(addSection(sectionData));
            setSectionData({
              ...sectionData,
              title: "",
            });
          }
        }}
      >
        Thêm chương
      </button>
    </div>
  );
};

export default SectionCourse;
