import React, { useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";

import classes from "./VideoCall.module.scss";
import CallControls from "./CallControls/CallControls";
import { VideoContext } from "../../../context/VideoContext";
import LazyImage from "../../UI/LazyImage/LazyImage";
import useFullscreenStatus from "../../../hooks/fullscreenStatus";

const VideoCall = ({
  user,
  isMeCalling,
  callAccepted,
  onAcceptCall,
  muteAudio,
  muteVideo,
  stream,
}) => {
  const {
    myVideoRef,
    friendVideoRef,
    callToFriend,
    callRejected,
    onMuteAudio,
    onMuteVideo,
  } = useContext(VideoContext);
  const fullscreenElement = useRef(null);
  let isFullscreen;
  let setIsFullscreen;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(fullscreenElement);
  } catch (e) {
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  const handleExitFullscreen = () => document.exitFullscreen();

  useEffect(() => {
    callToFriend(user);
  }, [user]);

  VideoCall.propTypes = {
    isReceivingCall: PropTypes.bool,
    isMeCalling: PropTypes.bool,
    callAccepted: PropTypes.bool,
    user: PropTypes.object,
    onAcceptCall: PropTypes.func,
    callToFriendId: PropTypes.number,
    muteAudio: PropTypes.bool,
    muteVideo: PropTypes.bool,
    stream: PropTypes.object,
  };

  return (
    <div
      className={
        isFullscreen
          ? [classes.video, classes.fullscreen].join(" ")
          : classes.video
      }
      ref={fullscreenElement}
    >
      <div className={classes.video_myStream}>
        {stream && <video playsInline muted ref={myVideoRef} autoPlay />}
      </div>
      {!callAccepted && (
        <div className={classes.video_user_avatar}>
          {user && <LazyImage image={{ src: user.avatar, alt: "avatar" }} />}
        </div>
      )}

      <div className={classes.video_friendStream}>
        <video playsInline ref={friendVideoRef} autoPlay />
      </div>

      <CallControls
        isMeCalling={isMeCalling}
        onAcceptCall={onAcceptCall}
        onCallRejected={callRejected}
        onMuteAudio={onMuteAudio}
        onMuteVideo={onMuteVideo}
        muteAudio={muteAudio}
        muteVideo={muteVideo}
        onfullScreen={setIsFullscreen}
        isFullscreen={isFullscreen}
        onExitFullscreen={handleExitFullscreen}
      />
    </div>
  );
};

export default VideoCall;
