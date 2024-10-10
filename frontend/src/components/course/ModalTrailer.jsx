import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { toggleTrailer } from "../../reducers/modalTrailer";

function App() {
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleTrailer());

  const showTrailer = useSelector((state) => state.modalTrailer.showTrailer);
  const videoUrl = useSelector((state) => state.modalTrailer.videoUrl);

  return (
    <div>
      <Modal
        isOpen={showTrailer}
        toggle={toggle}
        centered
        style={{
          maxWidth: "70%",
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
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <Button
            color="primary"
            onClick={toggle}
            style={{ marginTop: "10px", float: "right" }}
          >
            Thoát
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
