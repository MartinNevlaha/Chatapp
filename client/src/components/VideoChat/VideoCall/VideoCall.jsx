import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import classes from "./VideoCall.module.scss";
import CallControls from "./CallControls/CallControls";
import { VideoContext } from "../../../context/VideoContext";

const VideoCall = ({ user, isMeCalling, isReceivingCall }) => {
  const { setStream, stream, myVideoRef, friendVideoRef } = useContext(
    VideoContext
  );

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideoRef.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, [setStream, myVideoRef]);

  VideoCall.propTypes = {
    user: PropTypes.object,
    isReceivingCall: PropTypes.bool,
    isMeCalling: PropTypes.bool,
  };

  return (
    <div className={classes.video}>
      {stream && (
        <div className={classes.video_myStream}>
          <video playsInline muted ref={myVideoRef} autoPlay />
          {myVideoRef.current &&
            console.log("myVideo", myVideoRef.current.srcObject)}
        </div>
      )}
      <div className={classes.video_friendStream}>
        <video playsInline ref={friendVideoRef} autoPlay />
        {friendVideoRef.current &&
          console.log(
            "Friend video",
            friendVideoRef.current.srcObject,
            friendVideoRef.current
          )}
      </div>
      <CallControls
        isMeCalling={isMeCalling}
        isReceivingCall={isReceivingCall}
      />
    </div>
  );
};

export default VideoCall;
