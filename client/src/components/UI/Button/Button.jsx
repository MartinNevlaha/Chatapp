import React from "react";

import classes from "./Button.module.scss";

const Button = ({ type, disabled, clicked, children, danger }) => {
  let style = [classes.btn];
  if (danger && !disabled ) {
    style.push(classes.danger)
  } else if (disabled && danger) {
    style.push(classes.disabled)
  }
  return (
    <button className={style.join(" ")} type={type} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
