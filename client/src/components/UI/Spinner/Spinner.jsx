import React from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.scss";
import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ type }) => {
  return (
    <div className={classes.spinner_container} data-test="component-spinner">
      {type !== "beat" ? (
        <DotLoader color="blue" loading={true} size={30} margin={2} />
      ) : (
        <BeatLoader color="blue" loading={true} size={5} margin={2} />
      )}
    </div>
  );
};

Spinner.propTypes = {
  type: PropTypes.string,
};

export default Spinner;
