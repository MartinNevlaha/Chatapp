import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faImage } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import classes from "./MessageInput.module.scss";
import "emoji-mart/css/emoji-mart.css";

const MessageInput = ({ userId, toUser, chatId }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const socket = useSelector(state => state.chat.socket);

  const handleMessageInput = (e) => {
    setMessage(e.targer.value);

    // notify typing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUserId: userId,
      toUser: toUser,
      chatId: chatId,
      message: imageUpload ? image : message,
    };
    setMessage("");
    setImage("");

    // send message
    socket.emit("sendMessage", msg);
  };

  MessageInput.propTypes = {
    userId: PropTypes.number,
    toUser: PropTypes.object,
    chatId: PropTypes.number,
  };

  return (
    <div className={classes.input}>
      <FontAwesomeIcon icon={faImage} className={classes.input_imageUp} />
      <div className={classes.input_messageInput}>
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => handleMessageInput(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          icon={faSmileWink}
          className={classes.input_messageInput_icon}
        />
      </div>
    </div>
  );
};

export default MessageInput;
