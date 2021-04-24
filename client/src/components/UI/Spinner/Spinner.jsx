import React from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.scss";
import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ type }) => {
  Spinner.propTypes = {
    type: PropTypes.string,
  };
  return (
    <div className={classes.spinner_container}>
      {type !== "beat" ? (
        <DotLoader color="blue" loading={true} size={30} margin={2} />
      ) : (
        <BeatLoader color="blue" loading={true} size={5} margin={2} />
      )}
    </div>
  );
};

export default Spinner;
