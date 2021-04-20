import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faImage } from "@fortawesome/free-solid-svg-icons";
import {Picker} from "emoji-mart";

import classes from "./Message.module.scss";
import 'emoji-mart/css/emoji-mart.css'


const MessageInput = () => {
  return <div className={classes.input}>
    <FontAwesomeIcon icon={faSmileWink} className={classes.input_icon} />
    <FontAwesomeIcon icon={faImage} className={classes.input_icon} />
  </div>;
};

export default MessageInput;
