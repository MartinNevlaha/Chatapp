import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  return (
    <li className={classes.navItem}>
      <FontAwesomeIcon
        icon={props.icon}
        color="rgb(80, 79, 79)"
        className={classes.navItem_icon}
      />
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
