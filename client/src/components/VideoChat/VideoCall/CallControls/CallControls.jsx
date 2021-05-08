import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSlash,
  faPhone,
  faMicrophoneSlash,
  faMicroscope,
  faExpand,
  faCompress,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

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
  muteVideo,
  isFullscreen,
  onExitFullscreen,
}) => {
  const { t } = useTranslation();

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
    muteVideo: PropTypes.bool,
    isFullscreen: PropTypes.bool,
    onExitFullscreen: PropTypes.func,
  };

  return (
    <div
      className={
        callAccepted
          ? [classes.callControls, classes.transparent].join(" ")
          : classes.callControls
      }
    >
      {!isMeCalling && (
        <React.Fragment>
          <div
            className={classes.callControls_accept}
            onClick={() => onAcceptCall()}
            data-tip
            data-for="accept"
          >
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <ReactTooltip id="accept" place="top" effect="solid" border={true}>
            {t("callControls.accept")}
          </ReactTooltip>
        </React.Fragment>
      )}
      {callAccepted && (
        <React.Fragment>
          <div
            className={classes.callControls_icon}
            onClick={() => onMuteAudio()}
            data-tip
            data-for="audio"
          >
            <FontAwesomeIcon
              icon={muteAudio ? faMicrophoneSlash : faMicroscope}
            />
          </div>
          <ReactTooltip id="audio" place="top" effect="solid" border={true}>
            {t("callControls.audio")}
          </ReactTooltip>
          <div
            className={classes.callControls_icon}
            onClick={() => onMuteVideo()}
            data-tip
            data-for="video"
          >
            <FontAwesomeIcon icon={muteVideo ? faVideoSlash : faVideo} />
          </div>
          <ReactTooltip id="video" place="top" effect="solid" border={true}>
            {t("callControls.video")}
          </ReactTooltip>
        </React.Fragment>
      )}
      <div
        className={classes.callControls_reject}
        onClick={() => onCallRejected()}
        data-tip
        data-for="reject"
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </div>
      <ReactTooltip id="reject" place="top" effect="solid" border={true}>
        {t("callControls.reject")}
      </ReactTooltip>
      {callAccepted && typeof onfullScreen !== "undefined" && (
        <React.Fragment>
          <div
            className={classes.callControls_icon}
            onClick={
              !isFullscreen ? () => onfullScreen() : () => onExitFullscreen()
            }
            data-tip
            data-for="fullscreen"
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </div>
          <ReactTooltip
            id="fullscreen"
            place="top"
            effect="solid"
            border={true}
          >
            {t("callControls.fullscreen")}
          </ReactTooltip>
        </React.Fragment>
      )}
    </div>
  );
};

export default CallControls;
