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
      <NavLink to="/">Inicio</NavLink>
      <NavLink
        to="/create-business"
        style={{
          borderRadius: 50,
          border: "2px solid",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MdAdd size={32} color="inherit" />
      </NavLink>
      <NavLink to="/profile">Perfil</NavLink>
    </nav>
  );
};

export default ActionsBottomBar;
