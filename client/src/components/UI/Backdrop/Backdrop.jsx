import React from "react";

import classes from "./Backdrop.module.scss";

export const Backdrop = ({ show, children }) => {
  return show ? (
    <div
      className={
        show ? [classes.backdrop, classes.open].join(" ") : classes.backdrop
      }
    >{children}</div>
  ) : null;
};

export default Backdrop;
