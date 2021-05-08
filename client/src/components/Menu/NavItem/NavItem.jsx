import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import classes from "./NavItem.module.scss";

const NavItem = ({ icon, link, exact, close, children }) => {
  NavItem.propTypes = {
    icon: PropTypes.object,
    link: PropTypes.string,
    exact: PropTypes.bool,
    close: PropTypes.func,
    children: PropTypes.node
  };
  return (
    <li className={classes.navItem}>
      <FontAwesomeIcon
        icon={icon}
        color="rgb(80, 79, 79)"
        className={classes.navItem_icon}
      />
      <NavLink
        className={classes.navItem_a}
        to={link}
        exact={exact}
        activeClassName={classes.active}
        onClick={close}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
