import React from "react";
import PropTypes from "prop-types";

import classes from "./Card.module.scss";

const Card = ({ type, children }) => {
  return (
    <div
      className={[classes.card_wrapper, classes[type]].join(" ")}
      data-test="component-card"
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(["small_card", "medium_card", "wide_angle"]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Card;
