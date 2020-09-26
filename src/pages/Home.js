import React from "react";
import BusinessList from "../components/BusinessList";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <>
      <h2>Categorías</h2>
      <Categories />
      <h2>Negocios</h2>
      <BusinessList />
    </>
  );
};

export default Home;
