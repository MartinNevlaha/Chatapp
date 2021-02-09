import React from "react";

import classes from "./Button.module.scss";

const Button = ({ type, disabled, clicked, children }) => {
  return (
    <button className={classes.btn} type={type} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
