import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import classes from "./LazyImage.module.scss";

export const LazyImage = ({ image }) => {
  return (
    <div className={classes.image_container}>
      <LazyLoadImage alt={image.alt} src={image.src} effect="opacity" />
    </div>
  );
};

export default LazyImage;
