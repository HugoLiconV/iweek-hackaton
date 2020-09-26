import React from "react";
import { useQuery } from "react-query";
import { fetchBusiness } from "../api/business";
import BusinessList from "../components/BusinessList";
import Categories from "../components/Categories";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const Home = (props) => {
  console.log("Home -> props", props)
  const { isLoading, error, data } = useQuery("business", fetchBusiness);
  if (isLoading) {
    return <Loading title="Cargando categorías" />;
  }

  if (error) {
    return <ErrorMessage title="No se pudo cargar la información" />;
  }

  function openBusinessDetails(id) {
    props.navigate(`/business/${id}`);
  }

  return (
    <>
      <h2>Categorías</h2>
      <Categories />
      <h2>Negocios</h2>
      <BusinessList business={data} onClick={openBusinessDetails} />
    </>
  );
};

export default Home;
