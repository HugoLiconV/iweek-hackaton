import { Link } from "@reach/router";
import React from "react";
import { BiCrown } from "react-icons/bi";

const ChihuahuaMarketBadge = () => {
  return (
    <Link to="/chihuahua-market" className="chihuahua-market">
      <BiCrown size={32} color="#ffd803" />
      <span style={{ fontWeight: "bold" }}>Chihuahua Market</span>
    </Link>
  );
};

export default ChihuahuaMarketBadge;
