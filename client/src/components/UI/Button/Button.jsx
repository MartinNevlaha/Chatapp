import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.scss";

const Button = ({ type, disabled, clicked, children, danger }) => {

  Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func,
    children: PropTypes.string,
    danger: PropTypes.bool
  }

  let style = [classes.btn];
  if (danger && !disabled) {
    style.push(classes.danger);
  } else if (disabled && danger) {
    style.push(classes.disabled);
  } else if (disabled) {
    style.push(classes.disabled);
  }
  return (
    <button
      className={style.join(" ")}
      type={type}
      disabled={disabled}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
