import React from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ title }) => {
  return (
    <div className="error-message">
      <span style={{ marginRight: 8 }}>{title}</span>
      <MdError size={32} color="#FFF" />
    </div>
  );
};

export default ErrorMessage;
