import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../../../reducers/apiLoginLogout";

const Drawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); // Manage Offcanvas visibility

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const categories = useSelector((state) => state.apiCategory.categories);

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
                {Object.keys(inforUser).length > 0 ? (
                  <>
                    <div className="drawer-profile">
                      <img
                        src="imgs/profile.png"
                        onClick={() => {
                          handleClose();
                          navigate("/profile");
                        }}
                      />
                      <Link
                        to="/profile"
                        className="custom-nav-link mb-2"
                        onClick={() => {
                          handleClose();
                        }}
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
                      to={`/my-courses`}
                      className="custom-nav-link mb-2"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Học tập
                    </Link>
                    <Link
                      to="/instructor"
                      className="custom-nav-link mb-2"
                      onClick={handleClose}
                    >
                      Mong muốn
                    </Link>
                    <Link
                      className="custom-nav-link mb-2"
                      onClick={() => {
                        handleClose();
                        dispatch(handleLogout());
                      }}
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

                {categories?.map((item, index) => (
                  <Link to="#web-dev" className="caterogy-drawer-mobile mb-2">
                    {item.name} <FontAwesomeIcon icon={faAngleRight} />
                  </Link>
                ))}

                <Link
                  to="#all-categories"
                  className="caterogy-drawer-mobile mb-2"
                >
                  Tất cả thể loại <FontAwesomeIcon icon={faAngleRight} />
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
