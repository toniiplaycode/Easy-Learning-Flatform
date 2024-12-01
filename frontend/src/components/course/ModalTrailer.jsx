import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { toggleTrailer } from "../../reducers/modalTrailer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCheck,
  faTicketSimple,
} from "@fortawesome/free-solid-svg-icons";

function App({ inforUser, couponEachCourse }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [haveCoupon, setHaveCoupon] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const idCourseUrl = params.get("id");

  const toggle = () => dispatch(toggleTrailer());

  const showTrailer = useSelector((state) => state.modalTrailer.showTrailer);
  const videoUrl = useSelector((state) => state.modalTrailer.videoUrl);
  let enrollmentEachUser = useSelector(
    (state) => state.apiEnrollment.enrollmentEachUser
  );

  const isEnrolled = enrollmentEachUser?.some(
    (item) => item.course_id === Number(idCourseUrl)
  );

  useEffect(() => {
    const isHaveCoupon = couponEachCourse.some(
      (coupon) => coupon.course_id == idCourseUrl
    );
    setHaveCoupon(isHaveCoupon);
  }, [idCourseUrl, couponEachCourse]);

  const handleAddCoupon = () => {
    // Check if the user is logged in and there are coupons for the course
    if (
      idCourseUrl &&
      Object.keys(inforUser).length > 0 &&
      couponEachCourse?.length > 0
    ) {
      // Get the first coupon from the couponEachCourse array
      const coupon = couponEachCourse[0];

      // Check if the coupon is already in localStorage
      const existingCoupon = JSON.parse(localStorage.getItem("coupons")) || [];

      // If the coupon is not already in localStorage, add it
      const couponExists = existingCoupon.some(
        (storedCoupon) =>
          storedCoupon.id === coupon.id && storedCoupon.user_id === inforUser.id
      );

      if (!couponExists) {
        // Add the coupon with user_id to localStorage
        existingCoupon.push({ ...coupon, user_id: inforUser.id });
        localStorage.setItem("coupons", JSON.stringify(existingCoupon));

        console.log("Coupon added to localStorage:", {
          ...coupon,
          user_id: inforUser.id,
        });

        toast.success("Bạn đã nhận được mã giảm giá từ khóa học này !", {
          duration: 8000,
        });
      } else {
        console.log("Coupon already exists in localStorage");
        toast.success("Bạn đã lấy mã giảm giá này !", {
          duration: 8000,
        });
      }
    }
  };

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
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            float: "right",
            fontWeight: "bold",
          }}
        >
          Thoát
        </Button>

        <Button
          color="primary"
          style={{ marginTop: "10px", float: "right", fontWeight: "bold" }}
          onClick={() => {
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
          Tham gia khóa học <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Button>

        {haveCoupon && (
          <Button
            style={{
              marginTop: "10px",
              float: "right",
              marginRight: "10px",
              background: "#f8e71c",
              color: "#333",
              fontWeight: "bold",
            }}
            onClick={() => {
              toggle();
              handleAddCoupon();
              navigate(`/profile/mycoupon`);
            }}
          >
            Nhận mã giảm giá <FontAwesomeIcon icon={faCheck} />
          </Button>
        )}
      </ModalBody>
    </Modal>
  );
}

export default App;
