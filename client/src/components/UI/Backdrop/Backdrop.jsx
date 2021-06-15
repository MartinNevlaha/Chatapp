import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.scss";

export const Backdrop = ({ show, children }) => {

  return show ? (
    <div
    data-test="component-backdrop"
      className={
        show ? [classes.backdrop, classes.open].join(" ") : classes.backdrop
      }
    >
      {children}
    </div>
  ) : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired
};

export default Backdrop;
