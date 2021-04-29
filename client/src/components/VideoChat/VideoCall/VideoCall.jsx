import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../../../store/actions";
import classes from "./VideoCall.module.scss";

const Video = () => {
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.videoCall.currentStream);
  const myVideo = useRef();
  const friendVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        dispatch(action.setVideoStream(currentStream));

        myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, [dispatch]);


  return (
    <div className={classes.video}>
      {stream && (
        <div className={classes.video_myStream}>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
          />
        </div>
      )}
      <div className={classes.video_friendStream}>
        <video playsInline ref={friendVideo} autoPlay />
      </div>
    </div>
  );
};

export default Video;
