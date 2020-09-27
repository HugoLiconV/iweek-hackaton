import React from "react";
import { MdPhone, MdMailOutline } from "react-icons/md";
import { useQuery } from "react-query";
import { fetchBusinessById } from "../api/business";
import Carousel from "../components/Carousel";
import ChihuahuaMarketBadge from "../components/ChihuahuaMarketBadge";
import Tag from "../components/Tag";
import TomTomMap, { useMapJustMounted } from "../components/TomTomMap";
import { useParams } from "@reach/router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function PlaceMap({ lat, lng }) {
  const [, setRef] = useMapJustMounted(ref => {
    if (lat && lng) {
      const position = { lat: parseFloat(lat), lon: parseFloat(lng) };
      ref.addMarker(position, {
        title: "Ubicación de sucursal",
        content: "",
        draggable: false
      });
    }
  });
  return <TomTomMap ref={setRef} />;
}

const BusinessDetails = () => {
  const { id } = useParams();
  console.log("BusinessDetails -> id", id)
  const { isLoading, error, data } = useQuery(
    ["business", id],
    fetchBusinessById
  );

  if (isLoading) {
    return (
      <div className="container">
        <Loading title="Cargando..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <ErrorMessage title="No se pudo cargar la información" />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{data.name}</h1>
      {data.cm_certification && <ChihuahuaMarketBadge />}
      <Tag title={data.category_name} />
      <Carousel images={data.photos} />
      <h2>Descripción</h2>
      <p>{data.information}</p>
      <h2>Ubicación</h2>
      <PlaceMap lat={data.latitude} lng={data.longitude} />
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
