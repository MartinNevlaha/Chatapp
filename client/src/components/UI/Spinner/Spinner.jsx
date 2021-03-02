import React from "react";

import classes from "./Spinner.module.scss";
import DotLoader from "react-spinners/DotLoader";

const Spinner = () => {
  return (
    <div className={classes.spinner_container}>
      <DotLoader color="blue" loading={true} size={40} />
    </div>
  );
};

export default Spinner;
