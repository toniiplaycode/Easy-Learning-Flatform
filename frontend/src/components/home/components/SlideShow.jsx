import Carousel from "react-bootstrap/Carousel";

const SlideShow = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <img
            className="d-block"
            src="/imgs/banner1.png"
            alt="First slide"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <img
            className="d-block"
            src="/imgs/banner2.png"
            alt="First slide"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <img
            className="d-block"
            src="/imgs/logo.png"
            alt="Second slide"
            style={{ maxHeight: "100%", maxWidth: "100%", marginTop: "-100px" }}
          />
        </div>
        <Carousel.Caption>
          <h5 className="slideshow-text">Học những gì bạn có hứng thú</h5>
          <p>
            Các kỹ năng cho hiện tại (và tương lai của bạn). Hãy bắt đầu học với
            chúng tôi.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SlideShow;
