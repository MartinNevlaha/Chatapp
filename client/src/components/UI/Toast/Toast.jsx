import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./Toast.module.scss";

const Toast = ({ isShow, isSuccess, message }) => {
  let iconToast = faExclamation;
  if (isSuccess) iconToast = faCheck;

  return (
    <div
      className={
        isShow ? [classes.toast, classes.showed].join(" ") : classes.toast
      }
    >
      <div
        className={
          isSuccess
            ? classes.toast_circle
            : [classes.toast_circle, classes.circle_red].join(" ")
        }
      >
        <FontAwesomeIcon icon={iconToast} size="1x" color="white" />
      </div>
      <h3>{message}</h3>
    </div>
  );
};

export default Toast;
