import React from "react";
import { MdAdd } from "react-icons/md";
import NavLink from "./NavLink";

const ActionsBottomBar = () => {
  return (
    <nav
      style={{
        height: 64,
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#FFF"
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "#444",
          fontSize: 28
        }}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/create-business"
        style={{
          borderRadius: 50,
          border: "2px solid #444",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MdAdd size={32} color="#444" />
      </NavLink>
      <NavLink
        to="/profile"
        style={{
          textDecoration: "none",
          color: "#444",
          fontSize: 28
        }}
      >
        Perfil
      </NavLink>
    </nav>
  );
};

export default ActionsBottomBar;
