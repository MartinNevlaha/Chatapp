import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./Toast.module.scss";

const Toast = ({ isShow, message }) => {

  return (
    <div
      className={
        isShow ? [classes.toast, classes.showed].join(" ") : classes.toast
      }
      data-test="component-toast"
    >
      <div className={classes.toast_circle}>
        <FontAwesomeIcon icon={faExclamation} size="1x" color="white" />
      </div>
      <h3 data-test="message">{message}</h3>
    </div>
  );
};

Toast.propTypes = {
  isShow: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Toast;
