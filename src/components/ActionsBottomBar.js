import React from "react";
import { MdAdd } from "react-icons/md";
import NavLink from "./NavLink";

const ActionsBottomBar = () => {
  return (
    <nav className="bottom-navigation">
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
