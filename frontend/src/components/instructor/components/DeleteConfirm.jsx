import React, { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css"; // Add your theme
import "primereact/resources/primereact.min.css"; // Core CSS
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../reducers/apiCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteSection } from "../../../reducers/apiSection";

const DeleteConfirm = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const accept = () => {
    if ("course_id" in props) {
      dispatch(deleteCourse(props.course_id));
    } else if ("detail_section" in props) {
      dispatch(deleteSection(props.detail_section));
    }

    setVisible(false);
  };

  const reject = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        style={{ padding: "10px", width: "35px" }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Bạn chắc xóa nội dung này ?"
        message="Các dữ liệu liên quan đến nội dung cũng sẽ bị xóa theo !"
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger" // Customize button class
        rejectLabel="No"
        acceptLabel="Yes"
        accept={accept}
        reject={reject}
      />
    </>
  );
};

export default DeleteConfirm;