import React from "react";
import PropTypes from "prop-types";

import classes from "./ErrorFallback.module.scss";
import Button from "../Button/Button";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className={classes.error} role="alert" data-test="component-error">
      <p>Something went wrong</p>
      <pre className={classes.error_message}>{error.message}</pre>
      <Button danger clicked={resetErrorBoundary} data-test="component-btn">
        Try again
      </Button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallback;
