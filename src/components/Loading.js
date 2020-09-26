import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = ({ title }) => {
  return (
    <div className="loading-container">
      <AiOutlineLoading className="loading-icon" size={32} />
      {title ? <span>{title}</span> : null}
    </div>
  );
};

export default Loading;
