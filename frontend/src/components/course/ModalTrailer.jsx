import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { toggleTrailer } from "../../reducers/modalTrailer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  const toggle = () => dispatch(toggleTrailer());

  const showTrailer = useSelector((state) => state.modalTrailer.showTrailer);
  const videoUrl = useSelector((state) => state.modalTrailer.videoUrl);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  return (
    <Modal
      isOpen={showTrailer}
      toggle={toggle}
      centered
      style={{
        maxWidth: "1000px",
      }}
    >
      <ModalBody
        style={{
          background: "#2e2e2e",
        }}
      >
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoUrl}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Button
          color="danger"
          onClick={toggle}
          style={{ marginTop: "10px", marginLeft: "10px", float: "right" }}
        >
          Thoát
        </Button>

        <Button
          color="primary"
          style={{ marginTop: "10px", float: "right" }}
          onClick={() => {
            const isEnrolled = enrollmentEachUser?.some(
              (item) => item.course_id === Number(idCourseUrl)
            );
            if (!isEnrolled) {
              toast.error(
                "Bạn chưa mua khóa học này ! Hãy thêm vào giỏ hàng và thanh toán",
                {
                  autoClose: 4000,
                }
              );
            } else {
              toggle();
              navigate(`/course-page?id=${idCourseUrl}`);
            }
          }}
        >
          Tham gia khóa học
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default App;
