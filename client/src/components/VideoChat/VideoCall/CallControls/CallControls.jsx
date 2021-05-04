import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSlash,
  faPhone,
  faMicrophoneSlash,
  faMicroscope,
  faExpand,
  faVideo,
  faVideoSlash
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./CallControls.module.scss";

const CallControls = ({
  isMeCalling,
  onAcceptCall,
  onCallRejected,
  callAccepted,
  onMuteAudio,
  muteAudio,
  onfullScreen,
  onMuteVideo,
  muteVideo
}) => {
  CallControls.propTypes = {
    isMeCalling: PropTypes.bool,
    onAcceptCall: PropTypes.func,
    onCallRejected: PropTypes.func,
    callToInit: PropTypes.bool,
    callAccepted: PropTypes.bool,
    onMuteAudio: PropTypes.func,
    muteAudio: PropTypes.bool,
    onfullScreen: PropTypes.func,
    onMuteVideo: PropTypes.func,
    muteVideo: PropTypes.bool
  };

  return (
    <div className={classes.callControls}>
      {isMeCalling && (
        <div
          className={classes.callControls_accept}
          onClick={() => onAcceptCall()}
        >
          <FontAwesomeIcon icon={faPhone} />
        </div>
      )}
      {!callAccepted && (
        <div
          className={classes.callControls_icon}
          onClick={() => onMuteAudio()}
        >
          <FontAwesomeIcon
            icon={muteAudio ? faMicrophoneSlash : faMicroscope}
          />
        </div>
      )}
       {!callAccepted && (
        <div
          className={classes.callControls_icon}
          onClick={() => onMuteVideo()}
        >
          <FontAwesomeIcon
            icon={muteVideo ? faVideoSlash : faVideoSlash}
          />
        </div>
      )}
      <div
        className={classes.callControls_reject}
        onClick={() => onCallRejected()}
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </div>
      {!callAccepted && (
        <div
          className={classes.callControls_icon}
          onClick={() => onfullScreen}
        >
          <FontAwesomeIcon icon={faExpand} />
        </div>
      )}
    </div>
  );
};

export default CallControls;
