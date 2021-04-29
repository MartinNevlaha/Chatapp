import React, { useEffect, useRef } from "react";

import classes from "./VideoCall.module.scss";

const Video = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
    currentStream => {}
  ).catch(err => console.log(err))
  return <div className={classes.video}></div>;
};

export default Video;
