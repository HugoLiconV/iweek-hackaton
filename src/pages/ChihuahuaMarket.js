import React from "react";
import ChihuahuaMarketBadge from "../components/ChihuahuaMarketBadge";

const ChihuahuaMarket = () => {
  return (
    <div className="container not-found-container">
      <h1>Chihuahua Market</h1>
      <ChihuahuaMarketBadge />
      <p>
        “Chihuahua Market” es un distintivo de Calidad avalado por el Instituto
        Mexicano de Normalización y Certificación A.C. (IMNC) que respalda a
        aquellos productos y servicios que cumplen con los estándares de calidad
        establecidos por las normas oficiales mexicanas.
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.chihuahua.com.mx/comercio/Solicitud%20Chihuahua%20Market%20vigente.docx"
        className="button button-outline-secondary"
      >
        Solicitud
      </a>
    </div>
  );
};

export default ChihuahuaMarket;
