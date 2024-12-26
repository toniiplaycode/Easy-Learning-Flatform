import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa"; // Import FontAwesome icons
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

const MyCoupon = () => {
  const [couponData, setCouponData] = useState([]);
  const [copiedCode, setCopiedCode] = useState(""); // Track the copied code
  const inforUser = JSON.parse(localStorage.getItem("inforUser")); // Get logged-in user info (assuming it's stored in localStorage)
  const courses = useSelector((state) => state.apiCourse.courses); // Get courses from Redux state

  useEffect(() => {
    // Load coupon data from localStorage on component mount
    const savedCoupons = localStorage.getItem("coupons");
    if (savedCoupons) {
      // Filter coupons to only include those that belong to the logged-in user
      const userCoupons = JSON.parse(savedCoupons).filter(
        (coupon) => coupon.user_id === inforUser?.id
      );
      setCouponData(userCoupons);
    }
  }, [inforUser]);

  const handleCopy = (code) => {
    setCopiedCode(code); // Track which code was copied
    navigator.clipboard.writeText(code); // Copy the code to clipboard
  };

  // Format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear(); // Full year (e.g., 2024)
    return `${day}/${month}/${year}`;
  };

  return (
    <Box w="100%" p={6}>
      {couponData.length === 0 ? (
        <div className="mycourse__empty-container">
          <h3 className="mycourse__empty">Chưa có mã giảm giá nào!</h3>
          <img className="mycourse__empty-img" src="/imgs/emptybox.png" />
          <button className="mycourse__empty-btn" onClick={() => navigate(`/`)}>
            Trang chủ
          </button>
        </div>
      ) : (
        // Render coupons in a responsive grid layout
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {couponData.map((coupon, index) => {
            const isCouponExpired = new Date() > new Date(coupon.valid_until);

            // Find the course title based on course_id
            const course = courses.find(
              (courseItem) => courseItem.id === coupon.course_id
            );

            return (
              <Box
                key={index}
                p={4}
                borderRadius="lg"
                bg={isCouponExpired ? "gray.100" : "white"}
                opacity={isCouponExpired ? 0.6 : 1}
                filter={isCouponExpired ? "grayscale(100%)" : "none"}
                borderColor={isCouponExpired ? "gray.300" : "gray.200"}
                transition="all 0.3s ease"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
              >
                {/* Coupon Code */}
                <Flex justifyContent="space-between" mb={4}>
                  <Text fontSize="1.3em" fontWeight="bold" color="#007bff">
                    {coupon.code}
                  </Text>
                  <Text fontSize="1.3em" color="green.500">
                    {coupon.discount_percentage}%
                  </Text>
                </Flex>

                {/* Coupon Course */}
                <Box mb={1}>
                  <Flex alignItems="flex-start" height="80px">
                    <Text color="gray.600">
                      <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                      {course ? course.title : "Khóa học không tồn tại"}
                    </Text>
                  </Flex>
                </Box>

                {/* Expiration Info */}
                <Flex flexDirection="column" mb={4} color="gray.600">
                  <Text>
                    <FontAwesomeIcon icon={faCalendarDays} /> Hết hạn:{" "}
                    {formatDate(coupon.valid_until)}
                  </Text>
                </Flex>

                {/* Copy Code Button */}
                <Button
                  colorScheme={copiedCode === coupon.code ? "green" : "blue"}
                  variant={copiedCode === coupon.code ? "solid" : "outline"}
                  onClick={() => handleCopy(coupon.code)}
                  w="full"
                  borderRadius="md"
                  color="white"
                  height="40px"
                  isDisabled={isCouponExpired}
                  backgroundColor={
                    copiedCode === coupon.code ? "green.400" : "#007bff"
                  }
                  _hover={{
                    backgroundColor:
                      copiedCode === coupon.code ? "green.500" : "#2b6cb0",
                  }}
                  _active={{
                    backgroundColor:
                      copiedCode === coupon.code ? "green.600" : "#2b6cb0",
                  }}
                  _disabled={{
                    backgroundColor: "gray.300",
                    cursor: "not-allowed",
                  }}
                >
                  {isCouponExpired ? (
                    <>Hết hạn!</>
                  ) : copiedCode === coupon.code ? (
                    <>
                      <FaClipboardCheck style={{ marginRight: "8px" }} />
                      Đã sao chép!
                    </>
                  ) : (
                    <>
                      <FaClipboard style={{ marginRight: "8px" }} />
                      Sao chép mã
                    </>
                  )}
                </Button>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default MyCoupon;
