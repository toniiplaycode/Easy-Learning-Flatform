import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEnrollmentEachUser } from "../../../reducers/apiEnrollment";
import { toast } from "react-toastify";
import { Spinner, Flex, Text } from "@chakra-ui/react";

const PaymentSuccessPaypalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true); // State để quản lý loading

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const queryParams = new URLSearchParams(location.search);
      const paymentId = queryParams.get("paymentId");
      const token = queryParams.get("token");
      const payerId = queryParams.get("PayerID");
      const courseIdString = queryParams.get("course_id");

      if (!paymentId || !payerId || !courseIdString) {
        toast.error("Thanh toán thất bại hoặc bị hủy.");
        navigate("/payment-cancel");
        setIsLoading(false); // Dừng loading nếu không có thông tin hợp lệ
        return;
      }

      // Chuyển đổi course_id từ chuỗi sang mảng
      const course_id = courseIdString.split(",").map((id) => parseInt(id, 10));

      try {
        // Gửi yêu cầu xác minh thanh toán tới backend
        const response = await fetch(
          `http://localhost:3000/api/payment/verifyPaymentPaypal?paymentId=${paymentId}&PayerID=${payerId}&token=${token}`
        );

        const data = await response.json();

        if (data.status === "success") {
          // Dispatch để thêm các khóa học vào tài khoản người dùng
          await dispatch(addEnrollmentEachUser(course_id));
          navigate("/my-courses#courses");
        } else {
          toast.error("Xác minh thanh toán thất bại.");
          navigate("/payment-failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Có lỗi xảy ra khi xác minh thanh toán.");
        navigate("/payment-failed");
      } finally {
        setIsLoading(false); // Dừng loading khi hoàn tất
      }
    };

    handlePaymentSuccess();
  }, [dispatch, location.search, navigate]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      direction="column"
    >
      {isLoading ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text mt={4} fontSize="lg" color="gray.600">
            Đang xử lý thanh toán, vui lòng đợi...
          </Text>
        </>
      ) : (
        <Text fontSize="lg" color="red.500">
          Đang chuyển hướng...
        </Text>
      )}
    </Flex>
  );
};

export default PaymentSuccessPaypalPage;
