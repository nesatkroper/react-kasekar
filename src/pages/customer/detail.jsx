import React from "react";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { customerId } = useParams();
  return <div>Customer id : {customerId}</div>;
};

export default CustomerDetail;
