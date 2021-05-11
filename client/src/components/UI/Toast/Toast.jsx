import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./Toast.module.scss";

const Toast = ({ isShow, message }) => {
  Toast.propTypes = {
    isShow: PropTypes.object,
    message: PropTypes.string,
  };

  return (
    <div
      className={
        isShow ? [classes.toast, classes.showed].join(" ") : classes.toast
      }
    >
      <div className={classes.toast_circle}>
        <FontAwesomeIcon icon={faExclamation} size="1x" color="white" />
      </div>
      <h3>{message}</h3>
    </div>
  );
};

export default memo(Toast, (props, nextProps) => {
  if (props.isShow === nextProps.isShow && props.message === nextProps.message)
    return true;
});
