import React from "react";
import { MdStar } from "react-icons/md";

const BusinessCard = ({ business, onClick }) => {
  return (
    <div
      onClick={() => onClick(business.id)}
      style={{
        display: "flex",
        margin: 16,
        borderRadius: 8,
        height: 120,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      }}
    >
      <img
        src={"https://via.placeholder.com/1080x720"}
        alt="business cover"
        style={{
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          width: 100,
          objectFit: "cover"
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <h3 style={{ margin: 0 }}>{business.name}</h3>
          <span>
            {business.ratings} <MdStar />
          </span>
        </div>
        <p
          className="text-overflow-hidden"
          style={{ textAlign: "justify", margin: "0 16px 16px 16px" }}
        >
          {business.information}
        </p>
      </div>
    </div>
  );
};

const BusinessList = ({ business, onClick }) => {
  return (
    <>
      {business.map(b => (
        <BusinessCard key={b.id} business={b} onClick={onClick} />
      ))}
    </>
  );
};

export default BusinessList;
