import React from "react";
import PropTypes from "prop-types";

import classes from "./Card.module.scss";

const Card = ({type, children}) => {

  Card.propTypes = {
    type: PropTypes.string,
    children: PropTypes.element
  };

  return (
    <div className={[classes.card_wrapper, classes[type]].join(" ")}>
      {children}
    </div>
  );
};

export default Card;
