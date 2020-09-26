import React from "react";
import { MdPhone, MdMailOutline } from "react-icons/md";
import Carousel from "../components/Carousel";
import ChihuahuaMarketBadge from "../components/ChihuahuaMarketBadge";
import Tag from "../components/Tag";

const BusinessDetails = () => {
  return (
    <div className="container">
      <h1>Burritos de a 5</h1>
      <ChihuahuaMarketBadge />
      <Tag title="Comida" />
      <Carousel
        images={[
          "https://via.placeholder.com/1080x720",
          "https://via.placeholder.com/1080x720",
          "https://via.placeholder.com/1080x720"
        ]}
      />
      <h2>Descripción</h2>
      <p>
        Ipsa voluptatum a veniam et ipsum nisi illo. Quia et provident
        recusandae ducimus temporibus ducimus quia. Aut expedita veritatis
        corporis quo.
      </p>
      <h2>Contacto</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <MdPhone style={{ marginRight: 8 }} />
        <a href="tel:+6141234567">6141234567</a>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MdMailOutline style={{ marginRight: 8 }} />
        <a href="mailto:hugo.val28@gmail.com">hugo.val28@gmail.com</a>
      </div>
    </div>
  );
};

export default BusinessDetails;
