import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";

const Drawer = () => {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="custom-navbar-toggle"
            >
              <IoMenu size={30} color="black" />
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              className="custom-offcanvas"
            >
              <Offcanvas.Header closeButton />
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link href="#login" className="custom-nav-link">
                    Đăng nhập
                  </Nav.Link>
                  <Nav.Link href="#signup" className="custom-nav-link">
                    Đăng ký
                  </Nav.Link>

                  <hr />

                  <Nav.Link href="#popular" className="fw-bold">
                    Phổ biến nhất
                  </Nav.Link>
                  <Nav.Link href="#web-dev">Phát triển web</Nav.Link>
                  <Nav.Link href="#mobile-apps">
                    Phát triển ứng dụng di động
                  </Nav.Link>
                  <Nav.Link href="#gaming">Phát triển trò chơi</Nav.Link>
                  <Nav.Link href="#entrepreneurship">
                    Tinh thần khởi nghiệp
                  </Nav.Link>
                  <Nav.Link href="#data-analysis">
                    BI và phân tích dữ liệu kinh doanh
                  </Nav.Link>
                  <Nav.Link href="#finance">Tài chính</Nav.Link>
                  <Nav.Link href="#certifications">Chứng chỉ CNTT</Nav.Link>
                  <Nav.Link href="#self-development">
                    Chuyển hóa bản thân
                  </Nav.Link>
                  <Nav.Link href="#design">Thiết kế & Minh họa đồ họa</Nav.Link>
                  <Nav.Link href="#digital-marketing">
                    Marketing kỹ thuật số
                  </Nav.Link>
                  <Nav.Link href="#all-categories">Tất cả thể loại</Nav.Link>

                  <hr />

                  {/* <Nav.Link href="#udemy-business" className="fw-bold">
                    Thể loại khác trên Udemy
                  </Nav.Link>
                  <Nav.Link href="#udemy-business">Udemy Business</Nav.Link>
                  <Nav.Link href="#app-download">Tải ứng dụng</Nav.Link>
                  <Nav.Link href="#invite-friends">Mời bạn bè</Nav.Link>
                  <Nav.Link href="#help-support">Trợ giúp và Hỗ trợ</Nav.Link>

                  <hr /> */}

                  <Button variant="outline-secondary" className="w-100 mt-2">
                    🌐 Tiếng Việt
                  </Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Drawer;
