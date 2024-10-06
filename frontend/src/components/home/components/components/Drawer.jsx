import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Drawer = ({ isLogged }) => {
  const [show, setShow] = useState(false); // Manage Offcanvas visibility

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand={false}>
        <Container fluid>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            className="custom-navbar-toggle"
            onClick={handleShow} // Show Offcanvas on toggle click
          >
            <IoMenu size={30} color="black" />
          </Navbar.Toggle>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            show={show} // Control Offcanvas visibility with state
            onHide={handleClose} // Close Offcanvas when clicked outside
            className="custom-offcanvas"
          >
            <Offcanvas.Header closeButton onClick={handleClose} />
            <Offcanvas.Body>
              <Nav className="flex-column">
                {isLogged ? (
                  <>
                    <div className="drawer-profile">
                      <img src="imgs/profile.png" />
                      <Link
                        to="/profile"
                        className="custom-nav-link mb-2"
                        onClick={handleClose} // Đóng Offcanvas khi nhấn vào liên kết
                      >
                        Le Thanh Toan
                      </Link>
                    </div>
                    <Link
                      to="/instructor"
                      className="custom-nav-link mb-2"
                      onClick={handleClose}
                    >
                      Chuyển sang giảng viên
                    </Link>
                    <Link
                      to="/logout"
                      className="custom-nav-link mb-2"
                      onClick={handleClose}
                    >
                      Đăng xuất
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="custom-nav-link mb-2"
                      onClick={handleClose}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/signup"
                      className="custom-nav-link mb-2"
                      onClick={handleClose}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}

                <hr />

                <Link to="#popular" className="fw-bold mb-2">
                  Phổ biến nhất
                </Link>
                <Link to="#web-dev" className="mb-2">
                  Phát triển web
                </Link>
                <Link to="#mobile-apps" className="mb-2">
                  Phát triển ứng dụng di động
                </Link>
                <Link to="#gaming" className="mb-2">
                  Phát triển trò chơi
                </Link>
                <Link to="#entrepreneurship" className="mb-2">
                  Tinh thần khởi nghiệp
                </Link>
                <Link to="#data-analysis" className="mb-2">
                  BI và phân tích dữ liệu kinh doanh
                </Link>
                <Link to="#finance" className="mb-2">
                  Tài chính
                </Link>
                <Link to="#certifications" className="mb-2">
                  Chứng chỉ CNTT
                </Link>
                <Link to="#self-development" className="mb-2">
                  Chuyển hóa bản thân
                </Link>
                <Link to="#design" className="mb-2">
                  Thiết kế & Minh họa đồ họa
                </Link>
                <Link to="#digital-marketing" className="mb-2">
                  Marketing kỹ thuật số
                </Link>
                <Link to="#all-categories" className="mb-2">
                  Tất cả thể loại
                </Link>

                <hr />

                <Button variant="outline-secondary" className="w-100 mt-2">
                  🌐 Tiếng Việt
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Drawer;
