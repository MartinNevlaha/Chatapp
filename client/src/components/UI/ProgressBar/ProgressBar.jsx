import React from "react";

import classes from "./ProgressBar.module.scss";

export const ProgressBar = ({ value, isInProgress }) => {
  return (
    <div className={classes.progress_container}>
      <progress
        value={value}
        max="100"
        className={
          isInProgress
            ? [classes.progress_container_bar, classes.inProgress].join(" ")
            : classes.progress_container_bar
        }
      >
        {value}
      </progress>
    </div>
  );
};

export default ProgressBar;
