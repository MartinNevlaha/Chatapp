import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./Message.module.scss";
import { parseDateTime } from "../../../../../utils/utilities";

const Message = ({ message }) => {
  return (
    <div className={classes.message}>
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
      <div className={classes.message_container}>
        <div className={classes.message_container_content}>
          <h2>{`${message.User.firstName}s wrote:`}</h2>
          <p>{message.message}</p>
        </div>
        <div className={classes.message_container_created}>
          <p>{parseDateTime(message.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
