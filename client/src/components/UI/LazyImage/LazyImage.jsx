import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";

export const LazyImage = ({ image }) => {

  LazyImage.propTypes = {
    image: PropTypes.object
  }
  return (
    <div>
      <LazyLoadImage alt={image.alt} src={image.src} effect="opacity" />
    </div>
  );
};

export default LazyImage;
