import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";


export const LazyImage = ({ image }) => {
  return (
    <div>
      <LazyLoadImage alt={image.alt} src={image.src} effect="opacity" />
    </div>
  );
};

export default LazyImage;
