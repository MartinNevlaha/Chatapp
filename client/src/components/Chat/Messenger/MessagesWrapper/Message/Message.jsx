import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./Message.module.scss";
import { parseDateTime } from "../../../../../utils/utilities";

const Message = ({ message, userId }) => {
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
          <h2>{`${message.User.firstName}s wrote:`}</h2>
          <p>{message.message}</p>
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
