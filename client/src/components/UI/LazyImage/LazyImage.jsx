import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";

import classes from "./LazyImage.module.scss";

export const LazyImage = ({ image }) => {
  LazyImage.propTypes = {
    image: PropTypes.object,
  };
  return (
    <div className={classes.lazy}>
      <LazyLoadImage alt={image.alt} src={image.src} effect="opacity" />
    </div>
  );
};

export default LazyImage;
