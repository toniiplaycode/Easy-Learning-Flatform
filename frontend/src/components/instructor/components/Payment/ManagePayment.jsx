import React, { useEffect, useState } from "react";
import { fetchAllPaymentAllCourse } from "../../../../reducers/apiPayment";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../utils/common";
import { BarChart } from "@mui/x-charts/BarChart";

const ManagePayment = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({ series: [], xAxis: [] });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected course
  const [availableYears, setAvailableYears] = useState([]); // State for available years
  const [availableCourses, setAvailableCourses] = useState([]); // State for available courses

  useEffect(() => {
    dispatch(fetchAllPaymentAllCourse());
  }, [dispatch]);

  const paymentAllCourse = useSelector(
    (state) => state.apiPayment.paymentAllCourse
  );

  // Sort payments by created_at date in descending order
  const sortedPayments = paymentAllCourse
    ? [...paymentAllCourse].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    : [];

  // Extract available years and courses from the payment data
  useEffect(() => {
    if (sortedPayments.length > 0) {
      const years = [
        ...new Set(
          sortedPayments.map((payment) =>
            new Date(payment.created_at).getFullYear()
          )
        ),
      ];
      setAvailableYears(years.sort((a, b) => b - a)); // Sort years in descending order

      const courses = [
        ...new Set(sortedPayments.map((payment) => payment.Course.title)),
      ];
      setAvailableCourses(courses.sort()); // Sort courses alphabetically
    }
  }, [sortedPayments]);

  // Calculate total payment amount for each course and total revenue
  useEffect(() => {
    if (sortedPayments && sortedPayments.length > 0) {
      const coursePayments = {};
      let totalRevenueTemp = 0;

      sortedPayments.forEach((payment) => {
        const courseTitle = payment.Course.title;
        if (!coursePayments[courseTitle]) {
          coursePayments[courseTitle] = 0;
        }
        coursePayments[courseTitle] += payment.amount;
        totalRevenueTemp += payment.amount; // Accumulate total revenue
      });

      const chartSeries = Object.values(coursePayments);
      const xAxisData = Object.keys(coursePayments);

      setChartData({
        series: [{ data: chartSeries }],
        xAxis: xAxisData,
      });

      setTotalRevenue(totalRevenueTemp); // Update total revenue state
    }
  }, [sortedPayments]);

  // Filter payments by search term, selected month, selected year, and selected course
  useEffect(() => {
    let filtered = sortedPayments;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (payment) =>
          payment.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.User.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear !== "") {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.created_at);
        return paymentDate.getFullYear() === parseInt(selectedYear);
      });
    }

    if (selectedMonth !== "") {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.created_at);
        return paymentDate.getMonth() + 1 === parseInt(selectedMonth); // Match month
      });
    }

    if (selectedCourse !== "") {
      filtered = filtered.filter(
        (payment) => payment.Course.title === selectedCourse
      );
    }

    setFilteredPayments(filtered);
  }, [searchTerm, selectedMonth, selectedYear, selectedCourse, sortedPayments]);

  return (
    <>
      {sortedPayments?.length > 0 && (
        <BarChart
          series={[
            {
              data: chartData.series.length > 0 ? chartData.series[0].data : [],
              color: "#005bff",
            },
          ]}
          height={290}
          xAxis={[
            {
              data: chartData.xAxis.length > 0 ? chartData.xAxis : [],
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 60, left: 90, right: 10 }}
        />
      )}

      {/* Filters: Year, Month, Course */}
      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Tổng doanh thu: {totalRevenue.toLocaleString()} ₫</h3>

        <div>
          <label htmlFor="yearFilter" style={{ marginRight: "10px" }}>
            Năm:
          </label>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: "5px",
              marginRight: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">Tất cả</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="monthFilter" style={{ marginRight: "10px" }}>
            Tháng:
          </label>
          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: "5px",
              marginRight: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">Tất cả</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>

          <label htmlFor="courseFilter" style={{ marginRight: "10px" }}>
            Khóa học:
          </label>
          <select
            id="courseFilter"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">Tất cả</option>
            {availableCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mange-list-page-container">
        <div className="mange-list">
          <div className="header">
            <div className="header-item">Gmail</div>
            <div className="header-item">Tên học viên</div>
            <div className="header-item">Khóa học</div>
            <div className="header-item">Đã thanh toán</div>
            <div className="header-item">Phương thức</div>
            <div className="header-item">Ngày thanh toán</div>
            <div className="header-item">Trạng thái</div>
          </div>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div className="mange-item" key={payment.id}>
                <div className="item">{payment.User.email}</div>
                <div className="item">{payment.User.name}</div>
                <div className="item">{payment.Course.title}</div>
                <div className="item">{payment.amount.toLocaleString()} ₫</div>
                <div className="item">{payment.PaymentMethod.name}</div>
                <div className="item">{formatDate(payment.created_at)}</div>
                <div className="item">
                  {payment.status === "completed"
                    ? "Hoàn thành"
                    : payment.status === "pending"
                    ? "Đang chờ"
                    : "Từ chối"}
                </div>
              </div>
            ))
          ) : (
            <div>Không tìm thấy thanh toán nào!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagePayment;
