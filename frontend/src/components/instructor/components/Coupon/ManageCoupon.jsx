import React from "react";
import { Route, Routes } from "react-router-dom";
import ListCoupon from "./ListCoupon";
import DetailCoupon from "./DetailCoupon";

const ManageCoupon = () => {
  return (
    <>
      <div className="manage-container">
        <Routes>
          <Route path="/" element={<ListCoupon />} />
          <Route path="/detail-coupon" element={<DetailCoupon />} />
        </Routes>
      </div>
    </>
  );
};

export default ManageCoupon;
