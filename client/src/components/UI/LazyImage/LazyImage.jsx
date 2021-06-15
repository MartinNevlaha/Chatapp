import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";

import classes from "./LazyImage.module.scss";

export const LazyImage = ({ image }) => {

  return (
    <div className={classes.lazy} data-test="component-lazyImg">
      <LazyLoadImage alt={image.alt} src={image.src} effect="opacity" data-test="lazyImg"/>
    </div>
  );
};

LazyImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }).isRequired,
};

export default LazyImage;
