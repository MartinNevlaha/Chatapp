import React, { useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./VideoCall.module.scss";
import { VideoContext } from "../../../context/VideoContext";

const VideoCall = ({ user, callAccepted }) => {
  const myVideo = useRef(null);
  const friendVideo = useRef(null);
  const { setRefs, setStream, stream } = useContext(VideoContext);

  useEffect(() => {
    if (myVideo && friendVideo) {
      setRefs({ myVideo, friendVideo });
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, [setRefs, myVideo, friendVideo]);

  VideoCall.propTypes = {
    user: PropTypes.object,
    callAccepted: PropTypes.bool,
  };

  return (
    <div className={classes.video}>
      {stream && (
        <div className={classes.video_myStream}>
          <video playsInline muted ref={myVideo} autoPlay />
          {myVideo.current && console.log("myVideo", myVideo.current.srcObject)}
        </div>
      )}
      {callAccepted && (
        <div className={classes.video_friendStream}>
          <video playsInline ref={friendVideo} autoPlay />
          {friendVideo.current &&
            console.log("Friend video", friendVideo.current.srcObject)}
        </div>
      )}
    </div>
  );
};

export default VideoCall;
