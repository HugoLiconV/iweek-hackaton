import React from "react";
import NotFoundIcon from "../not_found.svg";

const NotFound = () => {
  return (
    <div className="container not-found-container">
      <h1>¡Nada por aquí!</h1>
      <img src={NotFoundIcon} alt="Not found" style={{ width: "100%" }} />
      <h2>La página que buscas no existe</h2>
    </div>
  );
};

export default NotFound;
