import React from "react";
import { BiCrown } from "react-icons/bi";

const ChihuahuaMarketBadge = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <BiCrown size={32} color="#ffd803" />
      <span style={{ fontWeight: "bold" }}>Chihuahua Market</span>
    </div>
  );
};

export default ChihuahuaMarketBadge;
