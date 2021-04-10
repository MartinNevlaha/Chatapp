import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.scss";

export const Backdrop = ({ show, children }) => {

  Backdrop.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.element
  }

  return show ? (
    <div
      className={
        show ? [classes.backdrop, classes.open].join(" ") : classes.backdrop
      }
    >{children}</div>
  ) : null;
};

export default Backdrop;
