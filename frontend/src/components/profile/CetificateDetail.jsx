import React from "react";
import Certificate from "../instructor/components/Certificate/Certificate";
import { useLocation } from "react-router-dom";

const CetificateDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  return <Certificate idCertificateView={id} isViewUserSide={true} />;
};

export default CetificateDetail;
