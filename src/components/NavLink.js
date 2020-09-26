import React from "react";
import { Link } from "@reach/router";

const NavLink = ({ style, ...props }) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "bottomBarAction",
        style
      };
    }}
  />
);

export default NavLink;
