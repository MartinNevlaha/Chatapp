import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faImage } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import * as action from "../../../../../store/actions";
import classes from "./MessageInput.module.scss";
import "emoji-mart/css/emoji-mart.css";

const MessageInput = ({ user, toUserId, chatId, }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const socket = useSelector(state => state.chat.socket);

  const handleMessageInput = (e) => {
    setMessage(e.target.value);

    // notify typing
  };
  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: toUserId,
      chatId: chatId,
      message: imageUpload ? image : message,
    };
    setMessage("");
    setImage("");
    // send message
    socket.emit("sendMessage", msg);
    const messageToRedux = {
      id: 0,
      type: msg.type,
      User: msg.fromUser,
      chatId: msg.chatId,
      fromUserId: msg.fromUser.id,
      message: message,
    }
    dispatch(action.sendMessage(messageToRedux));
  };

  MessageInput.propTypes = {
    user: PropTypes.object,
    toUserId: PropTypes.number,
    chatId: PropTypes.number,
    lastId: PropTypes.number,
    messages: PropTypes.array
  };

  return (
    <div className={classes.input}>
      <FontAwesomeIcon icon={faImage} className={classes.input_imageUp} />
      <div className={classes.input_messageInput}>
        <input
          type="text"
          placeholder="Message..."
          value={message}
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
