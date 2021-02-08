import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  return (
    <li className={classes.navItem}>
      <NavLink
        className={classes.navItem_a}
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
