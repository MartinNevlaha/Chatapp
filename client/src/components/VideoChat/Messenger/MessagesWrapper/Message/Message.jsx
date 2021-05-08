import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./Message.module.scss";
import { parseDateTime } from "../../../../../utils/utilities";
import LazyImage from "../../../../UI/LazyImage/LazyImage";

const Message = ({ message, userId }) => {
  const { t } = useTranslation();
  Message.propTypes = {
    message: PropTypes.object,
    userId: PropTypes.number,
  };

  return (
    <div
      className={
        userId === message.User.id
          ? [classes.message, classes.rightAlign].join(" ")
          : classes.message
      }
    >
      {userId !== message.User.id && (
        <div className={classes.message_avatar}>
          {message.User.avatar ? (
            <div className={classes.message_avatar_image}>
              <img src={message.User.avatar} alt="avatar" />
            </div>
          ) : (
            <div className={classes.message_avatar_icon}>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
          )}
        </div>
      )}
      <div className={classes.message_container}>
        <div
          className={
            userId !== message.User.id
              ? [
                  classes.message_container_content,
                  classes.rightAlignColors,
                ].join(" ")
              : classes.message_container_content
          }
        >
          {message.type === "text" ? (
            <React.Fragment>
              <h2>
                {message.User.firstName}
                {t("message.userWrote")}
              </h2>
              <p>{message.message}</p>
            </React.Fragment>
          ) : (
            <LazyImage image={{ src: message.message, alt: "messageImage" }} />
          )}
        </div>
        <div className={classes.message_container_created}>
          <p>{parseDateTime(message.createdAt)}</p>
        </div>
      </div>
      {userId === message.User.id && (
        <div className={classes.message_avatar}>
          {message.User.avatar ? (
            <div className={classes.message_avatar_image}>
              <img src={message.User.avatar} alt="avatar" />
            </div>
          ) : (
            <div className={classes.message_avatar_icon}>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
