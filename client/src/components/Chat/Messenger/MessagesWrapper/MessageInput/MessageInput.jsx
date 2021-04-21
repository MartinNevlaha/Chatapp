import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileWink,
  faUpload,
  faTimes,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import * as action from "../../../../../store/actions";
import classes from "./MessageInput.module.scss";
import "emoji-mart/css/emoji-mart.css";

const MessageInput = ({ user, toUserId, chatId }) => {
  const fileUpload = useRef(null);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const socket = useSelector((state) => state.chat.socket);
  const imageUploadProgress = useSelector(
    (state) => state.chat.imageUploadProgress
  );

  const handleMessageInput = (e) => {
    setMessage(e.target.value);

    // notify typing
  };
  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload, imageUrl, imageForSendEvent) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: toUserId,
      chatId: chatId,
      message: imageUpload ? imageUrl : message,
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
      message: msg.type === "text" ? msg.message : imageForSendEvent,
    };
    dispatch(action.sendMessage(messageToRedux));
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chatId);
    formData.append("image", image);

    dispatch(action.imageChatUpload(formData, sendMessage));
  };

  MessageInput.propTypes = {
    user: PropTypes.object,
    toUserId: PropTypes.number,
    chatId: PropTypes.number,
    lastId: PropTypes.number,
    messages: PropTypes.array,
  };

  return (
    <div className={classes.input}>
      <div className={classes.input_imageUpload}>
        {!image.name && (
          <div className={classes.input_imageUpload_image}>
            <label htmlFor="image">
              <FontAwesomeIcon
                icon={faImage}
                className={classes.input_imageUpload_image_icon}
                onClick={() => fileUpload.current.click()}
              />
            </label>
            <input
              ref={fileUpload}
              accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}
        <div className={classes.input_imageUpload_details}>
          {image.name && (
            <React.Fragment>
              <p>{image.name}</p>
              {imageUploadProgress > 0 && <p>{imageUploadProgress} %</p>}
              {imageUploadProgress !== 100 && (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faUpload}
                    className={classes.input_imageUpload_image_icon}
                    onClick={() => handleImageUpload()}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={classes.input_imageUpload_image_icon}
                    onClick={() => setImage("")}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
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
