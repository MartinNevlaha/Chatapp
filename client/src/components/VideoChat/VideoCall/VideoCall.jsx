import React, { useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";

import classes from "./VideoCall.module.scss";
import CallControls from "./CallControls/CallControls";
import { VideoContext } from "../../../context/VideoContext";
import LazyImage from "../../UI/LazyImage/LazyImage";

const VideoCall = ({
  user,
  isMeCalling,
  callAccepted,
  onAcceptCall,
  muteAudio,
  muteVideo
}) => {
  const {
    stream,
    myVideoRef,
    friendVideoRef,
    callToFriend,
    callRejected,
    onMuteAudio,
    onMuteVideo
  } = useContext(VideoContext);

  useEffect(() => {
    callToFriend(user);
  }, [user]);

  const handleFullScreen = () => {

  };

  VideoCall.propTypes = {
    isReceivingCall: PropTypes.bool,
    isMeCalling: PropTypes.bool,
    callAccepted: PropTypes.bool,
    user: PropTypes.object,
    onAcceptCall: PropTypes.func,
    callToFriendId: PropTypes.number,
    muteAudio: PropTypes.bool,
    muteVideo: PropTypes.bool
  };

  return (
    <div className={classes.video}>
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
        onfullScreen={handleFullScreen}
      />
    </div>
  );
};

export default VideoCall;
