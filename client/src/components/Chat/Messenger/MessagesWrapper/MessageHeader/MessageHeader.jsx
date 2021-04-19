import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUser,
  faVideo,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import StatusDot from "../../../../UI/StatusDot/StatusDot";
import classes from "./MessageHeader.module.scss";
// dorob status bodku na avatare
const MessageHeader = ({ user, onCloseChat }) => {
  MessageHeader.propTypes = {
    user: PropTypes.object,
    onCloseChat: PropTypes.func,
  };
  return (
    <div className={classes.messageHeader}>
      <div className={classes.messageHeader_backBtn} onClick={onCloseChat}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={classes.MessagesWrapper_back_icon}
        />
        <p data-tip data-for="back">
          Back
        </p>
        <ReactTooltip id="back" place="top" effect="solid" border={true}>
          Back to other chats
        </ReactTooltip>
      </div>
      <div className={classes.messageHeader_user}>
        {user.avatar ? (
          <div className={classes.messageHeader_user_image}>
            <img src={user.avatar} alt="avatar" />
          </div>
        ) : (
          <div className={classes.messageHeader_user_icon}>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        )}
        <p>{user.fullName}</p>
        <FontAwesomeIcon
          icon={faVideo}
          className={classes.messageHeader_user_video}
          data-tip
          data-for="video"
        />
        <ReactTooltip id="video" place="top" effect="solid" border={true}>
          Click start video call
        </ReactTooltip>
        <FontAwesomeIcon
          icon={faVolumeMute}
          className={classes.messageHeader_user_video}
          data-tip
          data-for="video"
        />
        <ReactTooltip id="mute" place="top" effect="solid" border={true}>
          Mute chat sounds
        </ReactTooltip>
      </div>
    </div>
  );
};

export default MessageHeader;
