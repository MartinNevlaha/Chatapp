import React from "react";

import classes from "./Card.module.scss";

const Card = (props) => {
  return (
    <div className={[classes.card_wrapper, classes[props.cardType]].join(" ")}>
      {props.children}
    </div>
  );
};

export default Card;
