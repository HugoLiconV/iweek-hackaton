import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchCategories } from "../api/categories";
import "./Categories.css";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { Link } from "@reach/router";

const Categories = () => {
  const { isLoading, error, data: categories } = useQuery(
    "categories",
    fetchCategories,
    {
      retry: false
    }
  );

  if (error) {
    return <ErrorMessage title="No se pudo cargar las categorías" />;
  }

  if (isLoading) {
    return <Loading title="Cargando categorías..." />;
  }

  return (
    <ul className="hs">
      {categories.map(category => (
        <li className="item" key={category.id}>
          <Link to={`?category=${category.id}`}>{category.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
