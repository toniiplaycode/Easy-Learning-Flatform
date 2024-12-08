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

  // Filter payments by search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPayments(sortedPayments);
    } else {
      const filtered = sortedPayments.filter(
        (payment) =>
          payment.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.User.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPayments(filtered);
    }
  }, [searchTerm, sortedPayments]);

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

      <h3 style={{ margin: "0 20px 20px 20px" }}>
        Tổng doanh thu: {totalRevenue.toLocaleString()} ₫
      </h3>

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
