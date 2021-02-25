import React from 'react'

import classes from "./EntryImg.module.scss";
import CallImg from "../../../assets/images/call.svg";

const EntryImg = () => {
  return (
    <div className={classes.img_container}>
      <img src={CallImg} alt="call_image"/>
    </div>
  )
}

export default EntryImg
