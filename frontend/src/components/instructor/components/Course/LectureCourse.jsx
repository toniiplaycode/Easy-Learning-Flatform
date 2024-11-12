import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectionAllLectureEachCourse } from "../../../../reducers/apiSection";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { addLecture, updateLecture } from "../../../../reducers/apiLecture";
import DeleteConfirm from "../DeleteConfirm";
import { toast } from "react-toastify";
import { getApiVideoYoutube } from "../../../../reducers/apiYoutube";
import { formatDuration, formatUrlYoutube } from "../../../../utils/common";

const LectureCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const targetElementRef = useRef(null);
  const detailCourse = location.state?.course;

  const sectionAllLectureEachCourse = useSelector(
    (state) => state.apiSection.sectionAllLectureEachCourse
  );

  useEffect(() => {
    dispatch(fetchSectionAllLectureEachCourse(detailCourse.id));
  }, [detailCourse]);

  // State variables for form inputs
  const [section_id, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("Chưa chọn video nào");
  const [video_url, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(1); // set bằng 1 đỡ, nữa sài được API youtube sửa lại
  const [totalLecture, setTotalLecture] = useState();

  const [isUpdatePosition, setIsUpdatePosition] = useState(null);
  const [isUpdateLecture, setIsUpdateLecture] = useState(null);
  const [lectureDataUpdate, setLectureDataUpdate] = useState({});

  const apiVideoYoutube = useSelector(
    (state) => state.apiYoutube.apiVideoYoutube
  );

  // set duration when add link youtube
  useEffect(() => {
    if (Object.keys(apiVideoYoutube).length > 0)
      if (apiVideoYoutube?.items[0]?.contentDetails?.duration != null) {
        setDuration(
          formatDuration(apiVideoYoutube?.items[0]?.contentDetails?.duration)
        );
      }
  }, [apiVideoYoutube]);

  // State for validation
  const [validate, setValidate] = useState({
    section_id: true,
    title: true,
    description: true,
    video_url: true,
  });

  // calculate the lasted position lecture of the selected section
  const handleLastestPositionLectureEachSection = (section_id) => {
    const section = sectionAllLectureEachCourse?.find(
      (section) => section.id === section_id
    );

    if (section && section.Lectures.length > 0) {
      // Get the last lecture's position
      const lastLecturePosition =
        section.Lectures[section.Lectures.length - 1].position;
      setTotalLecture(lastLecturePosition);
    } else {
      // Get the total lectures
      const totalLecturesCount = sectionAllLectureEachCourse.reduce(
        (total, section) => {
          return total + section.Lectures.length;
        },
        0
      );
      setTotalLecture(totalLecturesCount);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Chưa chọn video nào");
  };

  const handleSubmit = () => {
    // Validation logic
    const newValidationState = {
      section_id: !!section_id, // Ensure section_id is selected
      title: title.trim().length > 0, // Ensure title is not empty
      description: description.trim().length > 0, // Ensure description is not empty
      video_url: video_url.trim().length > 0, // Ensure videourl is not empty
    };

    setValidate(newValidationState);

    // If any validation fails, do not proceed
    const isValid = Object.values(newValidationState).every(Boolean);
    if (!isValid) {
      return;
    }

    const newLectureData = {
      course_id: detailCourse.id,
      section_id,
      title,
      description,
      video_url,
      position: totalLecture + 1,
      duration,
    };

    dispatch(addLecture(newLectureData));

    setSectionId("");
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setDuration(0);
  };

  // Handle change for each input to reset its validation
  const handleSectionChange = (e) => {
    handleLastestPositionLectureEachSection(Number(e.target.value));
    setSectionId(Number(e.target.value));
    setValidate((prev) => ({ ...prev, section_id: true }));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setValidate((prev) => ({ ...prev, title: true }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setValidate((prev) => ({ ...prev, description: true }));
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    setValidate((prev) => ({ ...prev, video_url: true }));

    if (formatUrlYoutube(e.target.value)) {
      dispatch(getApiVideoYoutube(formatUrlYoutube(e.target.value)));
    }
  };

  const handlePutPosition = (lecture) => {
    setIsUpdatePosition(lecture.id);
    setLectureDataUpdate({
      ...lectureDataUpdate,
      course_id: detailCourse.id,
      id: lecture.id,
      position: lecture.position,
    });
  };

  const putLecture = () => {
    const updatedLectureData = {
      id: lectureDataUpdate.id, // retain lecture id
      course_id: detailCourse.id, // retain course id
      section_id: section_id, // use the latest section_id from state
      title: title, // use the latest title from state
      description: description, // use the latest description from state
      video_url: video_url, // use the latest video_url from state
      position: lectureDataUpdate.position || 1, // retain or update position
      duration: duration, // use the latest duration from state
    };

    if (!updatedLectureData.position) {
      toast.error("Vị trí không để trống !");
      return;
    }

    dispatch(updateLecture(updatedLectureData));

    // Reset the form fields after updating
    setSectionId("");
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setDuration(1);
    setIsUpdatePosition(null);
    setIsUpdateLecture(null);
  };

  const handlePutLecture = (lecture_id) => {
    let foundLecture = null;
    setIsUpdateLecture(lecture_id);
    targetElementRef.current.scrollIntoView({ behavior: "smooth" });

    sectionAllLectureEachCourse.forEach((section) => {
      section.Lectures.forEach((lecture) => {
        if (lecture.id === lecture_id) {
          foundLecture = lecture;
        }
      });
    });

    if (foundLecture) {
      setLectureDataUpdate({
        course_id: detailCourse.id,
        ...foundLecture,
      });

      setSectionId(foundLecture.section_id);
      setTitle(foundLecture.title);
      setDescription(foundLecture.description);
      setVideoUrl(foundLecture.video_url);
      setDuration(foundLecture.duration);
      setIsUpdatePosition(null); // This will hide the position update if needed
    }
  };

  return (
    <div className="lecture-course-container">
      <h2>Quản lý bài giảng khóa học</h2>
      <h5>Các bài giảng hiện tại</h5>
      <div className="lecture-course-img">
        <img src={detailCourse?.img} alt="Course Thumbnail" />
      </div>
      <div className="lecture-course-current">
        {sectionAllLectureEachCourse?.length > 0 ? (
          sectionAllLectureEachCourse?.map((section) => (
            <div className="lecture-course-item" key={section.id}>
              <h6>
                Chương {section.position}. {section.title}
              </h6>
              {section?.Lectures?.slice() // Create a shallow copy to avoid mutation
                .sort((a, b) => a.position - b.position) // Sort by position
                .map((lecture) => {
                  const detail_lecture = {
                    id: lecture.id,
                    course_id: detailCourse.id,
                  };
                  return (
                    <div className="lecture-current-item" key={lecture.id}>
                      <span className="lecture-current-item-left">
                        <span>
                          {lecture.video_url.length > 0 ? (
                            <FontAwesomeIcon
                              icon={faVideo}
                              style={{ color: "blue" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faVideoSlash}
                              style={{ color: "red" }}
                            />
                          )}
                        </span>{" "}
                        Bài{" "}
                        {isUpdatePosition == lecture.id ? (
                          <input
                            type="number"
                            className="input-common"
                            style={{
                              width: "50px",
                              padding: "5px",
                              marginBottom: "4px",
                            }}
                            value={lectureDataUpdate.position}
                            onChange={(e) =>
                              setLectureDataUpdate({
                                ...lectureDataUpdate,
                                position: e.target.value,
                              })
                            }
                          />
                        ) : (
                          lecture.position
                        )}
                        . {lecture.title}
                        <p>{lecture.description}</p>
                      </span>
                      <span className="lecture-current-item-right">
                        <button
                          onClick={() => {
                            handlePutLecture(lecture.id);
                          }}
                        >
                          {isUpdateLecture == lecture.id
                            ? "Cập nhật"
                            : " Quản lý"}
                        </button>

                        {isUpdatePosition == lecture.id ? (
                          <button
                            style={{ background: "#4caf50" }}
                            onClick={() => putLecture()}
                          >
                            Cập nhật vị trí trong chương
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handlePutPosition(lecture);
                            }}
                          >
                            Đổi vị trí trong chương
                          </button>
                        )}

                        <DeleteConfirm detail_lecture={detail_lecture} />
                      </span>
                    </div>
                  );
                })}
            </div>
          ))
        ) : (
          <div className="lecture-course-current-empty">
            Chưa có bài giảng nào
          </div>
        )}
      </div>

      <h5 ref={targetElementRef}>Thêm bài giảng mới</h5>

      <div className="form-group">
        <label htmlFor="section_id">Thuộc chương</label>
        <select
          name="section_id"
          value={section_id}
          onChange={handleSectionChange}
        >
          <option value="">Chọn chương</option>
          {sectionAllLectureEachCourse?.map((section) => (
            <option key={section.id} value={section.id}>
              Chương {section.position}. {section.title}
            </option>
          ))}
        </select>
        {!validate.section_id && (
          <p style={{ color: "red", marginTop: "5px" }}>Vui lòng chọn chương</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="title">Tiêu đề</label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Nhập tiêu đề bài giảng"
          onChange={handleTitleChange}
        />
        {!validate.title && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Tiêu đề không được để trống
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Mô tả</label>
        <textarea
          type="text"
          name="description"
          value={description}
          placeholder="Nhập mô tả bài giảng"
          onChange={handleDescriptionChange}
        />
        {!validate.description && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Mô tả không được để trống
          </p>
        )}
      </div>

      <div className="form-group custom-file-input">
        <label htmlFor="img" className="custom-file-label">
          Tải lên video bài giảng
        </label>
        <input
          type="file"
          id="img"
          name="img"
          accept="video/*"
          onChange={handleFileChange}
        />
        <span className="file-name">{fileName}</span>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Hoặc nhập link video từ youtube"
          value={video_url}
          onChange={handleVideoUrlChange}
        />

        {!validate.video_url && (
          <p style={{ color: "red", marginTop: "5px" }}>Chưa có video nào</p>
        )}
      </div>

      <button
        className="submit-btn"
        onClick={isUpdateLecture ? putLecture : handleSubmit}
      >
        {isUpdateLecture ? "Cập nhật bài giảng" : "Thêm bài giảng"}
      </button>
    </div>
  );
};

export default LectureCourse;
