import React from "react";
import PropTypes from "prop-types";

import classes from "./StatusDot.module.scss";

const StatusDot = ({ status, statusShow }) => {
  return (
    <div className={classes.status} data-test="component-status">
      <span
        data-test="status-dot"
        className={
          status === "online"
            ? [classes.status_dot, classes.online].join(" ")
            : classes.status_dot
        }
      ></span>
      {statusShow && <p data-test="status-message">{status}</p>}
    </div>
  );
};

StatusDot.propTypes = {
  status: PropTypes.oneOf(["online", "offline"]),
  statusShow: PropTypes.bool,
};

export default StatusDot;
