import React from "react";
import PropTypes from "prop-types";

import classes from "./StatusDot.module.scss";

const StatusDot = ({ status, statusShow }) => {
  StatusDot.propTypes = {
    status: PropTypes.oneOf(["online", "offline"]),
    statusShow: PropTypes.bool
  };

  return (
    <div className={classes.status}>
      <span
        className={
          status === "online"
            ? [classes.status_dot, classes.online].join(" ")
            : classes.status_dot
        }
      ></span>
      {statusShow && <p>{status}</p>}
    </div>
  );
};

export default StatusDot;
