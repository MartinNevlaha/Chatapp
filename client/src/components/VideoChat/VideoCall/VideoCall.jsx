import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import * as action from "../../../store/actions";
import classes from "./VideoCall.module.scss";

const VideoCall = ({ user, myVideo, friendVideo, connection }) => {
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.videoCall.currentStream);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        dispatch(action.setVideoStream(currentStream));

        myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  VideoCall.propTypes = {
    user: PropTypes.object,
    myVideo: PropTypes.object,
    friendVideo: PropTypes.object
  };

  return (
    <div className={classes.video}>
      {stream && (
        <div className={classes.video_myStream}>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}
      <div className={classes.video_friendStream}>
        <video playsInline ref={friendVideo} autoPlay />
      </div>
    </div>
  );
};

export default VideoCall;
