import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

import StatusDot from "../../../../UI/StatusDot/StatusDot";
import classes from "./MessageHeader.module.scss";

const MessageHeader = ({ user, onCloseChat, onCallToInit }) => {
  const { t } = useTranslation();

  MessageHeader.propTypes = {
    user: PropTypes.object,
    onCloseChat: PropTypes.func,
    onCallToInit: PropTypes.func,
  };
  return (
    <div className={classes.messageHeader}>
      <div className={classes.messageHeader_backBtn} onClick={onCloseChat}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={classes.MessagesWrapper_back_icon}
        />
        <p data-tip data-for="back">
          {t("messageHeader.back")}
        </p>
        <ReactTooltip id="back" place="top" effect="solid" border={true}>
        {t("messageHeader.backMsg")}
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
        <StatusDot status={user.status} />
        <p>{user.fullName}</p>
        <FontAwesomeIcon
          icon={faVideo}
          className={
            user.status === "online"
              ? [classes.messageHeader_user_video, classes.online].join(" ")
              : classes.messageHeader_user_video
          }
          data-tip
          data-for="video"
          onClick={user.status === "online" ? () => onCallToInit(user) : null}
        />
        <ReactTooltip id="video" place="top" effect="solid" border={true}>
        {t("messageHeader.videoMsg")}
        </ReactTooltip>
      </div>
    </div>
  );
};

export default MessageHeader;
