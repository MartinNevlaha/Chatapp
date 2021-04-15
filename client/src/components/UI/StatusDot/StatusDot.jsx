import React from "react";
import PropTypes from "prop-types";

import classes from "./StatusDot.module.scss";

const StatusDot = ({ status }) => {
  StatusDot.propTypes = {
    status: PropTypes.oneOf(["online", "offline"]),
  };

  return (
    <div className={classes.status} >
      <span
        className={
          status === "online"
            ? [classes.status_dot, classes.online].join(" ")
            : classes.status_dot
        }
      ></span>
      <p>{status}</p>
    </div>
  );
};

export default StatusDot;
