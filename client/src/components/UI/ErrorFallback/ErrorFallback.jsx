import React from "react";
import PropTypes from "prop-types";

import classes from "./ErrorFallback.module.scss";
import Button from "../Button/Button";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  ErrorFallback.propTypes = {
    error: PropTypes.object,
    resetErrorBoundary: PropTypes.func,
  };

  return (
    <div className={classes.error} role="alert">
      <p>Something went wrong</p>
      <pre className={classes.error_message}>{error.message}</pre>
      <Button danger clicked={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallback;
