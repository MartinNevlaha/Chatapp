import React from "react";

import classes from "./Button.module.scss";

const Button = ({ type, disabled, clicked, children, danger }) => {
  let style = [classes.btn];
  if (danger) {
    style = [classes.btn, classes.danger].join(" ")
  }
  return (
    <button className={style} type={type} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
