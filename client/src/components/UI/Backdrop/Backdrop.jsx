import React from "react";

import classes from "./Backdrop.module.scss";

export const Backdrop = ({ clicked, show, children }) => {
  return show ? (
    <div
      className={
        show ? [classes.backdrop, classes.open].join(" ") : classes.backdrop
      }
      onClick={clicked}
    >{children}</div>
  ) : null;
};

export default Backdrop;
